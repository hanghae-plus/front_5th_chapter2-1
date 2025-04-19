import { CartProvider } from '@/context/cart-context';
import Main from '@/pages/advanced';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('app')!);
root.render(
  <CartProvider>
    <Main />
  </CartProvider>,
);
