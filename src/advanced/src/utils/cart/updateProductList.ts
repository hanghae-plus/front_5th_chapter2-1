import type { Product } from "../../types";

// 상품 목록에서 재고 감소
export const updateProductList = (productList: Product[], selectedProductId: string, count: number): Product[] => {
  return productList.map((product) =>
    product.id === selectedProductId && product.count > 0 ? { ...product, count: product.count + count } : product,
  );
};
