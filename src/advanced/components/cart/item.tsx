import { Product } from 'src/advanced/data/products';
import { CartItemSummary } from './summary';
import { CartQuantityButton } from './quantity-button';
import { CartRemoveButton } from './remove-button';

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
        <CartQuantityButton step={-1} label="-" cart={cart} />
        <CartQuantityButton step={1} label="+" cart={cart} />
        <CartRemoveButton cart={cart} />
      </div>
    </div>
  );
};
