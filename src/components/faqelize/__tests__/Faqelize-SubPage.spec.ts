import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import SubPage from "../Faqelize-SubPage.vue";

describe("SubPage", () => {
  it("page_title prop renders properly", () => {
    const wrapper = mount(SubPage, {
      props: {
        page_title: "Testing",
      },
      data() {
        return {
          justOpen: true,
          isShow: true,
        };
      },
    });
    expect(wrapper.html()).toContain("Testing");
  });
});
