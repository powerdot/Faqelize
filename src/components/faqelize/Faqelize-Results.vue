<template>
  <div class="results">
    <div class="no_results" v-if="local_list.length == 0">
      {{ nothing_text }}
    </div>
    <div
      class="result"
      v-for="item of local_list"
      :key="'result' + item.id"
      @click="open($event, item)"
    >
      <button
        :class="{ pin: true, pinned: item.pinned }"
        @click.stop="pin(item)"
        v-if="usePins"
      >
        <i :class="['bi', item.pinned ? 'bi-star-fill' : 'bi-star']"></i>
      </button>
      <div class="title">
        {{ item.q }}
      </div>
      <span class="answer" :class="{ open: item.expanded }">
        {{ item.a_text ? item.a_text : item.a_page?.subText || "" }}
        <template v-if="item.a_html">
          <div v-html="item.a_html.html"></div>
        </template>
      </span>
      <template v-if="item.a_page && $faqelize.displayPageIcon">
        <template v-if="item.a_page">
          <i class="bi bi-arrow-up-right-square page_result"></i>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type Dictionary from "../../../faqelize/types/dictionary";
import type Item from "../../../faqelize/types/item";

type ResultsItem = Item & {
  expanded: boolean;
};
type ResultsDictionary = ResultsItem[];

export default defineComponent({
  props: {
    display_ids: {
      type: Array as () => (String | Number)[],
      default: () => [],
    },
    list: {
      type: Array as () => Dictionary,
      default: () => [] as Dictionary,
    },
    nothing_text: {
      type: String,
      default: "",
    },
    mode: {
      type: String,
      default: "search",
    },
  },
  data() {
    return {
      usePins: false,
      local_list: [] as ResultsDictionary,
    };
  },
  methods: {
    pin(item: ResultsItem) {
      this.$emit("pin", { id: item.id, pinned: !item.pinned });
    },
    updateList() {
      if (this.display_ids.length || this.mode == "pinned") {
        this.local_list = [];
        for (let id of this.display_ids) {
          let found = this.list.find((item) => item.id == id);
          if (found) {
            this.local_list.push({ ...found, expanded: false });
          }
        }
      } else {
        this.local_list = this.list.map((item) => ({
          ...item,
          expanded: false,
        }));
      }
    },
    open(e: MouseEvent, item: ResultsItem) {
      if (!item.a_page) return (item.expanded = !item.expanded);
      this.$emit("open", item);
    },
  },
  mounted() {
    this.usePins = this.$faqelize.usePins;
    this.updateList();
  },
  watch: {
    list() {
      this.updateList();
    },
    display_ids() {
      this.updateList();
    },
  },
});
</script>

<style lang="scss" scoped>
.results {
  .no_results {
    text-align: center;
    cursor: default;
    color: gray;
    padding: 17px;
    font-size: 10pt;
  }
  .result {
    background: #eee;
    padding: 10px 15px;
    margin-bottom: 5px;
    text-align: left;
    border-left: 2px solid #cccccc;
    position: relative;
    .title {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      padding-right: 16px;
      font-weight: bold;
    }
    .answer {
      white-space: pre-line;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      padding-right: 20px;
      &.open {
        display: block;
        -webkit-line-clamp: unset;
        -webkit-box-orient: unset;
        overflow: visible;
      }
    }
    .pin {
      position: absolute;
      right: 8px;
      top: 5px;
      background: unset;
      border: unset;
      opacity: 0.5;
      cursor: pointer;
      color: black;
      padding: 0;
      outline: none;
    }

    .page_result {
      position: absolute;
      right: 8px;
      bottom: 4px;
      opacity: 0.2;
      cursor: pointer;
      font-size: 12px;
    }
    &:hover {
      border-left-color: #3f51b5;
      .pin {
        opacity: 1;
        &:hover {
          color: #3f51b5;
        }
      }
      .pin.pinned:hover {
        color: #29388b;
      }

      .page_result {
        opacity: 0.5;
        &:hover {
          opacity: 1;
        }
      }
    }
    .pin.pinned {
      color: #3f51b5;
      opacity: 1;
    }
  }
}
</style>

<style lang="scss" scoped>
// mobile media query
@media only screen and (max-width: 600px) {
  .results .result {
    border-left: 0;
  }
  .results .result .pin {
    font-size: 20px;
    padding: 0;
  }
  .results .result .pin.pinned {
    color: #3f51b5;
  }
  .results .result:hover .pin.pinned:hover {
    color: #3f51b5;
  }
  .results .result:hover {
    border-left-color: #ccc;
  }
  .results .result .page_result {
    font-size: 20px;
    right: 10px;
  }
}
</style>
