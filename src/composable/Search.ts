import { ref } from "vue";
import type { SearchResult } from "minisearch";

function Search() {
  const search_query = ref("");
  const results = ref([] as SearchResult[]);
  const selected_area = ref("all");

  const search = (sq: string = "") => {
    search_query.value = sq;
    let results = miniSearch.search(search_query.value);
    results = convertToDictionary(results);
    return results;
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
  };
}

export default Search;
