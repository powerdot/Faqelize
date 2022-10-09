import { describe, it, expect, vi } from "vitest";
import useSubPage from "../SubPage.ts";

const testDict = [
  {
    id: "one",
    q: "one",
    a_text: "one",
  },
  {
    id: "two",
    q: "two",
    a_page: {
      page: "two",
      subText: "two",
    },
  },
];

describe("SubPage", () => {
  it("open page item", async () => {
    const route = { query: {} };
    const router = { replace: () => { } };
    const subPage = { value: { open: () => { } } };
    vi.spyOn(subPage.value, "open");
    const { opened_page, page_title, openItem, subPageClosed } = useSubPage({
      route,
      router,
      subPage,
    });

    openItem(testDict[1]);
    expect(opened_page.value).toBe(testDict[1].a_page.page);
    expect(subPage.value.open).toHaveBeenCalled();
  });
});

describe("SubPage", () => {
  it("do NOT open NOT page item", async () => {
    const route = { query: {} };
    const router = { replace: () => { } };
    const subPage = { value: { open: () => { } } };
    vi.spyOn(subPage.value, "open");
    const { opened_page, page_title, openItem, subPageClosed } = useSubPage({
      route,
      router,
      subPage,
    });

    openItem(testDict[0]);
    expect(opened_page.value).toBe("");
    expect(subPage.value.open).not.toHaveBeenCalled();
  });
});

describe("SubPage", () => {
  it("query works fine", async () => {
    const route = { query: {} };
    const router = {
      replace: ({ query }) => {
        route.query = query;
      },
    };
    const subPage = { value: { open: () => { } } };
    vi.spyOn(subPage.value, "open");
    const { opened_page, page_title, openItem, subPageClosed } = useSubPage({
      route,
      router,
      subPage,
    });

    openItem(testDict[1]);
    expect(route.query.q).toBe(testDict[1].id);
    subPageClosed();
    expect(route.query.q).toBe(undefined);
  });
});
