import { ref } from "vue";
import type { SearchResult } from "minisearch";
import MiniSearch from "minisearch";
import convertToDictionary from "../../faqelize/plugins/convertToDictionary";

function Search() {
  const search_query = ref("");
  const results = ref([] as SearchResult[]);
  const selected_area = ref("all");
  const miniSearch = new MiniSearch({
    fields: ["q"],
    storeFields: ["q", "a"],
    searchOptions: {
      fuzzy: 0.2,
    },
  });

  const setSearchDictionary = (dictionary: Dictionary) => {
    miniSearch.addAll(dictionary);
    return;
  };

  const search = (sq: string = "") => {
    search_query.value = sq;
    const search_results = miniSearch.search(search_query.value);
    const search_dictionary = convertToDictionary(search_results);
    results.value = search_dictionary;
    return search_dictionary;
  };

  const clearSearchQuery = () => {
    search_query.value = "";
    search();
    return;
  };

  const changeArea = (area: string) => {
    selected_area.value = area;
    return;
  };

  return {
    search,
    search_query,
    results,
    selected_area,
    clearSearchQuery,
    changeArea,
    setSearchDictionary,
  };
}

export default Search;
