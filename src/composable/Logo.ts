import { computed } from "vue";
import type { Route } from "vue-router";

import type FaqelizeConfig from "../../faqelize.config";

function Logo({
  faqelizeConfig,
  route,
}: {
  faqelizeConfig: FaqelizeConfig;
  route: Route;
}) {
  const logo = computed(() => {
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
