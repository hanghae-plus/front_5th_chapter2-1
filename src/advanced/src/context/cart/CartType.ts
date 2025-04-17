import { CartItem, Product } from '../../types';

export interface CartContextType {
    cartItems: CartItem[];
    addNewCartItem: (item: Product['id']) => void;
    removeCartItem: (item: Product['id']) => void;
    increaseItemQuantity: (item: Product['id']) => void;
    decreaseItemQuantity: (item: Product['id']) => void;
}
