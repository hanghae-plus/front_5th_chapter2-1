import { useCallback, useState } from 'react';

export interface ProductListType {
  id: string;
  name: string;
  price: number;
  stock: number;
}

const PRODUCT_ITEM = [
  { id: 'p1', name: '상품1', price: 10000, stock: 50 },
  { id: 'p2', name: '상품2', price: 20000, stock: 30 },
  { id: 'p3', name: '상품3', price: 30000, stock: 20 },
  { id: 'p4', name: '상품4', price: 15000, stock: 0 },
  { id: 'p5', name: '상품5', price: 25000, stock: 10 },
];

const useProductManagement = (initialProducts = PRODUCT_ITEM) => {
  const [productList, setProductList] = useState<ProductListType[]>(initialProducts);

  // 재고 확인 함수
  const hasEnoughStock = useCallback(
    (productId: string, quantity: number = 1) => {
      const product = productList.find((p) => p.id === productId);
      return product && product.stock >= quantity;
    },
    [productList]
  );

  // 재고 감소 함수
  const decreaseStock = useCallback((productId: string, quantity: number = 1) => {
    setProductList((prevList) =>
      prevList.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            stock: Math.max(0, product.stock - quantity),
          };
        }
        return product;
      })
    );
  }, []);

  const increaseStock = useCallback((productId: string, quantity: number = 1) => {
    setProductList((prevList) =>
      prevList.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            stock: product.stock + quantity,
          };
        }
        return product;
      })
    );
  }, []);

  // 특정 상품 조회
  const getProduct = useCallback(
    (productId: string) => {
      return productList.find((p) => p.id === productId);
    },
    [productList]
  );

  return {
    productList,
    setProductList,
    hasEnoughStock,
    decreaseStock,
    increaseStock,
    getProduct,
  };
};

export default useProductManagement;
