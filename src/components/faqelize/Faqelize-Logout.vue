<template>
  <button class="logout" @click="logout">
    <div class="label">{{ $t("LOGOUT") }}</div>
    <i class="bi bi-x-lg"></i>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LogoutComponent",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
  mounted() {
    let isStandalone = "standalone" in window.navigator;
    if (!(this.$faqelize.disableLogoutOnStandalone && isStandalone)) {
      this.show = true;
    }
  },
});
</script>

<style lang="scss" scoped>
.logout {
  width: 100%;
  padding: 9px 0px;
  border-radius: 8px;
  color: gray;
  border: 1px solid #d8d8d8;
  background: white;
  cursor: pointer;
  margin-bottom: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  i {
    display: none;
  }
  &:hover {
    color: red;
    border-color: red;
  }
}
</style>

<style lang="scss" scoped>
@media only screen and (max-width: 600px) {
  .logout {
    width: 40px;
    height: 40px;
    border: none;
    margin-left: 10px;
    i {
      display: block;
    }
    .label {
      display: none;
    }
  }
}
</style>
