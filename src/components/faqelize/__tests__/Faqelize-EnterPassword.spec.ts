import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import EnterPassword from "../Faqelize-EnterPassword.vue";
import { i18n } from "../../../i18n/index.ts";

describe("EnterPassword", () => {
  it("logo prop renders properly", () => {
    const wrapper = mount(EnterPassword, {
      props: {
        logo: "here_is_my_logo_url",
      },
      global: {
        plugins: [i18n],
      },
    });
    expect(wrapper.html()).toContain("here_is_my_logo_url");
  });
});
