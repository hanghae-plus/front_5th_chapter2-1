import { state } from '../store';

const StockStatus = () => {
  const $stockStatus = Object.assign(document.createElement('div'), {
    id: 'stock-status',
    className: 'text-sm text-gray-500 mt-2',
  });

  const render = () => {
    const products = state.products;

    $stockStatus.innerHTML = `${products
      .filter((product) => product.stock < 5)
      .map(
        (product) =>
          `${product.name}: ${product.stock > 0 ? `재고 부족 (${product.stock}개 남음)` : `품절`}`,
      )}`;
  };

  render();

  state.subscribe('products', render);

  return $stockStatus;
};

export { StockStatus };
