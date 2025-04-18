import { useCallback } from 'react';
import { useCart } from '../provider/CartProvider';
import { useProduct } from '../provider/ProductProvider';

function CartItems() {
  const { cartState, removeCartItem, addCartItem, decreaseCartItem } =
    useCart();
  const { stockRecovery } = useProduct();

  const handleCartItemRemove = useCallback(
    (productId: string) => {
      const targetProduct = cartState.selectedCartItems.find(
        (product) => product.id === productId,
      );

      if (targetProduct) {
        removeCartItem(targetProduct);
        stockRecovery(productId, targetProduct.quantity);
      }
    },
    [cartState.selectedCartItems],
  );

  const handleCartItemDecrease = useCallback(
    (productId: string) => {
      decreaseCartItem(productId);
    },
    [decreaseCartItem],
  );

  const handleCartItemIncrease = useCallback(
    (productId: string) => {
      addCartItem(productId);
    },
    [addCartItem],
  );

  return (
    <div id="cart-items">
      {cartState.selectedCartItems.map((product) => (
        <div
          key={product.id}
          className="flex justify-between items-center mb-2"
        >
          <span>
            {product.name} - {product.price}원 x {product.quantity}
          </span>
          <div>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded mr-1"
              data-product-id={product.id}
              data-change="-1"
              onClick={() => handleCartItemDecrease(product.id)}
            >
              -
            </button>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded mr-1"
              data-product-id={product.id}
              data-change="1"
              onClick={() => handleCartItemIncrease(product.id)}
            >
              +
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              data-product-id={product.id}
              onClick={() => handleCartItemRemove(product.id)}
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartItems;
