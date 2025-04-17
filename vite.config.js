import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  const BASE_PATH = isProd ? "/front_5th_chapter2-1/" : "/";

  return {
    plugins: [react()],
    base: BASE_PATH,
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "src/setupTests.js",
    },
  };
});
