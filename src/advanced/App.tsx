import React, { useState, useEffect, useCallback, useRef } from 'react';
// 필요한 타입 정의
interface Product {
  id: string;
  name: string;
  val: number;
  q: number;
}

interface CartItem {
  productId: string;
  quantity: number;
}

const App: React.FC = () => {
  // 상품 목록 상태
  const [products, setProducts] = useState<Product[]>([
    { id: 'p1', name: '상품1', val: 10000, q: 50 },
    { id: 'p2', name: '상품2', val: 20000, q: 30 },
    { id: 'p3', name: '상품3', val: 30000, q: 20 },
    { id: 'p4', name: '상품4', val: 15000, q: 0 },
    { id: 'p5', name: '상품5', val: 25000, q: 10 },
  ]);

  // 장바구니 상태
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 선택된 상품 ID
  const [selectedProductId, setSelectedProductId] = useState<string>('p1');

  // 할인율, 총액, 상품 개수 계산 상태
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [itemCount, setItemCount] = useState<number>(0);
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [bonusPoints, setBonusPoints] = useState<number>(0);

  // 마지막으로 선택한 상품 ID 참조
  const lastSelectedRef = useRef<string | null>(null);

  // 장바구니 계산 함수
  const calculateCart = useCallback(() => {
    let total = 0;
    let count = 0;
    let subtotal = 0;

    cartItems.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return;

      const quantity = item.quantity;
      const itemTotal = product.val * quantity;
      let discount = 0;

      count += quantity;
      subtotal += itemTotal;

      if (quantity >= 10) {
        switch (product.id) {
          case 'p1':
            discount = 0.1;
            break;
          case 'p2':
            discount = 0.15;
            break;
          case 'p3':
            discount = 0.2;
            break;
          case 'p4':
            discount = 0.05;
            break;
          case 'p5':
            discount = 0.25;
            break;
        }
      }

      total += itemTotal * (1 - discount);
    });

    let newDiscountRate = 0;

    if (count >= 30) {
      const bulkDiscount = total * 0.25;
      const itemDiscount = subtotal - total;

      if (bulkDiscount > itemDiscount) {
        total = subtotal * (1 - 0.25);
        newDiscountRate = 0.25;
      } else {
        newDiscountRate = (subtotal - total) / subtotal;
      }
    } else {
      newDiscountRate = subtotal > 0 ? (subtotal - total) / subtotal : 0;
    }

    // 화요일 할인
    if (new Date().getDay() === 2) {
      total *= 1 - 0.1;
      newDiscountRate = Math.max(newDiscountRate, 0.1);
    }

    setTotalAmount(Math.round(total));
    setItemCount(count);
    setDiscountRate(newDiscountRate);
    setBonusPoints(Math.floor(total / 1000));
  }, [cartItems, products]);

  // 할인 이벤트 타이머 설정
  useEffect(() => {
    // 번개세일 타이머
    const flashSaleTimer = setTimeout(() => {
      const flashSaleInterval = setInterval(() => {
        const luckyItemIndex = Math.floor(Math.random() * products.length);
        const luckyItem = products[luckyItemIndex];

        if (Math.random() < 0.3 && luckyItem.q > 0) {
          setProducts((prevProducts) => {
            const updatedProducts = [...prevProducts];
            updatedProducts[luckyItemIndex] = {
              ...luckyItem,
              val: Math.round(luckyItem.val * 0.8),
            };

            alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
            return updatedProducts;
          });
        }
      }, 30000);

      return () => clearInterval(flashSaleInterval);
    }, Math.random() * 10000);

    // 추천 상품 타이머
    const suggestTimer = setTimeout(() => {
      const suggestInterval = setInterval(() => {
        if (lastSelectedRef.current) {
          const suggestedProduct = products.find(
            (item) => item.id !== lastSelectedRef.current && item.q > 0
          );

          if (suggestedProduct) {
            setProducts((prevProducts) => {
              const updatedProducts = prevProducts.map((item) =>
                item.id === suggestedProduct.id
                  ? { ...item, val: Math.round(item.val * 0.95) }
                  : item
              );

              alert(`${suggestedProduct.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
              return updatedProducts;
            });
          }
        }
      }, 60000);

      return () => clearInterval(suggestInterval);
    }, Math.random() * 20000);

    return () => {
      clearTimeout(flashSaleTimer);
      clearTimeout(suggestTimer);
    };
  }, [products]);

  // 장바구니 변경 시 재계산
  useEffect(() => {
    calculateCart();
  }, [cartItems, products, calculateCart]);

  // 상품 선택 변경 핸들러
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProductId(e.target.value);
  };

  // 장바구니에 상품 추가 핸들러
  const handleAddToCart = () => {
    const productToAdd = products.find((p) => p.id === selectedProductId);

    if (!productToAdd || productToAdd.q <= 0) return;

    const existingCartItemIndex = cartItems.findIndex(
      (item) => item.productId === selectedProductId
    );

    if (existingCartItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      const currentQuantity = updatedCartItems[existingCartItemIndex].quantity;

      if (currentQuantity + 1 <= productToAdd.q + currentQuantity) {
        updatedCartItems[existingCartItemIndex] = {
          ...updatedCartItems[existingCartItemIndex],
          quantity: currentQuantity + 1,
        };

        setCartItems(updatedCartItems);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === selectedProductId ? { ...product, q: product.q - 1 } : product
          )
        );
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      setCartItems([...cartItems, { productId: selectedProductId, quantity: 1 }]);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === selectedProductId ? { ...product, q: product.q - 1 } : product
        )
      );
    }

    lastSelectedRef.current = selectedProductId;
  };

  // 수량 변경 핸들러
  const handleQuantityChange = (productId: string, change: number) => {
    const product = products.find((p) => p.id === productId);
    const cartItem = cartItems.find((item) => item.productId === productId);

    if (!product || !cartItem) return;

    const newQuantity = cartItem.quantity + change;

    if (newQuantity <= 0) {
      // 수량이 0 이하면 아이템 제거
      setCartItems(cartItems.filter((item) => item.productId !== productId));
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === productId ? { ...p, q: p.q - change } : p))
      );
    } else if (change > 0 && newQuantity > cartItem.quantity + product.q) {
      // 재고보다 많은 수량을 추가하려는 경우
      alert('재고가 부족합니다.');
    } else {
      // 수량 업데이트
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
      );

      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === productId ? { ...p, q: p.q - change } : p))
      );
    }
  };

  // 아이템 제거 핸들러
  const handleRemoveItem = (productId: string) => {
    const cartItem = cartItems.find((item) => item.productId === productId);

    if (!cartItem) return;

    // 재고 복구
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, q: product.q + cartItem.quantity } : product
      )
    );

    // 장바구니에서 제거
    setCartItems(cartItems.filter((item) => item.productId !== productId));
  };

  // 재고 부족 정보 생성
  const getStockInfo = () => {
    return products
      .filter((item) => item.q < 5)
      .map((item) => `${item.name}: ${item.q > 0 ? `재고 부족 (${item.q}개 남음)` : '품절'}`)
      .join('\n');
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        {/*title header */}
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>

        {/* 장바구니 목록 */}
        <div id="cart-items">
          {cartItems.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) return null;

            return (
              <div
                key={item.productId}
                id={item.productId}
                className="flex justify-between items-center mb-2"
              >
                <span>
                  {product.name} - {product.val}원 x {item.quantity}
                </span>
                <div>
                  <button
                    className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                    onClick={() => handleQuantityChange(item.productId, -1)}
                    data-product-id={item.productId}
                    data-change="-1"
                  >
                    -
                  </button>
                  <button
                    className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                    onClick={() => handleQuantityChange(item.productId, 1)}
                    data-product-id={item.productId}
                    data-change="1"
                  >
                    +
                  </button>
                  <button
                    className="remove-item bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleRemoveItem(item.productId)}
                    data-product-id={item.productId}
                  >
                    삭제
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 총액 표시 */}
        <div id="cart-total" className="text-xl font-bold my-4">
          총액: {totalAmount}원
          {discountRate > 0 && (
            <span className="text-green-500 ml-2">
              ({(discountRate * 100).toFixed(1)}% 할인 적용)
            </span>
          )}
          <span id="loyalty-points" className="text-blue-500 ml-2">
            (포인트: {bonusPoints})
          </span>
        </div>

        {/* 상품 선택 및 추가 버튼 */}
        <select
          id="product-select"
          className="border rounded p-2 mr-2"
          value={selectedProductId}
          onChange={handleProductChange}
        >
          {products.map((product) => (
            <option key={product.id} value={product.id} disabled={product.q === 0}>
              {product.name} - {product.val}원
            </option>
          ))}
        </select>
        <button
          id="add-to-cart"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddToCart}
        >
          추가
        </button>

        {/* 재고 상태 정보 */}
        <div id="stock-status" className="text-sm text-gray-500 mt-2">
          {getStockInfo()}
        </div>
      </div>
    </div>
  );
};

export default App;
