import { attachEventListener } from './eventManager.js';
import { calculateCartItem } from './services/cart.js';
import { initializeSaleSystem } from './services/discount.js';
import { initializeState } from './state.js';
import { createUI } from './ui/element.js';
import { updateSelOpts } from './ui/render.js';

function main() {
  initializeState();
  createUI();
  updateSelOpts();
  calculateCartItem();
  initializeSaleSystem();
  attachEventListener(calculateCartItem);
}

main();
