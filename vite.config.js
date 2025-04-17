import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
export default mergeConfig(
  defineConfig({
    plugins: [react()],
    base: process.env.NODE_ENV === "production" ? "/front_5th_chapter2-1/" : "/",
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.html"),
          basic: path.resolve(__dirname, "index.basic.html"),
          advanced: path.resolve(__dirname, "index.advanced.html")
        }
      }
    }
  }),
  defineTestConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.js"
    }
  })
);
