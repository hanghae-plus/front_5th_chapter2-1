import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    base: "/front_5th_chapter2-1/",
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "src/setupTests.js",
    },
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, "index.html"),
                basic: path.resolve(__dirname, "index.basic.html"),
                advanced: path.resolve(__dirname, "index.advanced.html"),
            },
        },
    },
});
