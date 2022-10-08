import { computed } from "vue";
import { useRoute } from "vue-router";

import faqelizeConfig from "../../faqelize.config";

function Logo() {
  const route = useRoute();
  const logo = computed(() => {
    faqelizeConfig.showLanguageSwitcher;
    const logo_config = faqelizeConfig.logo;
    const default_logo_path = "./img/logo.png";
    if (faqelizeConfig.acceptLogoParameter) {
      const logo = route.query[faqelizeConfig.logoParameterKey];
      if (logo) return logo;
    }
    if (typeof logo_config == "string") {
      if (!logo_config) return default_logo_path;
      return logo_config;
    }
    if (typeof logo_config == "boolean") {
      if (logo_config) return default_logo_path;
      return false;
    }
    return default_logo_path;
  });

  return { logo };
}

export default Logo;
