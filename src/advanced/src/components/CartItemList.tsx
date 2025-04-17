import { products } from '../constants';
import { useCartContext } from '../context/cart/CartContext';
import CartItem from './CartItem';

const CartItemList = () => {
    const { cartItems } = useCartContext();

    return (
        <div>
            {cartItems.map((item) => {
                const product = products.find((product) => product.id === item.productId);
                if (!product) {
                    return null;
                }
                return <CartItem key={product.id} product={product} cartQuantity={item.cartQuantity} />;
            })}
        </div>
    );
};

export default CartItemList;
