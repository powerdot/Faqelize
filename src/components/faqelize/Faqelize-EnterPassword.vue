<template>
  <div class="password_holder">
    <div
      class="logo"
      v-if="logo"
      :style="{ backgroundImage: `url(${logo})` }"
    ></div>
    <div class="title">{{ $t("ENTER_PASSWORD") }}</div>
    <input
      type="password"
      name="password"
      v-model="password"
      @keyup.enter="checkPassword"
      autocomplete="off"
      data-password-autocomplete="off"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    logo: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      password: "",
    };
  },
  methods: {
    checkPassword(e: KeyboardEvent) {
      if (e.key == "Enter") {
        if (this.password.length > 0) {
          this.$emit("password-entered", this.password);
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.password_holder {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .logo {
    height: 40px;
    width: 100%;
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
    margin: 0 auto;
    margin-bottom: 50px;
  }

  .title {
    margin-bottom: 10px;
    cursor: default;
    font-size: 10pt;
    text-align: center;
  }
  input {
    border: none;
    border-bottom: 1px solid #ddd;
    background: #f9f9f9;
    padding: 10px 20px;
    outline: none;
  }
}
</style>
