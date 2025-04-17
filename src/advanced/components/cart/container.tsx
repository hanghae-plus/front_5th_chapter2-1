import { useProductList } from '../../context/product';
import { CartItem } from './item';

export const CartItemContainer = () => {
  const { cartList } = useProductList();

  return (
    <div id="cart-items" data-testid="cart-items">
      {cartList.map((cart) => (
        <CartItem key={cart.id} cart={cart} />
      ))}
    </div>
  );
};
