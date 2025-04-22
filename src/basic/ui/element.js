import buildLayout from '../ utils/buildLayout';
import createEl from '../ utils/createEl';

export const elements = {
  ProductSelect: null,
  AddToCartButton: null,
  CartContainer: null,
  CartSummary: null,
  StockInfoText: null,
};

export function createUI() {
  //element 생성
  const root = document.getElementById('app');
  elements.CartContainer = createEl('div', { id: 'cart-items', className: '' });
  elements.CartSummary = createEl('div', { id: 'cart-total', className: 'text-xl font-bold my-4' });
  elements.ProductSelect = createEl('select', { id: 'product-select', className: 'border rounded p-2 mr-2' });
  elements.AddToCartButton = createEl('button', { id: 'add-to-cart', className: 'bg-blue-500 text-white px-4 py-2 rounded', text: '추가' });
  elements.StockInfoText = createEl('div', { id: 'stock-status', className: 'text-sm text-gray-500 mt-2' });

  //Layout 생성
  const layout = buildLayout();
  root.appendChild(layout);
}
