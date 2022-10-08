// Install configuration
import configuration from "../faqelize.config";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $faqelize: typeof configuration;
  }
}

// Install localstorage keys
import localStorageKeys from "./plugins/localStorageKeys";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $localStorageKeys: typeof localStorageKeys;
  }
}

// Install Dictionary converter
import convertToDictionary from "./plugins/convertToDictionary";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $convertToDictionary: typeof convertToDictionary;
  }
}

// Install Faqelize Crypto plugin
import faqelizeCrypto from "./plugins/crypto";
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $faqelizeCrypto: typeof faqelizeCrypto;
  }
}

// Install Faqelize isStandalone plugin
import isStandalone from "./plugins/isStandalone";
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $isStandalone: typeof isStandalone;
  }
}

// Export
export default {
  install: (app) => {
    app.config.globalProperties.$faqelize = configuration;
    app.config.globalProperties.$localStorageKeys = localStorageKeys;
    app.config.globalProperties.$convertToDictionary = convertToDictionary;
    app.config.globalProperties.$faqelizeCrypto = faqelizeCrypto;
    app.config.globalProperties.$isStandalone = isStandalone;
  },
  configuration,
  localStorageKeys,
  convertToDictionary,
  faqelizeCrypto,
  isStandalone,
};
