import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
const isCI = process.env.CI === "true";

export default mergeConfig(
  defineConfig({
    base: isCI ? "" : "/front_5th_chapter2-1/",
    plugins: [react()],
    resolve: { alias: { "@": path.resolve(__dirname, "src") } },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.html"),
          basic: path.resolve(__dirname, "index.basic.html"),
          advanced: path.resolve(__dirname, "index.advanced.html"),
        },
      },
    },
  }),
  defineTestConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "src/setupTests.js",
    },
  })
);
