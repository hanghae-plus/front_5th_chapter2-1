import { CartItem as CartItemType } from '../types/cart';
import CartItem from './CartItem';

interface CartListProps {
  items: CartItemType[];
  onQuantityChange: (id: string, change: number) => void;
  onRemove: (id: string) => void;
}

const CartList = ({ items, onQuantityChange, onRemove }: CartListProps) => {
  return (
    <div className="mb-4">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default CartList;
