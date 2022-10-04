import { fileURLToPath, URL } from "node:url";
import { resolve, dirname } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import FaqelizeBuildTool from "./faqelize/build_tool";
import FaqelizeConfig from "./faqelize.config";

const hash = new Date().getTime();

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        "./src/i18n/**"
      ),
      runtimeOnly: false,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base:
    process.env.NODE_ENV === "production"
      ? FaqelizeConfig.productionPublicPath || "/"
      : "/",
  build: {
    outDir: "docs",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: `[name]-` + hash + `.js`,
        chunkFileNames: `[name]-` + hash + `.js`,
        assetFileNames: `[name]-` + hash + `.[ext]`,
      },
      plugins: [
        FaqelizeBuildTool.vite.EncryptDatabase,
        FaqelizeBuildTool.vite.CleanRawDatabaseFromDist,
      ],
    },
  },
});
