import React from 'react';
import { useCartStore } from '../store/cartStore';

function AddButton() {
  const { selectedId, products, setProducts, cart, setCart } = useCartStore();

  const handleClick = () => {
    const selectedProduct = products.find((p) => p.id === selectedId);
    if (!selectedProduct) return;

    const existing = cart.find((item) => item.id === selectedId);

    // ✅ 재고가 없는 경우
    if (selectedProduct.q === 0) {
      alert(`⚠️ ${selectedProduct.name}의 재고가 없습니다.`);
      return;
    }

    // ✅ 장바구니에 이미 존재하는 경우
    if (existing) {
      if (existing.qty + 1 > selectedProduct.q) {
        alert(
          `⚠️ ${selectedProduct.name}의 재고를 초과할 수 없습니다. (남은 재고: ${selectedProduct.q})`
        );
        return;
      }

      setCart(
        cart.map((item) =>
          item.id === selectedId ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      // ✅ 장바구니에 없으면 새로 추가
      setCart([...cart, { ...selectedProduct, qty: 1 }]);
    }

    // ✅ 제품 재고 -1 처리
    setProducts(
      products.map((p) => (p.id === selectedId ? { ...p, q: p.q - 1 } : p))
    );
  };

  return (
    <button
      id="add-to-cart"
      className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600"
      onClick={handleClick}
    >
      추가
    </button>
  );
}

export default AddButton;
