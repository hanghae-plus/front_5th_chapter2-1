import { useStock } from '../../context/stock';
import { CartItem } from './item';

export const CartItemContainer = () => {
  const { cartList } = useStock();

  return (
    <div id="cart-items" data-testid="cart-items">
      {cartList.map((cart) => (
        <CartItem key={cart.id} cart={cart} />
      ))}
    </div>
  );
};
