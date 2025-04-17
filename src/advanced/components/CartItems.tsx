import CartItem from './CartItem';
import type { CartItem as CartItemType } from '../types';

interface Props {
  cart: CartItemType[];
  onQuantityChange: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function CartItems({ cart, onQuantityChange, onRemoveItem }: Props) {
  return (
    <div id="cart-items">
      {cart.map((item) => (
        <CartItem key={item.id} item={item} onChange={onQuantityChange} onRemove={onRemoveItem} />
      ))}
    </div>
  );
}
