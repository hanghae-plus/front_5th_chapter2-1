import React, { useCallback } from 'react';

//components
import CartList from './components/CartList';
import CartSummary from './components/CartSummary';
import ItemSelector from './components/ItemSelector';
import StockState from './components/StockState';

//hooks
import { useStock } from './hooks/useStock';
import { useItemSelection } from './hooks/useItemSelection';
import { useCart } from './hooks/useCart';
import { useCartCalculate } from './hooks/useCartCalculate';
import { usePromotion } from './hooks/usePromotion';

//초기 아이템
const initialItems = [
  { id: 'p1', name: '상품1', value: 10000, q: 50 },
  { id: 'p2', name: '상품2', value: 20000, q: 30 },
  { id: 'p3', name: '상품3', value: 30000, q: 20 },
  { id: 'p4', name: '상품4', value: 15000, q: 0 },
  { id: 'p5', name: '상품5', value: 25000, q: 10 },
];

const App: React.FC = () => {
  // 각 훅들 사용
  const { items, updateItemQuantity, applyDiscount } = useStock(initialItems);
  const { selectedId, handleItemChange } = useItemSelection();
  const { cartItems, addItemToCart, changeItemQuantity, removeItem } = useCart();
  const { totalPrice, discountRate, points } = useCartCalculate(cartItems, items);
  const { setRecentSelectedId } = usePromotion(items, applyDiscount);

  // 장바구니에 아이템 추가 핸들러
  const handleAddToCart = useCallback(() => {
    const itemToAdd = items.find((p) => p.id === selectedId);

    if (!itemToAdd || itemToAdd.q <= 0) {
      alert('선택한 상품의 재고가 없습니다.');
      return;
    }

    const existingCartItemIndex = cartItems.findIndex((item) => item.itemId === selectedId);

    if (existingCartItemIndex !== -1) {
      const currentQuantity = cartItems[existingCartItemIndex].quantity;

      if (itemToAdd.q >= 1) {
        addItemToCart(selectedId, 1);
        updateItemQuantity(selectedId, 1);
        setRecentSelectedId(selectedId);
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      addItemToCart(selectedId, 1);
      updateItemQuantity(selectedId, 1);
      setRecentSelectedId(selectedId);
    }
  }, [selectedId, items, cartItems, addItemToCart, updateItemQuantity, setRecentSelectedId]);

  // 수량 변경 핸들러
  const handleQuantityChange = useCallback(
    (itemId: string, change: number) => {
      const product = items.find((p) => p.id === itemId);
      const cartItem = cartItems.find((item) => item.itemId === itemId);

      if (!product || !cartItem) return;

      const newQuantity = cartItem.quantity + change;

      if (newQuantity <= 0) {
        // 수량이 0 이하면 아이템 제거
        removeItem(itemId);
        updateItemQuantity(itemId, -change);
      } else if (change > 0 && product.q < change) {
        // 재고보다 많은 수량을 추가하려는 경우
        alert('재고가 부족합니다.');
      } else {
        // 수량 업데이트
        changeItemQuantity(itemId, change);
        updateItemQuantity(itemId, change);
      }
    },
    [items, cartItems, changeItemQuantity, removeItem, updateItemQuantity]
  );

  // 아이템 제거 핸들러
  const handleRemoveItem = useCallback(
    (itemId: string) => {
      const cartItem = cartItems.find((item) => item.itemId === itemId);
      if (!cartItem) return;

      // 재고 복구
      updateItemQuantity(itemId, -cartItem.quantity);
      removeItem(itemId);
    },
    [cartItems, removeItem, updateItemQuantity]
  );

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>

        <CartList
          cartItems={cartItems}
          items={items}
          onQuantityChange={handleQuantityChange}
          onRemoveItem={handleRemoveItem}
        />

        <CartSummary totalPrice={totalPrice} discountRate={discountRate} points={points} />

        <ItemSelector
          items={items}
          selectedId={selectedId}
          onItemChange={handleItemChange}
          onAddToCart={handleAddToCart}
        />

        <StockState items={items} />
      </div>
    </div>
  );
};

export default App;
