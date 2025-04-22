import { elements } from '../ui/element.js';
import createEl from './createEl.js';

function buildLayout() {
  const cont = createEl('div', { className: 'bg-gray-100 p-8' });
  const wrap = createEl('div', {
    className: 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8',
  });
  const hTxt = createEl('h1', {
    className: 'text-2xl font-bold mb-4',
    text: '장바구니',
  });

  wrap.append(hTxt, elements.CartContainer, elements.CartSummary, elements.ProductSelect, elements.AddToCartButton, elements.StockInfoText);
  cont.appendChild(wrap);
  return cont;
}

export default buildLayout;
