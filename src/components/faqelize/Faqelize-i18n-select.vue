<template>
  <div v-if="activate" class="i18holder">
    <button class="globe" @click="show = !show">
      <i class="bi bi-globe2"></i>
    </button>

    <div class="language_picker" :class="{ show }">
      <button class="close" @click="show = false">
        <i class="bi bi-x"></i>
      </button>
      <select v-model="lang" @change="changeLanguage">
        <option
          v-for="lang in langs"
          :value="lang.code"
          :key="'locale-' + lang.code"
        >
          {{ lang.name }}
        </option>
      </select>
      <div class="label">{{ $t("SELECT_LANG") }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      activate: false,
      show: false,
      lang: "en",
      langs: [] as { code: string; name: string }[],
      localeNames: {} as { [key: string]: string },
    };
  },
  mounted() {
    this.activate = this.$faqelize.showLanguageSwitcher;

    for (let lang of this.$faqelize.languages) {
      this.localeNames[lang.code] = lang.name;
      this.langs.push(lang);
    }

    // localStorage local setting
    let lang = localStorage.getItem(this.$localStorageKeys.locale);
    this.lang =
      lang ||
      this.$faqelize.defaultLanguage ||
      this.$i18n.locale ||
      this.$i18n.fallbackLocale;

    this.changeLanguage();
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale = this.lang;
      localStorage.setItem(this.$localStorageKeys.locale, this.lang);
    },
  },
});
</script>

<style lang="scss" scoped>
.language_picker {
  width: 100%;
  padding: 20px 0px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  background-color: #fff;
  z-index: 2;
  .label {
    color: gray;
    cursor: default;
    font-size: 10px;
    margin-top: 5px;
  }
}

.globe {
  display: none;
}

.close {
  display: none;
}
</style>

<style lang="scss" scoped>
// mobile styles
@media (max-width: 1250px) {
  .i18holder {
    position: relative;
  }
  .globe {
    margin-left: auto;
    display: block;
    // position: absolute;
    // right: 0px;
    // top: 0px;
    padding: 10px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    border: none;
    color: black;
    height: 40px;
    width: 40px;
    line-height: 20px;
    z-index: 3;
    -webkit-appearance: none;
    i {
      font-size: 20px;
    }
  }
  .language_picker {
    display: none;
    position: absolute;
    right: 0px;
    top: 0px;
    min-width: 140px;
    width: fit-content;
    padding: 20px 10px;
    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
    background-color: #fff;
    z-index: 4;
    .label {
      color: gray;
      cursor: default;
      font-size: 10px;
      margin-top: 5px;
    }
    &.show {
      display: block;
    }
  }

  .close {
    display: block;
    position: absolute;
    padding: 0;
    right: 10px;
    top: 7px;
    border-radius: 50%;
    background-color: unset;
    border: none;
    color: black;
    i {
      font-size: 20px;
    }
  }
}
</style>
