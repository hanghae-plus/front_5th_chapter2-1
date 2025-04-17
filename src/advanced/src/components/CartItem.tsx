import { memo } from 'react';
import { Product } from '../types';
import { useCartContext } from '../context/cart/CartContext';

interface CartItemProps {
    product: Product;
    cartQuantity: number;
}

const CartItem = memo((props: CartItemProps) => {
    const { id, name, price } = props.product;
    const { removeCartItem, increaseItemQuantity, decreaseItemQuantity } = useCartContext();

    return (
        <div id="cart-items">
            <div id={id} className="flex justify-between items-center mb-2">
                <span>
                    {name} - {price}원 x {props.cartQuantity}
                </span>
                <div>
                    <button
                        className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                        data-product-id={id}
                        data-change="-1"
                        onClick={() => decreaseItemQuantity(id)}
                    >
                        -
                    </button>
                    <button
                        className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                        data-product-id={id}
                        data-change="1"
                        onClick={() => increaseItemQuantity(id)}
                    >
                        +
                    </button>
                    <button
                        className="remove-item bg-red-500 text-white px-2 py-1 rounded"
                        data-product-id={id}
                        onClick={() => removeCartItem(id)}
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
});

export default CartItem;
