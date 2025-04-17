import { useProductList } from '../context/product';

export const CartItemContainer = () => {
  const { cartList, setProductList } = useProductList();

  return (
    <div id="cart-items">
      {cartList.map((cart) => (
        <div
          key={cart.id}
          id={cart.id}
          className="flex justify-between items-center mb-2"
        >
          <span>
            {cart.name} - {cart.price}원 x {cart.cartQuantity}
          </span>
          <div>
            <button
              className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
              data-product-id={cart.id}
              data-change="-1"
              onClick={() => {
                const productToUpdate = cartList.find(
                  (product) => product.id === cart.id,
                );
                if (productToUpdate && productToUpdate.cartQuantity > 0) {
                  setProductList((prev) =>
                    prev.map((product) =>
                      product.id === productToUpdate.id
                        ? {
                            ...product,
                            cartQuantity: Math.max(product.cartQuantity - 1, 0),
                            stockQuantity: product.stockQuantity + 1,
                          }
                        : product,
                    ),
                  );
                }
              }}
            >
              -
            </button>
            <button
              className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
              data-product-id={cart.id}
              data-change="1"
              onClick={() => {
                const productToUpdate = cartList.find(
                  (product) => product.id === cart.id,
                );
                if (productToUpdate) {
                  if (productToUpdate.stockQuantity <= 0) {
                    alert('재고가 부족합니다.');
                    return;
                  }
                  setProductList((prev) =>
                    prev.map((product) =>
                      product.id === productToUpdate.id
                        ? {
                            ...product,
                            cartQuantity: product.cartQuantity + 1,
                            stockQuantity: Math.max(
                              product.stockQuantity - 1,
                              0,
                            ),
                          }
                        : product,
                    ),
                  );
                }
              }}
            >
              +
            </button>
            <button
              className="remove-item bg-red-500 text-white px-2 py-1 rounded"
              data-product-id={cart.id}
              onClick={() => {
                const productToRemove = cartList.find(
                  (product) => product.id === cart.id,
                );
                if (productToRemove) {
                  setProductList((prev) =>
                    prev.map((product) =>
                      product.id === productToRemove.id
                        ? {
                            ...product,
                            cartQuantity: 0,
                            stockQuantity:
                              product.stockQuantity + product.cartQuantity,
                          }
                        : product,
                    ),
                  );
                }
              }}
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
