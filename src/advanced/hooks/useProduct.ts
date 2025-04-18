import { useCallback, useMemo } from 'react';
import { useProductContext } from '../contexts/ProductContext';

const useProduct = () => {
  const { products, setProducts } = useProductContext();

  const getProductById = useCallback(
    (productId: string) => products.find(product => product.id === productId),
    [products]
  );

  const getProductBySuggestion = useCallback(
    (excludedProductId: string) =>
      products.find(product => product.id !== excludedProductId && product.quantity > 0),
    [products]
  );

  const randomProduct = useMemo(
    () => products[Math.floor(Math.random() * products.length)],
    [products]
  );

  const updateProductPrice = useCallback(
    (productId: string, newPrice: number) => {
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === productId ? { ...product, price: newPrice } : product
        )
      );
    },
    [setProducts]
  );

  return {
    products,
    setProducts,
    getProductById,
    getProductBySuggestion,
    randomProduct,
    updateProductPrice,
  };
};

export default useProduct;
