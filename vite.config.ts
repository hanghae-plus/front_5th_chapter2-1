import { defineConfig, loadEnv } from "vite";
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const target = mode === 'production' ? 'advanced' : 'basic';
  const customHtml = `index.${target}.html`;
  const indexHtmlPath = path.resolve(__dirname, 'index.html');
  const backupHtmlPath = path.resolve(__dirname, 'index.original.html');

  // 빌드 전에 index.html 백업 & 커스텀 html 복사
  if (fs.existsSync(customHtml)) {
    if (fs.existsSync(indexHtmlPath)) {
      fs.copyFileSync(indexHtmlPath, backupHtmlPath);
    }
    fs.copyFileSync(path.resolve(__dirname, customHtml), indexHtmlPath);
    console.log(`[vite] Using ${customHtml} as entry HTML`);
  }

  return defineConfig({
    plugins: [
      react(),
      {
        name: 'restore-original-index-html',
        closeBundle() {
          if (fs.existsSync(backupHtmlPath)) {
            fs.copyFileSync(backupHtmlPath, indexHtmlPath);
            fs.unlinkSync(backupHtmlPath);
            console.log('[vite] index.html has been restored to original version.');
          }
        }
      }
    ],
    base: env.VITE_BASE_PATH || "/",
  });
};
