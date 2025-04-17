import { resolve } from "node:path";
import { loadEnv } from "vite";
// vite.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => {
  // mode 에 따라 .env 파일에서 VITE_HOSTNAME 불러오기
  const env = loadEnv(mode, process.cwd(), "");

  return {
    root: ".",
    base: env.VITE_HOSTNAME || "/",

    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.basic.html"),
        },
      },
    },

    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "src/setupTests.js",
    },
  };
});
