<template>
  <div>
    <div class="background" v-if="isShow" @click="close"></div>
    <div class="subPage" :class="{ animOpen, justOpen }" v-if="isShow">
      <div class="top">
        <div class="title">{{ page_title }}</div>
        <!-- close -->
        <div class="close" @click="close">
          <i class="bi bi-x"></i>
        </div>
      </div>
      <div class="body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      isShow: false as boolean,
      scrollY: 0 as number,
      animOpen: false as boolean,
      justOpen: false as boolean,
    };
  },
  props: {
    page_title: {
      type: String,
      default: "",
    },
  },
  methods: {
    close() {
      this.isShow = false;
      window.document.body.classList.remove("no-scroll");
      window.scrollTo(0, this.scrollY);
      this.animOpen = false;
      this.$emit("closed");
    },
    open({ animation = true } = {}) {
      this.isShow = true;
      window.document.body.classList.add("no-scroll");
      this.scrollY = window.pageYOffset;
      if (animation && this.$faqelize.answerPageOpeningAnimation) {
        this.animOpen = true;
      } else {
        this.justOpen = true;
      }
    },
  },
  unmounted() {
    window.document.body.classList.remove("no-scroll");
  },
});
</script>

<style lang="scss" scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
}

.subPage {
  position: fixed;
  background: white;
  z-index: 10;
  text-align: left;
  width: 90%;
  max-width: 950px;
  height: 700px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 100%);
  border-radius: 8px;
  overflow: hidden;

  &.animOpen {
    animation: animOpen 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
  }

  &.justOpen {
    transform: translate(-50%, -50%);
  }

  .top {
    background: #ededed;
    height: 58px;

    .title {
      font-size: 12pt;
      text-align: left;
      padding: 18px;
      padding-right: 60px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .close {
      position: absolute;
      right: 20px;
      top: 10px;
      font-size: 30px;
      cursor: pointer;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
  .body {
    padding: 0px 30px;
    overflow-y: scroll;
    height: calc(100% - 58px);
  }
}

@media screen and (min-width: 900px) and (max-height: 720px) {
  .subPage {
    top: 10px !important;
    transform: translate(-50%, 0) !important;
    height: calc(100% - 20px) !important;
  }
}

@keyframes animOpen {
  from {
    transform: translate(-50%, 100%);
  }
  to {
    transform: translate(-50%, -50%);
  }
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 900px) {
  .subPage {
    transform: translate(0%, 100%);
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
    max-width: unset;
    border-radius: 0px;
    &.animOpen {
      animation: animOpen-mobile 0.5s;
      animation-fill-mode: forwards;
      animation-timing-function: ease-out;
    }
    &.justOpen {
      transform: translate(0%, 0%);
    }
  }
}

@keyframes animOpen-mobile {
  from {
    transform: translate(0%, 100%);
  }
  to {
    transform: translate(0%, 0%);
  }
}
</style>
