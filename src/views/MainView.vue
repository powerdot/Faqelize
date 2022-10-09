<script setup lang="ts">
import { ref, onMounted } from "vue";
import faqelizeConfig from "../../faqelize.config";
import { useRoute, useRouter } from "vue-router";

import useSearch from "../composable/Search";
import usePassword from "../composable/Password";
import useDatabase from "../composable/Database";
import useSubPage from "../composable/SubPage";
import useLogo from "../composable/Logo";

let route = useRoute();
let router = useRouter();
let usePins = ref(false);
let subPage = ref();

let SuggestPWAInstallComponentRef = ref();
let SuggestPWAInstall = () => {
  let component = SuggestPWAInstallComponentRef.value;
  if (component) {
    if (component.init) {
      component.init();
    }
  }
};

/**
 * Setup variables and methods from composable
 */

let { logo } = useLogo({ faqelizeConfig, route });

let {
  search_query,
  results,
  selected_area,
  changeArea,
  search,
  setSearchDictionary,
} = useSearch();

let { opened_page, page_title, openItem, subPageClosed } = useSubPage({
  route,
  router,
  subPage,
});

let { setPassword, passwordApplied, logout, password, password_applied } =
  usePassword({
    search_query,
    results,
  });

let {
  pin,
  load,
  database,
  database_not_found,
  database_is_encrypted,
  pinned_ids,
  loading,
} = useDatabase({
  route,
  router,
  faqelizeConfig,
  openItem,
  password,
  setPassword,
  passwordApplied,
  logout,
  SuggestPWAInstall,
  setSearchDictionary,
});

/**
 * Mounted
 */

function passwordEntered(password: string) {
  setPassword(password);
  load();
}

onMounted(() => {
  usePins.value = faqelizeConfig.usePins;
  load();
});
</script>

<template>
  <div>
    <!-- Loading view -->
    <Faqelize-Loader v-if="loading && !database_not_found" />

    <!-- Database error view -->
    <Faqelize-DatabaseError v-if="loading && database_not_found" />

    <!-- Password view -->
    <Faqelize-EnterPassword
      v-if="!loading && !password_applied"
      @password-entered="passwordEntered"
      :logo="logo"
    />

    <!-- Answer page component -->
    <Faqelize-SubPage
      ref="subPage"
      :page_title="page_title"
      @closed="subPageClosed"
    >
      <component :is="opened_page" />
    </Faqelize-SubPage>

    <!-- Control panel -->
    <div class="right_panel">
      <Faqelize-Logout
        v-if="!loading && password_applied && database_is_encrypted"
        @logout="logout"
      />
      <Faqelize-i18nSelect />
    </div>

    <!-- Main view -->
    <div class="search_holder" v-if="!loading && password_applied">
      <div
        class="logo"
        v-if="logo"
        :style="{ backgroundImage: `url(${logo})` }"
      ></div>
      <div class="menu_and_search">
        <div class="menu">
          <div
            :class="{ menu_item: true, selected: selected_area == 'all' }"
            @click="changeArea('all')"
          >
            {{ $t("ALL_DATABASE") }}
          </div>
          <div
            :class="{
              menu_item: true,
              selected: selected_area == 'pinned',
            }"
            @click="changeArea('pinned')"
            v-if="usePins"
          >
            {{ $t("PINNED") }}
          </div>
        </div>
        <template v-if="selected_area == 'all'">
          <Faqelize-Search @search="search" :placeholder="$t('SEARCH')" />
        </template>
      </div>

      <div class="areas">
        <div class="area" v-if="selected_area == 'all'">
          <template v-if="!search_query">
            <Faqelize-Results
              :list="database"
              :nothing_text="$t('DATABASE_IS_EMPTY')"
              @pin="pin"
              @open="openItem"
            />
          </template>
          <template v-else>
            <Faqelize-Results
              :display_ids="results.map((x) => x.id)"
              :list="database"
              :nothing_text="search_query ? $t('NO_RESULTS') : ''"
              @pin="pin"
              @open="openItem"
            />
          </template>
        </div>
        <div class="area" v-if="selected_area == 'pinned'">
          <Faqelize-Results
            :display_ids="pinned_ids"
            :list="database"
            :nothing_text="$t('NO_PINNED')"
            mode="pinned"
            @pin="pin"
            @open="openItem"
          />
        </div>
      </div>
    </div>

    <!-- PWA install promotion component -->
    <Faqelize-SuggestPWAInstall
      ref="SuggestPWAInstallComponent"
      :autoInit="false"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/faqelize.scss";
</style>
