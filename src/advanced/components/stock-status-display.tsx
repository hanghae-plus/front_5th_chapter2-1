import { useProductList } from '../context/product';
import { Product } from '../data/products';

export const StockStatusDisplay = () => {
  const { productList } = useProductList();

  const infoMsg = productList
    // 재고가 5개 미만인 상품만 필터링
    .filter((p) => p.stockQuantity < 5)
    // 각 재고별 상태 문자열로 변환
    .map(getProductStockStatusString)
    // 줄바꿈 문자로 연결
    .join('\n');

  return (
    <div
      id="stock-status"
      data-testid="stock-status"
      className="text-sm text-gray-500 mt-2 whitespace-pre-wrap"
    >
      {infoMsg}
    </div>
  );
};

export const getProductStockStatusString = (product: Product) => {
  const hasStock = product.stockQuantity > 0;
  const status = hasStock
    ? `재고 부족 (${product.stockQuantity}개 남음)`
    : '품절';

  return `${product.name}: ${status}`;
};
