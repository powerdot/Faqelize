<template>
  <div>
    <input
      type="text"
      :placeholder="$t('SEARCH')"
      @keyup="search"
      v-model="search_query_local"
    />
    <button
      v-if="search_query_local != ''"
      class="clear"
      @click="clearSearchQuery"
    >
      <i class="bi bi-x"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    search_query: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      search_query_local: this.search_query || "",
    };
  },
  methods: {
    search() {
      this.$emit("search", this.search_query_local);
    },
    clearSearchQuery() {
      this.search_query_local = "";
      this.$emit("search", this.search_query_local);
    },
  },
  watch: {
    search_query: function (new_value) {
      this.search_query_local = new_value || "";
    },
  },
});
</script>

<style lang="scss" scoped>
input {
  padding: 10px 10px;
  border: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  font-size: 16pt;
  width: calc(100% - 20px);
  appearance: none;
  border-radius: unset;
  margin: unset;
}

.clear {
  position: absolute;
  margin-left: -35px;
  margin-top: 10px;
  font-size: 20px;
  background: unset;
  border: unset;
  outline: none;
  cursor: pointer;
  opacity: 0.5;
  color: black;
  &:hover {
    opacity: 1;
  }
}
</style>

<style lang="scss" scoped>
// mobile query
@media only screen and (max-width: 600px) {
  .search_holder input {
    padding: 10px 20px;
    width: calc(100% - 40px);
    outline: none;
  }
  .clear {
    opacity: 1;
    padding: 0;
  }
}
</style>
