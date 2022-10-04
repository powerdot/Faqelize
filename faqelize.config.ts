const configuration = {
  // App title
  title: "Faqelize" as string,

  // Database location:
  // 'local'
  // or any link 'https://my.s3.storage.io/bucket/secret_database.json'
  database: "local" as string,

  languages: [
    { code: "ru", name: "Русский" },
    { code: "en", name: "English" },
  ] as { code: string; name: string }[],

  // Default language. Preinstalled languages: en (English), ru (Russian)
  defaultLanguage: "ru" as string,

  // Display language switcher.
  showLanguageSwitcher: true as boolean,

  // Enable pins.
  usePins: true as boolean,

  // Autosave password hash in localstorage.
  savePassword: true as boolean,

  // Encrypt database.json with password while building.
  encryptDatabase: true as boolean,

  // Suggest install as app on mobile devices.
  installAsPWA: true as boolean,

  // Disable logout if page works as PWA on smartphone.
  disableLogoutOnStandalone: true as boolean,

  // Set logotype image.
  // Can be bool and string.
  // If string is empty - default logo from ./public/img/logo.png
  // If string is not empty - image from string (URL or base64)
  // If bool is true - default logo from ./public/img/logo.png
  // If bool is false - no logo
  logo: "" as string | boolean,

  // Public path for production.
  productionPublicPath: "/Faqelize/" as string,

  // Accept login by &password URL parameter.
  // ! Can be unsecure.
  // But if you use it, better send sha256 password hash instead of raw password.
  acceptPasswordParameter: true as boolean,

  // Determines URL parameter for password.
  passwordParameterKey: "password" as string,

  // Clear password parameter from URL after login.
  clearPasswordParameter: true as boolean,

  // Accept logo by &logo URL parameter.
  acceptLogoParameter: true as boolean,

  // Determines URL parameter for logo.
  logoParameterKey: "logo" as string,

  // Accept use database by URL parameter.
  acceptDatabaseParameter: true as boolean,

  // Determines URL parameter for database.
  databaseParameterKey: "db" as string,

  // Display or hide icon of "page" type of answer.
  displayPageIcon: true as boolean,

  // Animate opening for answer page.
  answerPageOpeningAnimation: false as boolean,
};

export default configuration;
