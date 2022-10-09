import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Results from "../Faqelize-Results.vue";
import type Dictionary from "../../../../faqelize/types/dictionary";
import Faqelize from "../../../../faqelize/install";

const dictionary = [
  {
    id: "one",
    q: "one",
    a_text: "one",
    pinned: false,
  },
  {
    id: "two",
    q: "two",
    a_text: "two",
    pinned: true,
  },
] as Dictionary;

describe("Results", () => {
  it("test pinned mode", () => {
    const wrapper = mount(Results, {
      props: {
        mode: "pinned",
        list: dictionary,
        display_ids: [],
        nothing_text: "nothing",
      },
      global: {
        plugins: [Faqelize],
      },
    });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find(".result").exists()).toBe(true);
      expect(wrapper.find(".result").text()).not.toBe("one");
    });
  });
});

describe("Results", () => {
  it("test search mode with one display_id", () => {
    const wrapper = mount(Results, {
      props: {
        mode: "search",
        list: dictionary,
        display_ids: ["one"],
        nothing_text: "nothing",
      },
      global: {
        plugins: [Faqelize],
      },
    });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find(".result").exists()).toBe(true);
      expect(wrapper.find(".result").text()).not.toBe("two");
    });
  });
});

describe("Results", () => {
  it("test search mode with empty display_ids", () => {
    const wrapper = mount(Results, {
      props: {
        mode: "search",
        list: dictionary,
        display_ids: [],
        nothing_text: "nothing",
      },
      global: {
        plugins: [Faqelize],
      },
    });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll(".result").length).toBe(2);
    });
  });
});

describe("Results", () => {
  it("nothing text on no results", () => {
    const wrapper = mount(Results, {
      props: {
        mode: "search",
        list: [],
        display_ids: [],
        nothing_text: "nothing",
      },
      global: {
        plugins: [Faqelize],
      },
    });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll(".no_results")).toHaveLength(1);
    });
  });
});
