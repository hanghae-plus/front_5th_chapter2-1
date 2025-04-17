import React, { useEffect, useState } from 'react';
import CartItems from './components/CartItems';
import CartTotal from './components/CartTotal';
import ProductSelect from './components/ProductSelect';
import StockStatus from './components/StockStatus';
import CartAddButton from './components/CartAddButton';
import { initialProducts } from './constants';
import { getState, setState } from './store';
import {
  handleClickAdd,
  handleClickIncrease,
  handleClickDecrease,
  handleClickRemove,
} from './services/cart-service';
import { handleSaleEvent } from './services/sale-service';
const App = () => {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [products, setProducts] = useState(
    getState().products || initialProducts,
  );
  const [cartList, setCartList] = useState(getState().cartList || []);

  // 초기 설정
  useEffect(() => {
    if (!getState().products) {
      setState('products', initialProducts);
      setProducts(initialProducts);
    }

    if (!getState().cartList) {
      setState('cartList', []);
    }
  }, []);

  const updateCart = (newCartList, product, quantityChange) => {
    // 카트 상태 업데이트
    setCartList(newCartList);
    setState('cartList', newCartList);

    // 재고 업데이트
    const updatedProducts = products.map((p) => {
      if (p.id === product.id) {
        return { ...p, stock: p.stock - quantityChange };
      }
      return p;
    });

    setProducts(updatedProducts);
    setState('products', updatedProducts);

    // 총액 계산 및 업데이트
    const { totalAmount, discountRate, points } =
      calculateTotalAmount(updatedProducts);
    setState('totalAmount', totalAmount);
    setState('discountRate', discountRate);
    setState('points', points);
  };

  useEffect(() => {
    handleSaleEvent();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        <CartItems />
        <CartTotal />
        <ProductSelect />
        <CartAddButton onClick={handleClickAdd} />
        <StockStatus />
      </div>
    </div>
  );
};

export default App;
