import { ref } from "vue";
import type { Ref } from "vue";

function Password({
  search_query,
  results,
}: {
  search_query: Ref<string>;
  results: Ref<SearchResult[]>;
}) {
  const password = ref("");
  const password_applied = ref(false);

  const logout = () => {
    password_applied.value = false;
    localStorage.removeItem(localStorageKeys.password);
    password.value = "";
    search_query.value = "";
    results.value = [];
    return;
  };

  const setPassword = (p: string) => {
    password.value = p;
    return;
  };

  const passwordApplied = () => {
    password_applied.value = true;
    return;
  };

  return {
    password,
    password_applied,
    logout,
    passwordApplied,
    setPassword,
  };
}

export default Password;
