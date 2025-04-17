import Button from '../../../components/Button';
import { Product } from '../../../types';

export default function CartItemList({
  cartItems,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}: {
  cartItems: Product[];
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
}) {
  return (
    <div id="cart-items">
      {cartItems.map((item) => (
        <div key={item.id} id={item.id} className="flex justify-between items-center mb-2">
          <span>{` ${item.name} - ${item.price}원 x ${item.stock}`}</span>
          <div>
            <Button
              className="bg-blue-500 mr-1 px-2 py-1"
              onClick={() => decreaseQuantity(item.id)}
            >
              -
            </Button>
            <Button
              className="bg-blue-500 mr-1 px-2 py-1"
              onClick={() => increaseQuantity(item.id)}
            >
              +
            </Button>
            <Button className="bg-red-500 px-2 py-1" onClick={() => removeFromCart(item.id)}>
              삭제
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
