import React, { useEffect } from 'react';
import CartItems from './components/CartItems';
import CartTotal from './components/CartTotal';
import ProductSelect from './components/ProductSelect';
import StockStatus from './components/StockStatus';
import CartAddButton from './components/CartAddButton';
import { handleSaleEvent } from './utils/sale';
const App = () => {
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
        <CartAddButton />
        <StockStatus />
      </div>
    </div>
  );
};

export default App;
