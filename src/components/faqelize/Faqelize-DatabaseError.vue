<template>
  <div class="setup_database_holder">
    <h2>{{ $t("DATABASE_NOT_FOUND") }}</h2>
    <i18n-t keypath="DATABASE_SETUP" tag="p" scope="global">
      <b>database.json</b>
      <b>/public</b>
    </i18n-t>
    <a href="#" target="_blank">{{ $t("DATABASE_MORE_INFO") }}</a>
  </div>
</template>
