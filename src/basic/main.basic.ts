import { createRootChildren, setUp } from './app/index';

function main(): void {
  const $root = document.getElementById('app');
  if (!$root) throw new Error('Root element not found');

  const cont = createRootChildren();
  $root.appendChild(cont);

  setUp();
}

main();
