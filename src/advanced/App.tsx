import React from 'react';
import ProductSelect from './components/ProductSelect';
import AddButton from './components/AddButton';
import CartItems from './components/CartItems';
import { useFlashSale } from './utils/useFlashSale';
import { useSuggestionSale } from './utils/useSuggestionSale';
import { useCartStore } from './store/cartStore';

function App() {
  const { selectedId, setSelectedId, products, setProducts, cart, setCart } =
    useCartStore();
  useFlashSale();
  useSuggestionSale(); // 새로운 제안 세일
  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>

        <CartItems />

        {/* //상품 선택 옵션 */}
        <ProductSelect />

        {/* 상품추가 버튼*/}
        <AddButton />
        <div id="stock-status" className="text-sm text-gray-500 mt-2"></div>
      </div>
    </div>
  );
}

export default App;
