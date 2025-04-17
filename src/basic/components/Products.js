import { productStore, cartStore } from '../stores';
import { addEvent } from '../@lib/eventManager';
import { isOutOfStock, isShortageOfStock } from '../utils';

export const Products = () => {
  let selectedProductId = null;

  const template = /* html */ `
    <select id="product-select" class="border rounded p-2 mr-2"></select>
    <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">
      추가
    </button>
    <div id="stock-status" class="text-sm text-gray-500 mt-2"></div>
  `;

  const init = () => {
    addEvent('click', '#add-to-cart', () => {
      const $select = document.getElementById('product-select');
      const selectedProductId = $select.value;
      const selectedProduct = productStore.getState().products.find((p) => p.id === selectedProductId);

      cartStore.actions.addToCart(selectedProduct);
    });

    addEvent('change', '#product-select', (e) => {
      selectedProductId = e.target.value;
    });

    render();
  };

  const render = () => {
    const { products } = productStore.getState();

    const $select = document.getElementById('product-select');
    if ($select) {
      $select.innerHTML = renderProductOptions(products);
      selectedProductId && ($select.value = selectedProductId);
    }

    const $stockStatus = document.getElementById('stock-status');
    if ($stockStatus) {
      $stockStatus.innerHTML = renderStockInfo(products);
    }
  };

  const renderProductOptions = (products) => {
    return products
      .map(
        (product) => `
          <option value="${product.id}" ${isOutOfStock(product.stock) ? 'disabled' : ''}>${product.name} - ${product.price}원</option>
        `,
      )
      .join('');
  };

  const renderStockInfo = (products) => {
    return products
      .filter((product) => isShortageOfStock(product.stock))
      .map(
        (product) => `${product.name}: ${isOutOfStock(product.stock) ? '품절' : `재고 부족 (${product.stock}개 남음)`}`,
      )
      .join('<br/>');
  };

  return { init, template, render };
};
