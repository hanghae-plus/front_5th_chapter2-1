import { useCallback } from 'react';
import {  Product } from '../types';
import Header from './Header';
import ProductSelect from './ProductSelect';
import CartItems from './CartItems';
import { useFlashSale } from '../hooks';
import { useSuggestionAlert } from '../hooks';
import { useCartHook } from '../hooks';
import StockInfo from './StockInfo.tsx';

// 초기 상품 데이터
const initialProducts: Product[] = [
  { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
  { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
  { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
  { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
  { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
];

const CartWrapper = () => {
  const {
    products,
    setProducts,
    cartItems,
    lastSelectedProduct,
    handleProductAdd,
    handleQuantityChange,
    handleRemove,
  } = useCartHook(initialProducts);


  useFlashSale(products, useCallback((updated) => {
    setProducts((prev) =>
      prev.map((product) => (product.id === updated.id ? updated : product))
    );
  }, []));

  useSuggestionAlert(products, lastSelectedProduct);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <Header />
      <CartItems
        items={cartItems}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemove}
      />
      <ProductSelect
        products={products}
        onProductAdd={handleProductAdd}
        disabled={products.every((p) => p.quantity === 0)}
      />
      <StockInfo products={products}  />
      
    </div>
  );
};

export default CartWrapper;
