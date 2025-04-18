import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';

function main() {
  const $root = document.getElementById('app');
  if (!$root) {
    throw new Error('Root element not found');
  }

  const root = createRoot($root);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

main();
