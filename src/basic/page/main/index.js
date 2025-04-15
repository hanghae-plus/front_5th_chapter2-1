import { AddToCartButton } from './components/add-to-cart-button';
import { CartItemContainer } from './components/cart-item-container';
import { ProductSelect } from './components/product-select';
import { StockStatus } from './components/stock-status';
import { Title } from './components/title';
import { TotalAmountDisplay } from './components/total-amount-display';

export const MainPage = {
  template: () => `
    <div class="bg-gray-100 p-8">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        ${Title.template()}
        ${CartItemContainer.template()}
        ${TotalAmountDisplay.template()}
        ${ProductSelect.template()}
        ${AddToCartButton.template()}
        ${StockStatus.template()}
      </div>
    </div>
  `,
  onMount: () => {
    Title.onMount?.();
    CartItemContainer.onMount?.();
    TotalAmountDisplay.onMount?.();
    ProductSelect.onMount?.();
    AddToCartButton.onMount?.();
    StockStatus.onMount?.();
  },
};
