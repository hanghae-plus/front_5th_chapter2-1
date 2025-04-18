import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "/front_5th_chapter2-1/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests.js",
  },
});


