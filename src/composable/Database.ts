import { ref, getCurrentInstance } from "vue";
import type { Ref } from "vue";
import localStorageKeys from "../../faqelize/plugins/localStorageKeys";
import faqelizeCrypto from "../../faqelize/plugins/crypto";
import convertToDictionary from "../../faqelize/plugins/convertToDictionary";
import type Dictionary from "../../faqelize/types/dictionary";
import type PinnedIDs from "../../faqelize/types/pinnedIDs";
import faqelizeConfig from "../../faqelize.config";
import { useRoute } from "vue-router";

import axios from "axios";
import MiniSearch from "minisearch";

let miniSearch: MiniSearch;

function unusableFn() {
  return;
}

function Database({
  openItem,
  setPassword,
  passwordApplied,
  logout,
  password,
  SuggestPWAInstall = unusableFn,
}: {
  openItem: (item: Item) => void;
  setPassword: (password: string) => void;
  passwordApplied: () => void;
  logout: () => void;
  password: Ref<string>;
  SuggestPWAInstall: () => void;
}) {
  const database_not_found = ref(false as boolean);
  const database_is_encrypted = ref(false as boolean);
  const database = ref([] as Dictionary);
  const pinned_ids = ref([] as PinnedIDs);
  const loading = ref(false as boolean);
  const route = useRoute();

  const load = async () => {
    loading.value = true;
    const saved_password = faqelizeConfig.savePassword
      ? localStorage.getItem(localStorageKeys.password)
      : "";
    if (saved_password) {
      setPassword(saved_password);
    }
    // Accept login by &password URL parameter.
    if (faqelizeConfig.acceptPasswordParameter) {
      const url_password =
        route.query[faqelizeConfig.passwordParameterKey]?.toString();
      if (url_password) {
        setPassword(url_password);
        if (faqelizeConfig.clearPasswordParameter) {
          const query = Object.assign({}, route.query);
          delete query[faqelizeConfig.passwordParameterKey];
          router.replace({ query });
        }
      }
    }
    loading.value = true;
    const fetched_database = await fetchDB();
    loading.value = false;
    if (fetched_database.error) {
      console.error("Can't fetch database", fetched_database.error);
      if (fetched_database.error == "INVALID_PASSWORD") logout();
      if (fetched_database.error == "DATABASE_NOT_FOUND")
        database_not_found.value = true;
      return {
        pinned_ids: [],
        database: [],
        database_not_found,
        database_is_encrypted,
      };
    }
    passwordApplied();
    database_is_encrypted.value = fetched_database.is_encrypted || false;
    if (fetched_database.is_encrypted && faqelizeConfig.savePassword) {
      const password_hash = faqelizeCrypto.hashPassword(
        password.value.toString()
      );
      localStorage.setItem(localStorageKeys.password, password_hash);
    }
    if (fetched_database.value?.length) {
      if (!fetched_database.value[0].id) {
        for (const doc_i in fetched_database.value)
          fetched_database.value[doc_i].id = doc_i;
      }
      database.value = fetched_database.value;
      miniSearch = new MiniSearch({
        fields: ["q"],
        storeFields: ["q", "a"],
        searchOptions: {
          fuzzy: 0.2,
        },
      });
      miniSearch.addAll(fetched_database.value);
    }
    // load pinned ids from localstorage
    let pinned_ids_raw = localStorage.getItem(localStorageKeys.pinned);
    if (!pinned_ids_raw) {
      localStorage.setItem(localStorageKeys.pinned, JSON.stringify([]));
      pinned_ids_raw = "[]";
    }
    pinned_ids.value = JSON.parse(pinned_ids_raw);
    for (const id of pinned_ids.value) {
      const doc = database.value.find((x) => x.id == id);
      if (doc) doc.pinned = true;
    }
    loading.value = false;
    SuggestPWAInstall();
    openQuestion();
    return {
      pinned_ids,
      database,
      database_not_found,
      database_is_encrypted,
      load,
    };
  };

  const fetchDB = async (): Promise<{
    value?: Dictionary;
    is_encrypted?: boolean;
    error?: string;
  }> => {
    let value = [] as string[];
    let is_encrypted = false;
    const is_dev = import.meta.env.MODE == "development";
    let content;
    let dbloc = "" as string;
    let decrypted = [] as Dictionary;
    if (faqelizeConfig.database == "local") {
      if (is_dev) {
        dbloc = "database.json";
      } else {
        dbloc = faqelizeConfig.encryptDatabase
          ? "database_encrypted.json"
          : "database.json";
      }
    } else {
      dbloc = faqelizeConfig.database.toString();
    }
    if (faqelizeConfig.acceptDatabaseParameter) {
      if (route.query[faqelizeConfig.databaseParameterKey]) {
        dbloc =
          route.query[faqelizeConfig.databaseParameterKey]?.toString() || "";
      }
    }
    try {
      content = await axios.get(dbloc);
    } catch (error) {
      return { error: "DATABASE_NOT_FOUND" };
    }
    value = content.data;
    if (value) {
      if (typeof value[0] == "string" && value[0] == "encrypted") {
        is_encrypted = true;
        const decripted_raw = faqelizeCrypto.decryptDatabase(
          value,
          password.value.toString()
        );
        if (!decripted_raw) {
          return { error: "INVALID_PASSWORD", is_encrypted };
        }
        decrypted = decripted_raw;
      } else {
        decrypted = convertToDictionary(value);
      }
    }
    return { value: decrypted, is_encrypted };
  };

  const pin = ({ id, pinned }: { id: string; pinned: boolean }) => {
    const find: Item | undefined = database.value.find((x) => x.id == id);
    if (!find) return;
    find.pinned = pinned;
    if (pinned) {
      if (pinned_ids.value.includes(id)) return;
      pinned_ids.value.push(id);
      find.pinned = true;
    } else {
      pinned_ids.value = pinned_ids.value.filter((x) => x != id);
      find.pinned = false;
    }
    getCurrentInstance()?.proxy?.$forceUpdate();
    localStorage.setItem(
      localStorageKeys.pinned,
      JSON.stringify(pinned_ids.value)
    );
  };

  const openQuestion = () => {
    const id = route.query.q;
    if (id) {
      const find = database.value.find((x) => x.id == id);
      if (find) {
        if (find.a_page) {
          return openItem(find);
        }
      }
    }
  };

  return {
    pin,
    openQuestion,
    database,
    pinned_ids,
    database_not_found,
    database_is_encrypted,
    load,
    loading,
  };
}

export default Database;
