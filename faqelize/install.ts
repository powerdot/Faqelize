// Install configuration
import configuration from "../faqelize.config";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $faqelize: typeof configuration;
  }
}

// Install localstorage keys
const localStorageKeys = {
  locale: `faqelize_${document.location.host}_locale` as string,
  iapwa: `faqelize_${document.location.host}_iapwa` as string,
  password: `faqelize_${document.location.host}_password` as string,
  pinned: `faqelize_${document.location.host}_pinned` as string,
};

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

// Export
export default {
  install: (app) => {
    app.config.globalProperties.$faqelize = configuration;
    app.config.globalProperties.$localStorageKeys = localStorageKeys;
    app.config.globalProperties.$convertToDictionary = convertToDictionary;
    app.config.globalProperties.$faqelizeCrypto = faqelizeCrypto;
  },
  configuration,
  localStorageKeys,
  convertToDictionary,
  faqelizeCrypto,
};
