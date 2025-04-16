/**
 * 장바구니 수량 업데이트
 * @param {Element} cartItemElement 장바구니 아이템 요소
 * @param {Object} product 상품 객체
 * @param {number} quantity 수량
 * @param {boolean} isRemove 삭제 여부
 */
const updateCartItem = (
  cartItemElement,
  product,
  quantity,
  isRemove = false,
) => {
  if (isRemove) {
    cartItemElement.remove();
    product.stock += quantity;
  } else {
    // 현재 장바구니에 있는 수량 가져오기
    const currentQuantity = parseInt(cartItemElement.dataset.quantity);

    // 변경된 수량 차이 계산
    const stockChange = quantity - currentQuantity;

    // 차이만큼 재고 조정 (증가면 감소, 감소면 증가)
    product.stock -= stockChange;
    cartItemElement.querySelector('span').textContent =
      `${product.name} - ${product.price}원 x ${quantity}`;

    cartItemElement.dataset.quantity = quantity;
  }
};

/**
 * 장바구니 수량 계산
 * @param {number} currentQuantity 현재 수량
 * @param {number} change 변경 수량
 * @param {number} maximumStock 최대 재고
 * @returns {{success: boolean, quantity: number, isRemove: boolean}} 성공 여부, 수량, 삭제 여부
 */
const calculateCartQuantity = (currentQuantity, change, maximumStock) => {
  // 수량 계산
  const updatedQuantity = currentQuantity + change;

  // 재고 초과 여부 확인
  if (updatedQuantity > maximumStock)
    return { success: false, quantity: currentQuantity, isRemove: false };

  // 수량이 0 이하 여부 확인
  if (updatedQuantity <= 0) {
    return { success: true, quantity: 0, isRemove: true };
  }

  // 수량 계산 성공
  return { success: true, quantity: updatedQuantity, isRemove: false };
};

export { calculateCartQuantity, updateCartItem };
