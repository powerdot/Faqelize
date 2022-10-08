import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n/index.ts";
import ifc from "../faqelize/install";

const app = createApp(App);
document.title = ifc.configuration.title;

// Bootstrap icons
import "bootstrap-icons/font/bootstrap-icons.css";

// Register all pages as components
const requirePages = import.meta.glob("./pages/*.vue");
for (const page in requirePages) {
  const pageName = page.split("/").pop().split(".")[0];
  requirePages[page]().then((module) => {
    app.component(pageName, module.default);
  });
}

// Register all Faqelize components
import i18nSelect from "./components/faqelize/Faqelize-i18n-select.vue";
app.component("Faqelize-i18nSelect", i18nSelect);
import logout from "./components/faqelize/Faqelize-Logout.vue";
app.component("Faqelize-Logout", logout);
import Results from "./components/faqelize/Faqelize-Results.vue";
app.component("Faqelize-Results", Results);
import Loader from "./components/faqelize/Faqelize-Loader.vue";
app.component("Faqelize-Loader", Loader);
import SubPage from "./components/faqelize/Faqelize-SubPage.vue";
app.component("Faqelize-SubPage", SubPage);
import SuggestPWAInstall from "./components/faqelize/Faqelize-SuggestPWAInstall.vue";
app.component("Faqelize-SuggestPWAInstall", SuggestPWAInstall);
import DatabaseError from "./components/faqelize/Faqelize-DatabaseError.vue";
app.component("Faqelize-DatabaseError", DatabaseError);
import EnterPassword from "./components/faqelize/Faqelize-EnterPassword.vue";
app.component("Faqelize-EnterPassword", EnterPassword);
import Search from "./components/faqelize/Faqelize-Search.vue";
app.component("Faqelize-Search", Search);

app.use(router).use(ifc).use(i18n).mount("#app");
