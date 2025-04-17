import React, { createContext, useContext } from 'react';
import { useCartStore } from './CartStore';
import { CartContextType } from './CartType';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const value = useCartStore();

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCartContext must be used within CartProvider');
    }
    return context;
};
