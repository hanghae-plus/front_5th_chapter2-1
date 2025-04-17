import { getStockStatus } from '../services';
import { Product } from '../../../types';

export default function OutOfStockList({ products }: { products: Product[] }) {
  const stockStatus = getStockStatus(products);

  return (
    <div id="stock-status" className="text-sm text-gray-500 mt-2">
      {stockStatus}
    </div>
  );
}
