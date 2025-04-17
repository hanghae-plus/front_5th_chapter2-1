import { CartListType } from '../App';

interface CartItemProps {
  cartList: CartListType[];
  setCartList: React.Dispatch<React.SetStateAction<CartListType[]>>;
  hasEnoughStock: (productId: string, quantity?: number) => boolean | undefined;
  decreaseStock: (productId: string, quantity?: number) => void;
}

// 장바구니 목록
const CartItem = ({ ...props }: CartItemProps) => {
  const { cartList, decreaseStock, hasEnoughStock, setCartList } = props;

  if (cartList.length === 0) {
    return <div>장바구니에 담긴 상품이 없습니다.</div>;
  }

  // 장바구니 -
  const handleQuantityDown = (productId: string) => {
    // 장바구니 존재 확인
    const itemIndex = cartList.findIndex((item) => item.id === productId);
    if (itemIndex === -1) return;

    // 카트에 담긴 수량이 1개인 경우
    const item = cartList[itemIndex];
    if (item.quantity === 1) {
      const newCartList = cartList.filter((item) => item.id !== productId);
      setCartList(newCartList);
    } else {
      const newCartList = cartList.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartList(newCartList);
    }

    decreaseStock(productId, -1);
  };

  // 장바구니 +
  const handleQuantityUp = (productId: string) => {
    // 재고 선 확인
    const isStock = hasEnoughStock(productId, 1);
    if (!isStock) {
      alert('재고가 부족합니다.');
      return;
    }

    // 장바구니 존재 확인
    const item = cartList.find((item) => item.id === productId);
    if (!item) return;

    // 장바구니 추가
    const newCartList = cartList.map((cartItem) =>
      cartItem.id === productId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
    setCartList(newCartList);
    decreaseStock(productId, 1);
  };

  // 장바구니 삭제
  const handleRemoveItem = (productId: string) => {
    // 장바구니 존재 확인
    const item = cartList.find((item) => item.id === productId);
    if (!item) return;

    // 카트에서 삭제 - 필터
    const newCartList = cartList.filter((item) => item.id !== productId);
    setCartList(newCartList);
    decreaseStock(productId, -item.quantity);
  };

  return (
    <div id="cart-items">
      {cartList.map((item) => {
        return (
          <div className="flex justify-between items-center mb-2">
            <span>
              {item.name} - {item.price}원 x {item.quantity}
            </span>
            <div>
              <button
                className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                data-product-id={item.id}
                data-change="-1"
                onClick={() => handleQuantityDown(item.id)}
              >
                -
              </button>
              <button
                className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                data-product-id={item.id}
                data-change="1"
                onClick={() => handleQuantityUp(item.id)}
              >
                +
              </button>
              <button
                className="remove-item bg-red-500 text-white px-2 py-1 rounded"
                data-product-id={item.id}
                onClick={() => handleRemoveItem(item.id)}
              >
                삭제
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItem;
