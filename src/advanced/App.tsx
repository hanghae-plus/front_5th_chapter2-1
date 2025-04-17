import { CartProvider } from '@/context/cartContext';
import React from 'react';

import Main from './Main';

export default function App() {
  return (
    <CartProvider>
      <Main />
    </CartProvider>
  );
}
