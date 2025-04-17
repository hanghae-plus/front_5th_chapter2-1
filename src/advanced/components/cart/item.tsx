import { CartItemSummary } from './summary';
import { CartQuantityButton } from './quantity-button';
import { CartRemoveButton } from './remove-button';
import { Product } from 'src/advanced/config/types';

interface CartItemProps extends React.HTMLAttributes<HTMLDivElement> {
  cart: Product;
}

export const CartItem: React.FC<CartItemProps> = ({ cart, ...props }) => {
  return (
    <div
      key={cart.id}
      id={cart.id}
      className="flex justify-between items-center mb-2"
      {...props}
    >
      <CartItemSummary cart={cart} />
      <div>
        <CartQuantityButton step={-1} label="-" product={cart} />
        <CartQuantityButton step={1} label="+" product={cart} />
        <CartRemoveButton cart={cart} />
      </div>
    </div>
  );
};
