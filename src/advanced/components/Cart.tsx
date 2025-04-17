import { useCartContext } from '../context/CartContext';
import { useProductContext } from '../context/ProductContext';
import { isOutOfStock } from '../utils';
import { ALERTS } from '../constants';
import CartTotal from './CartTotal';

const Cart = () => {
  const { cartItems, getCartItemById, changeCartItemQuantity, removeFromCart } = useCartContext();
  const { getProductById, increaseStock, decreaseStock } = useProductContext();

  const handleClickAdd = (id: string) => {
    const existingCartItem = getCartItemById(id);
    if (!existingCartItem) return;

    const selectedProduct = getProductById(id);
    if (isOutOfStock(selectedProduct?.stock)) {
      alert(ALERTS.OUT_OF_STOCK);
      return;
    }

    decreaseStock(id);
    changeCartItemQuantity(id, existingCartItem.quantity + 1);
  };

  const handleClickSubtract = (id: string) => {
    const existingCartItem = getCartItemById(id);
    if (!existingCartItem) return;

    const newQuantity = existingCartItem.quantity - 1;
    if (newQuantity < 0) return;

    increaseStock(id);
    changeCartItemQuantity(id, newQuantity);
  };

  const handleClickRemove = (id: string) => {
    const existingCartItem = getCartItemById(id);
    if (!existingCartItem) return;

    removeFromCart(id);
    increaseStock(id, existingCartItem.quantity);
  };

  return (
    <>
      <h1 className="text-2xl font-bold">장바구니</h1>
      <div id="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <span>
              {item.name} - {item.price}원 x {item.quantity}
            </span>
            <div>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded mr-1"
                onClick={() => handleClickSubtract(item.id)}
              >
                -
              </button>
              <button className="bg-blue-500 text-white px-2 py-1 rounded mr-1" onClick={() => handleClickAdd(item.id)}>
                +
              </button>
              <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleClickRemove(item.id)}>
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
      <CartTotal />
    </>
  );
};

export default Cart;
