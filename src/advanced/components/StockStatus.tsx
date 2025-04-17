import { STOCK_WARNING_THRESHOLD } from '../constants/product';
import type { Product } from '../types';

interface Props {
  products: Product[];
}

export default function StockStatus({ products }: Props) {
  const lines = products
    .filter((p) => p.units < STOCK_WARNING_THRESHOLD)
    .map((p) => `${p.name}: ${p.units > 0 ? `재고 부족 (${p.units}개 남음)` : '품절'}`);
  return (
    <div
      id="stock-status"
      className="text-sm text-gray-500 mt-2"
      style={{ whiteSpace: 'pre-wrap' }}
    >
      {lines.join('\n')}
    </div>
  );
}
