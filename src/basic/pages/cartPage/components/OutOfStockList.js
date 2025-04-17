import { getStockStatus } from '../services';

export const OutOfStockList = ({ products }) => {
  const stockStatus = getStockStatus(products);

  return `
    <div id="stock-status" class="text-sm text-gray-500 mt-2">
      ${stockStatus}
    </div>
  `;
};
