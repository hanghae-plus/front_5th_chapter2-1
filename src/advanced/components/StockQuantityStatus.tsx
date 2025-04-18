import { Product } from '../provider/ProductProvider';

interface StockQuantityStatusProps {
  product: Product;
}

function StockQuantityStatus({ product }: StockQuantityStatusProps) {
  const almostSoldOut = product.quantity < 5 && product.quantity > 0;

  return (
    <div id="stock-status" className="text-sm text-gray-500 mt-2">
      {almostSoldOut && `${product.name}: 재고 부족 (` + product.quantity + `)`}
      {product.quantity === 0 && `${product.name}: 품절`}
    </div>
  );
}

export default StockQuantityStatus;
