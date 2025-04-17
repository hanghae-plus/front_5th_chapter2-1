import React from 'react';
import { CartProvider } from './context';
import { Cart } from './components/Cart';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Cart />
    </CartProvider>
  );
};

export default App;
