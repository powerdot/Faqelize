import { createI18n } from "vue-i18n";
import messages from "@intlify/unplugin-vue-i18n/messages";
import faqelizeConfig from "../../faqelize.config.ts";

// List of all locales.
export const allLocales = faqelizeConfig.languages.map((x) => x.code);

// Create Vue I18n instance.
export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: faqelizeConfig.defaultLanguage,
  fallbackLocale: faqelizeConfig.defaultLanguage,
  messages: messages,
});

// Set new locale.
export async function setLocale(locale) {
  // Load locale if not available yet.
  if (!i18n.global.availableLocales.includes(locale)) {
    const messages = await loadLocale(locale);

    // fetch() error occurred.
    if (messages === undefined) {
      return;
    }

    // Add locale.
    i18n.global.setLocaleMessage(locale, messages);
  }

  // Set locale.
  i18n.global.locale.value = locale;
}

export const component = {
  template: `
    <div>
      <p>{{ $t('hello') }}</p>
      <p>{{ $t('hello', { name: 'kazupon' }) }}</p>
      <p>{{ $t('hello', { name: 'kazupon' }, 'ja') }}</p>
    </div>
  `,
};

// Fetch locale.
function loadLocale(locale) {
  return fetch(`./locales/${locale}.json`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Something went wrong!");
    })
    .catch((error) => {
      console.error(error);
    });
}
