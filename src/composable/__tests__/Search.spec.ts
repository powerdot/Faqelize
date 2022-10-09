import { describe, it, expect, vi } from "vitest";
import useSearch from "../Search.ts";

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

describe("Search", () => {
  it("changing area", async () => {
    const {
      search_query,
      results,
      selected_area,
      changeArea,
      search,
      setSearchDictionary,
    } = useSearch();

    changeArea("pinned");
    expect(selected_area.value).toBe("pinned");
  });

  it("searching", async () => {
    const {
      search_query,
      results,
      selected_area,
      changeArea,
      search,
      setSearchDictionary,
    } = useSearch();

    setSearchDictionary(testDict);

    search("one");
    expect(results.value.length).toBe(1);
  });

  it("clearSearchQuery", async () => {
    const {
      search_query,
      results,
      selected_area,
      changeArea,
      search,
      setSearchDictionary,
      clearSearchQuery,
    } = useSearch();

    setSearchDictionary(testDict);
    search("one");
    clearSearchQuery();

    expect(results.value.length).toBe(0);
    expect(search_query.value).toBe("");
  });
});
