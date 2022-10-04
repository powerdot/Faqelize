import type Dictionary from "./types/dictionary";
import type Item from "./types/item";

/**
 * Converts an array to a dictionary
 * @param {any[]} array - The array to convert
 * @example
 * convertToDictionary([{...}])
 * // => Dictionary[{...}]
 */
function convertToDictionary(array: any[]): Dictionary {
  return array.map((x) => {
    const item = {} as Item;
    item.id = x.id as string | number;
    item.pinned = x.pinned || false;
    item.q = x.q as string;
    item.a_text = x.a_text as string;
    item.a_html = x.a_html || undefined;
    item.a_page = x.a_page || undefined;
    return item;
  });
}

export default convertToDictionary;
