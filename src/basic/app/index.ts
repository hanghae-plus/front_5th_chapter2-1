import { setSaleAlert, setSuggestionAlert } from './logic';
import { createCart } from './Cart/index';

export function createRootChildren(): HTMLDivElement {
  const cont = document.createElement('div');
  cont.className = 'bg-gray-100 p-8';

  const cart = createCart();
  cont.appendChild(cart);

  return cont;
}

export function setUp(): void {
  setSaleAlert();
  setSuggestionAlert();
} 