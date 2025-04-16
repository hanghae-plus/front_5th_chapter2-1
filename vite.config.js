import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests.js",
  },
  resolve: {
    alias: {
      "#basic": path.resolve(__dirname, "./src/basic"),
    },
  },
  plugins: [tailwindcss()],
});
