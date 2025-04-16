import { PRODUCT_ITEM } from '../store/PRODUCT';
import { cartState } from '../store/cartState';

// 카트 관련 기능 구현
export const useCart = () => {
  let lastSelected = null;

  // 장바구니 담기
  // 1. $selectBox -> 선택된 상품 판별을 위함
  // 2. $cartItem -> 선택 후 장바구니에 담기 위함
  const addToCart = ($selectBox, $cartItem) => {
    const selectedId = $selectBox.value;
    const selectedProduct = PRODUCT_ITEM.find((item) => item.id === selectedId);

    // 선택된 상품 + 재고 존재
    if (selectedProduct && selectedProduct.stock > 0) {
      const foundCartItem = document.getElementById(selectedProduct.id);

      // 장바구니에 담긴 경우
      if (foundCartItem) {
        const newCount = parseInt(foundCartItem.querySelector('span').textContent.split('x ')[1]) + 1;

        if (newCount <= selectedProduct.stock) {
          foundCartItem.querySelector('span').textContent =
            foundCartItem.querySelector('span').textContent.split('x ')[0] + 'x ' + newCount;
          selectedProduct.stock--;
        } else {
          alert('재고가 부족합니다.');
        }
      } else {
        const $newCartItem = document.createElement('div');
        $newCartItem.id = selectedProduct.id;
        $newCartItem.className = 'flex justify-between items-center mb-2';
        $newCartItem.innerHTML = `
          <span>${selectedProduct.name} - ${selectedProduct.price}원 x 1</span>
          <div>
            <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${selectedProduct.id}" data-change="-1">-</button>
            <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${selectedProduct.id}" data-change="1">+</button>
            <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${selectedProduct.id}">삭제</button>
          </div>`;
        $cartItem.appendChild($newCartItem);
        selectedProduct.stock--;
      }
      lastSelected = selectedId;
      return true;
    }

    return false;
  };

  // 장바구니 계산
  const calculateCart = ($cartItem, cartResultC, stockInfoC) => {
    // 계산 값 초기화
    cartState.reset();

    // 자주 사용하는 메서드 참조 저장
    const getItemCount = cartState.getItemCount;
    const getTotalAmount = cartState.getTotalAmount;
    const getDiscountRate = cartState.getDiscountRate;
    const getBonusPoints = cartState.getBonusPoints;
    const setItemCount = cartState.setItemCount;
    const setTotalAmount = cartState.setTotalAmount;
    const setDiscountRate = cartState.setDiscountRate;
    const setBonusPoints = cartState.setBonusPoints;

    const cartItems = $cartItem.children;
    let subtotal = 0;

    // 장바구니에 아이템이 있는 경우에만 계산
    if (cartItems.length > 0) {
      // 각 상품에 대한 계산 수행
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        const productId = item.id;
        const product = PRODUCT_ITEM.find((item) => item.id === productId);

        if (!product) continue;

        // 상품 수량 파싱
        const quantity = parseInt(item.querySelector('span').textContent.split('x ')[1]);

        // 개별 상품 총액 계산
        const itemTotal = product.price * quantity;

        // 수량별 할인 계산
        let discount = 0;
        if (quantity >= 10) {
          // 상품별 할인율 적용
          if (product.id === 'p1') discount = 0.1;
          else if (product.id === 'p2') discount = 0.15;
          else if (product.id === 'p3') discount = 0.2;
          else if (product.id === 'p4') discount = 0.05;
          else if (product.id === 'p5') discount = 0.25;
        }

        setItemCount(getItemCount() + quantity);
        subtotal += itemTotal;
        setTotalAmount(getTotalAmount() + itemTotal * (1 - discount));
      }

      // 대량 구매 할인 적용 (30개 이상 구매 시 25% 할인)
      if (getItemCount() >= 30) {
        const bulkDiscount = getTotalAmount() * 0.25;
        const itemDiscount = subtotal - getTotalAmount();

        // 더 큰 할인을 적용
        if (bulkDiscount > itemDiscount) {
          setTotalAmount(subtotal * (1 - 0.25));
          setDiscountRate(0.25);
        } else {
          setDiscountRate((subtotal - getTotalAmount()) / subtotal);
        }
      } else {
        setDiscountRate((subtotal - getTotalAmount()) / subtotal);
      }

      // 화요일 할인 적용 (10% 추가 할인)
      if (new Date().getDay() === 2) {
        setTotalAmount(getTotalAmount() * 0.9); // 10% 할인
        setDiscountRate(Math.max(getDiscountRate(), 0.1));
      }
    }

    // 보너스 포인트 계산 (1,000원당 1점)
    setBonusPoints(Math.floor(getTotalAmount() / 1000));

    // UI 업데이트
    if (cartResultC) {
      cartResultC.updateTotal(getTotalAmount(), getDiscountRate());
      cartResultC.updateBonusPoints(getBonusPoints());
    }

    if (stockInfoC) {
      stockInfoC.updateStockInfo();
    }

    return {
      totalAmount: getTotalAmount(),
      itemCount: getItemCount(),
      bonusPoints: getBonusPoints(),
      discountRate: getDiscountRate(),
    };
  };

  // 아이템 수량 변경 또는 삭제 핸들러
  const handleCartItemChange = (event, $cartItem) => {
    const target = event.target;

    if (target.classList.contains('quantity-change') || target.classList.contains('remove-item')) {
      const productId = target.dataset.productId;
      const itemElem = document.getElementById(productId);
      const product = PRODUCT_ITEM.find((item) => item.id === productId);

      if (!product || !itemElem) return;

      if (target.classList.contains('quantity-change')) {
        const quantityChange = parseInt(target.dataset.change);
        const currentQuantity = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
        const newQuantity = currentQuantity + quantityChange;

        if (newQuantity > 0 && quantityChange > 0 && newQuantity <= product.stock + currentQuantity) {
          // 수량 증가
          itemElem.querySelector('span').textContent =
            itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQuantity;
          product.stock -= quantityChange;
        } else if (newQuantity > 0 && quantityChange < 0) {
          // 수량 감소
          itemElem.querySelector('span').textContent =
            itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQuantity;
          product.stock -= quantityChange; // 음수이므로 실제로는 재고 증가
        } else if (newQuantity <= 0) {
          // 수량이 0 이하면 아이템 제거
          itemElem.remove();
          product.stock -= quantityChange; // 음수이므로 실제로는 재고 증가
        } else {
          alert('재고가 부족합니다.');
        }
      } else if (target.classList.contains('remove-item')) {
        // 아이템 삭제
        const removeQuantity = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
        product.stock += removeQuantity;
        itemElem.remove();
      }
    }
  };

  return {
    getLastSelected: () => lastSelected,
    setLastSelected: (value) => {
      lastSelected = value;
    },
    getTotalAmount: cartState.getTotalAmount,
    getItemCount: cartState.getItemCount,
    getBonusPoints: cartState.getBonusPoints,
    getDiscountRate: cartState.getDiscountRate,
    addToCart,
    calculateCart,
    handleCartItemChange,
  };
};
