import React from 'react';
import { CartProvider, ProductProvider } from './context';
import CartContent from './components/Cart';
import Select from './components/Select';

const App: React.FC = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <div className="bg-gray-100 p-8">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
            <h1>장바구니</h1>
            <CartContent />
            <Select />
          </div>
        </div>
      </CartProvider>
    </ProductProvider>
  );
};

export default App;
