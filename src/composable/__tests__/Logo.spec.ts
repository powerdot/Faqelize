import { describe, it, expect, vi } from "vitest";
import useLogo from "../Logo.ts";
import faqelizeConfig from "../../../faqelize.config";

describe("LOGO", () => {
  it("get default logo", async () => {
    const { logo } = new useLogo({
      faqelizeConfig: {
        ...faqelizeConfig,
        logo: "",
        acceptLogoParameter: false,
      },
      route: { query: {} },
    });

    expect(logo.value).toBe("./img/logo.png");
  });

  it("get logo defined in faqelize.config", async () => {
    const { logo } = new useLogo({
      faqelizeConfig: {
        ...faqelizeConfig,
        logo: "my_logo.png",
        acceptLogoParameter: false,
      },
      route: { query: {} },
    });

    expect(logo.value).toBe("my_logo.png");
  });

  it("get logo defined in query parameter", async () => {
    const { logo } = new useLogo({
      faqelizeConfig: {
        ...faqelizeConfig,
        logo: "my_logo.png",
        acceptLogoParameter: true,
        logoParameterKey: "logo",
      },
      route: {
        query: {
          logo: "my_logo_from_query.png",
        },
      },
    });

    expect(logo.value).toBe("my_logo_from_query.png");
  });

  it("disallow logo defined in query parameter", async () => {
    const { logo } = new useLogo({
      faqelizeConfig: {
        ...faqelizeConfig,
        logo: "my_logo.png",
        acceptLogoParameter: false,
        logoParameterKey: "logo",
      },
      route: {
        query: {
          logo: "my_logo_from_query.png",
        },
      },
    });

    expect(logo.value).toBe("my_logo.png");
  });
});
