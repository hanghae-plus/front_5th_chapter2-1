import { useAtom } from "jotai";
import { useCartItemRemove, useQuantityChange } from "../../hooks";
import { cartAtom } from "../../state";

export const CartList = () => {
  const [cart] = useAtom(cartAtom);

  const { handleQuantityChange } = useQuantityChange();
  const { handleCartItemRemove } = useCartItemRemove();

  return (
    <>
      {cart.cartList.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-2">
          <span>
            {item.name} - {item.price}원 x {item.count}
          </span>
          <div>
            <button
              onClick={() => handleQuantityChange(item.id, -1)}
              type="button"
              className="bg-blue-500 text-white px-2 py-1 rounded mr-1"
              data-product-id={item.id}
            >
              -
            </button>
            <button
              onClick={() => handleQuantityChange(item.id, 1)}
              type="button"
              className="bg-blue-500 text-white px-2 py-1 rounded mr-1"
              data-product-id={item.id}
            >
              +
            </button>
            <button
              onClick={() => handleCartItemRemove(item.id)}
              type="button"
              className="bg-red-500 text-white px-2 py-1 rounded"
              data-product-id={item.id}
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
