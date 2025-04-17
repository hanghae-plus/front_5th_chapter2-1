import { Product } from 'src/advanced/config/types';

interface CartItemSummaryProps extends React.HTMLAttributes<HTMLSpanElement> {
  cart: Product;
}

export const CartItemSummary: React.FC<CartItemSummaryProps> = ({ cart }) => {
  return (
    <span>
      {cart.name} - {cart.price}원 x {cart.cartQuantity}
    </span>
  );
};
