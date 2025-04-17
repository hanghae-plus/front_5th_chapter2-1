import { ProductListType } from '../hooks/useProductManagement';

export const StockInfo = ({ productList }: { productList: ProductListType[] }) => {
  const lowStockProducts = productList.filter((product) => product.stock < 5); // 재고가 5개 미만인 상품 필터링

  return (
    <div id="stock-status" className="text-sm text-gray-500 mt-2">
      {lowStockProducts.length > 0 &&
        lowStockProducts.map((product) => (
          <div key={product.id}>
            {product.name}: {product.stock > 0 ? `재고 부족 (${product.stock}개 남음)` : '품절'}
          </div>
        ))}
    </div>
  );
};
