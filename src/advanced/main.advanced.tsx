import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProductProvider, CartProvider } from './context';

const rootElement = document.getElementById('app');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <ProductProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductProvider>
    </React.StrictMode>,
  );
}
