<template>
  <div class="holder" v-if="show">
    <div class="popup">
      <h3>Сохрани на рабочий стол 😏</h3>
      <div class="content">
        <template v-if="system == 'ios' && browser == 'safari'">
          Нажми на
          <div class="iosIconShareSwg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              enable-background="new 0 0 50 50"
            >
              <path d="M30.3 13.7L25 8.4l-5.3 5.3-1.4-1.4L25 5.6l6.7 6.7z" />
              <path d="M24 7h2v21h-2z" />
              <path
                d="M35 40H15c-1.7 0-3-1.3-3-3V19c0-1.7 1.3-3 3-3h7v2h-7c-.6 0-1 .4-1 1v18c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V19c0-.6-.4-1-1-1h-7v-2h7c1.7 0 3 1.3 3 3v18c0 1.7-1.3 3-3 3z"
              />
            </svg>
          </div>
          ниже и нажми на
          <div class="iosButton">
            На экран «Домой»
            <div class="iosPlusIcon">+</div>
          </div>
        </template>
        <template v-if="system == 'android'">
          <template v-if="browser == 'chrome'">
            Нажми на
            <div class="chromeMenuIcon">
              <i class="bi bi-three-dots-vertical"></i>
            </div>
            справа сверху и нажми на
            <div class="chromeButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path
                  d="M18 1.01L8 1c-1.1 0-2 .9-2 2v3c0 .55.45 1 1 1s1-.45 1-1V5h10v14H8v-1c0-.55-.45-1-1-1s-1 .45-1 1v3c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM11 15c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1s.45 1 1 1h2.59L3.7 14.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L10 11.41V14c0 .55.45 1 1 1z"
                />
              </svg>
              Добавить на гл. экран
            </div>
          </template>
          <template v-if="browser == 'YaApp'">
            Нажми на
            <div class="chromeMenuIcon">
              <i class="bi bi-three-dots-vertical"></i>
            </div>
            справа сверху и нажми на
            <div class="androidButton">Добавить ярлык</div>
          </template>
          <template v-if="browser == 'YaBrowser'">
            Нажми на
            <div class="chromeMenuIcon">
              <i class="bi bi-three-dots-vertical"></i>
            </div>
            справа снизу и нажми на
            <div class="androidButton">Добавить ярлык</div>
          </template>
          <template v-if="browser == 'Firefox'">
            Нажми на
            <div class="chromeMenuIcon">
              <i class="bi bi-three-dots-vertical"></i>
            </div>
            справа снизу и нажми на
            <div class="androidButton">На домашний экран</div>
          </template>
          <template v-if="browser == 'Opera'">
            Нажми на
            <div class="chromeMenuIcon">
              <i class="bi bi-three-dots-vertical"></i>
            </div>
            справа сверху и нажми на
            <div class="chromeButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path
                  d="M18 1.01L8 1c-1.1 0-2 .9-2 2v3c0 .55.45 1 1 1s1-.45 1-1V5h10v14H8v-1c0-.55-.45-1-1-1s-1 .45-1 1v3c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM11 15c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1s.45 1 1 1h2.59L3.7 14.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L10 11.41V14c0 .55.45 1 1 1z"
                />
              </svg>
              Домашний экран
            </div>
          </template>
          <template v-if="browser == 'MiuiBrowser'"> </template>
        </template>
      </div>
      <button class="close" @click="close">Не хочу</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    autoInit: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      system: "",
      browser: "",
      ua: "",
      show: false,
    };
  },
  methods: {
    getSystem() {
      var ua = navigator.userAgent;
      var isAndroid = ua.indexOf("Android") > -1;
      var isIOS = /iPad|iPhone|iPod/.test(ua);
      if (isAndroid) {
        return "android";
      } else if (isIOS) {
        return "ios";
      }
      return "else";
    },
    getBrowser() {
      var ua = navigator.userAgent;
      this.ua = ua;
      var isChrome = ua.indexOf("Chrome") > -1;
      var isSafari = ua.indexOf("Safari") > -1;
      let isYaApp = ua.indexOf("YaApp") > -1;
      let isFirefox = ua.indexOf("Firefox") > -1;
      let isOpera = ua.indexOf("OPR/") > -1;
      let isUCBrowser = ua.indexOf("UCBrowser") > -1; // UCBrowser dosnt support pwa app linking
      let isMiuiBrowser = ua.indexOf("MiuiBrowser") > -1; // MiuiBrowser dosnt support pwa app linking
      let isYaBrowser = ua.indexOf("YaBrowser") > -1;
      if (isYaApp) return "YaApp";
      if (isFirefox) return "Firefox";
      if (isOpera) return "Opera";
      if (isMiuiBrowser) return "";
      if (isYaBrowser) return "YaBrowser";
      if (isUCBrowser) return "";
      if (isChrome && isSafari) {
        return "chrome";
      } else if (isSafari) {
        return "safari";
      }
      return "else";
    },
    close() {
      this.$emit("close");
      localStorage.setItem(this.$localStorageKeys.iapwa, "no");
      this.show = false;
    },
    init() {
      this.system = this.getSystem();
      this.browser = this.getBrowser();
      let iOSIsInstalled = this.$isStandalone();
      this.show =
        this.$faqelize.installAsPWA &&
        localStorage.getItem(this.$localStorageKeys.iapwa) !== "no" &&
        !!this.system &&
        !!this.browser &&
        !iOSIsInstalled;
    },
  },
  mounted() {
    if (this.autoInit) this.init();
  },
});
</script>

<style lang="scss" scoped>
.holder {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  .popup {
    background: white;
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 95%;
    height: auto;
    transform: translate(-50%, 0);
    border-radius: 16px 16px 0 0;

    .content {
      margin-bottom: 25px;
    }

    .iosIconShareSwg {
      display: inline-block;
      background-size: contain;
      width: 24px;
      height: 24px;
      position: relative;
      top: 6px;
      svg {
        fill: #2196f3;
      }
    }

    .iosButton {
      background: #eee;
      display: inline-block;
      padding: 10px 30px;
      margin-top: 5px;
      border-radius: 7px;
      padding-left: 15px;
    }

    .iosPlusIcon {
      display: inline-block;
      margin-left: 40px;
      margin-right: -15px;
      border: 2px solid;
      padding: 0px 3px;
      border-radius: 4px;
      line-height: 15px;
      font-weight: bold;
      font-family: Arial;
      color: #363636;
    }

    .chromeMenuIcon {
      display: inline-block;
      background: #3c3c3c;
      color: white;
      height: 21px;
      width: 22px;
      padding-top: 1px;
      border-radius: 4px;
    }

    .chromeButton {
      background: #eee;
      display: inline-block;
      padding: 10px 30px;
      margin-top: 5px;
      border-radius: 7px;
      padding-left: 15px;
      svg {
        height: 20px;
        margin-bottom: -4px;
        margin-right: 5px;
      }
    }

    .androidButton {
      background: #eee;
      display: inline-block;
      padding: 10px 30px;
      margin-top: 5px;
      border-radius: 7px;
    }

    .close {
      margin-bottom: 30px;
      width: 80%;
      background: black;
      padding: 12px 0px;
      border: unset;
      border-radius: 6px;
      outline: none;
      color: white;
      font-size: 16px;
    }
  }
}
</style>
