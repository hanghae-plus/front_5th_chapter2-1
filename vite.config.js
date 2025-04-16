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
      "#advanced": path.resolve(__dirname, "./src/advanced/src"),
    },
  },
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        basic: path.resolve(__dirname, "index.basic.html"),
        advanced: path.resolve(__dirname, "index.advanced.html"),
      },
      output: {
        dir: "dist",
        entryFileNames: (chunkInfo) => {
          const name = chunkInfo.name;
          if (name.includes("basic")) {
            return "basic/assets/[name]-[hash].js";
          }
          return "advanced/assets/[name]-[hash].js";
        },
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name;
          if (name && name.includes("basic")) {
            return "basic/assets/[name]-[hash].js";
          }
          return "advanced/assets/[name]-[hash].js";
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name;
          if (name && name.includes("basic")) {
            return "basic/assets/[name]-[hash][extname]";
          }
          return "advanced/assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
