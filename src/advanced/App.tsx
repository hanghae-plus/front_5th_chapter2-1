import React from 'react';
import Cart from './src/pages/Cart';
import { CartProvider } from './src/context/cart/CartContext';

const App = () => {
    return (
        <CartProvider>
            <Cart />
        </CartProvider>
    );
};

export default App;
