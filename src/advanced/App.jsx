import React, { useEffect } from "react";
import { useCartContext } from "./context/CartProvider.jsx";
import CartTotal from "./components/CartTotal.jsx";
import AddToCart from "./components/AddToCart.jsx";
import CartItems from "./components/CartItems.jsx";
import StockStatus from "./components/StockStatus.jsx";
import { initializeProducts } from "./actions/productActions.js";
import { usePromotions } from "./hooks/usePromotions.js";

const App = () => {
  const { dispatch } = useCartContext();

  // 프로모션 기능 활성화
  usePromotions();

  useEffect(() => {
    // 상품 데이터 초기화
    dispatch(initializeProducts());
  }, [dispatch]);

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xrlwhsl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        <CartItems />
        <CartTotal />
        <AddToCart />
        <StockStatus />
      </div>
    </div>
  );
};

export default App;
