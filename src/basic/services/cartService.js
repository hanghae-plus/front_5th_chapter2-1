// services/cartService.js

/**
 * 장바구니 아이템 추가
 * @param {Object} state 현재 상태
 * @param {string} productId 추가할 상품 ID
 * @returns {Object} 업데이트된 상태
 */

export const addToCart = (state, productId) => {
  const { products, cartItems } = state;
  const product = products.find((p) => p.id === productId);

  if (!product || product.q <= 0) {
    return state;
  }

  const currentQuantity = cartItems[productId] || 0;
  const updatedCartItems = {
    ...cartItems,
    [productId]: currentQuantity + 1
  };

  const updatedProducts = products.map((p) => (p.id === productId ? { ...p, q: p.q - 1 } : p));

  return {
    ...state,
    cartItems: updatedCartItems,
    products: updatedProducts,
    lastSelected: productId
  };
};

/**
 * 장바구니 아이템 수량 변경
 * @param {Object} state 현재 상태
 * @param {string} productId 상품 ID
 * @param {number} changeAmount 변경할 수량
 * @returns {Object} 업데이트된 상태
 */
export const changeCartItemQuantity = (state, productId, changeAmount) => {
  const { cartItems, products } = state;
  const currentQuantity = cartItems[productId] || 0;
  const product = products.find((p) => p.id === productId);

  if (!product) return state;

  const newQuantity = currentQuantity + changeAmount;

  // 수량이 0 이하인 경우 아이템 제거
  if (newQuantity <= 0) {
    const updatedCartItems = { ...cartItems };
    delete updatedCartItems[productId];

    return {
      ...state,
      cartItems: updatedCartItems,
      products: products.map((p) => (p.id === productId ? { ...p, q: p.q + currentQuantity } : p))
    };
  }

  // 재고 확인 (증가하는 경우에만)
  if (changeAmount > 0 && product.q < changeAmount) {
    return state; // 재고 부족으로 상태 변경없이 반환
  }

  // 수량 변경
  return {
    ...state,
    cartItems: {
      ...cartItems,
      [productId]: newQuantity
    },
    products: products.map((p) => (p.id === productId ? { ...p, q: p.q - changeAmount } : p))
  };
};

/**
 * 장바구니 아이템 제거
 * @param {Object} state 현재 상태
 * @param {string} productId 제거할 상품 ID
 * @returns {Object} 업데이트된 상태
 */
export const removeCartItem = (state, productId) => {
  const { cartItems, products } = state;
  const currentQuantity = cartItems[productId] || 0;

  if (currentQuantity <= 0) return state;

  const updatedCartItems = { ...cartItems };
  delete updatedCartItems[productId];

  return {
    ...state,
    cartItems: updatedCartItems,
    products: products.map((p) => (p.id === productId ? { ...p, q: p.q + currentQuantity } : p))
  };
};
