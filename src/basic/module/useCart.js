import { cartItemStore } from '../store/cartItemStore';
import { cartState } from '../store/cartState';
import { ProductStore } from '../store/productState';

// 카트 관련 기능 구현
export const useCart = () => {
  let lastSelected = null;

  // 장바구니 담기
  const addToCart = ($selectBox) => {
    const selectedId = $selectBox.value; // 이 부분을 바꿀 수 있는 방법이 있을까
    const selectedProduct = ProductStore.getProduct(selectedId);

    // 선택된 상품 + 재고 존재 확인
    if (selectedProduct && ProductStore.hasEnoughStock(selectedId)) {
      const foundCartItem = document.getElementById(selectedId);

      // 장바구니에 이미 담긴 경우
      if (foundCartItem) {
        const quantityText = foundCartItem.querySelector('span').textContent;
        const currentQuantity = parseInt(quantityText.split('x ')[1]);
        const newQuantity = currentQuantity + 1;

        // 재고 충분 여부 확인
        if (ProductStore.hasEnoughStock(selectedId, 1)) {
          foundCartItem.querySelector('span').textContent =
            quantityText.split('x ')[0] + 'x ' + newQuantity;

          // 재고 감소
          ProductStore.decreaseStock(selectedId);
        } else {
          alert('재고가 부족합니다.');
        }
      } else {
        // 장바구니에 없는 경우 새로 추가
        const { items } = cartItemStore.getState();
        const updatedItems = [...items, { ...selectedProduct, quantity: 1 }];
        cartItemStore.setState({ items: updatedItems });

        // 재고 감소
        ProductStore.decreaseStock(selectedId);
      }

      lastSelected = selectedId;
      return true;
    }

    return false;
  };

  // 장바구니 계산
  const calculateCart = ($cartItem, cartResultC, stockInfoC, selectBoxC) => {
    // 계산 값 초기화
    cartState.reset();

    // 자주 사용하는 메서드 참조 저장
    const getItemCount = cartState.getItemCount;
    const getTotalAmount = cartState.getTotalAmount; // 지역변수로 한 후에 -> 마지막에 set
    const getDiscountRate = cartState.getDiscountRate; // 얘도될듯
    const setItemCount = cartState.setItemCount;
    const setTotalAmount = cartState.setTotalAmount;
    const setDiscountRate = cartState.setDiscountRate;
    const setBonusPoints = cartState.setBonusPoints;

    const cartItems = $cartItem.children;
    let subtotal = 0;

    // 장바구니에 아이템이 있는 경우에만 계산
    if (cartItems.length > 0) {
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        const productId = item.id;
        const product = ProductStore.getProduct(productId);

        if (!product) continue;

        const quantity = parseInt(item.querySelector('span').textContent.split('x ')[1]);
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

        // 할인율이 undefined인 경우 대비
        const currentDiscount = getDiscountRate() || 0;
        setDiscountRate(Math.max(currentDiscount, 0.1));
      }
    }

    // 보너스 포인트 계산 (1,000원당 1점)
    setBonusPoints(Math.floor(getTotalAmount() / 1000));

    // UI 업데이트 부분을 이렇게하지 않아도 될 것 같다 생각이 듭니다

    // 결과값 업데이트
    if (cartResultC) {
      cartResultC.updateTotal(getTotalAmount(), getDiscountRate());
      cartResultC.updateBonusPoints();
    }

    // 재고 업데이트
    if (stockInfoC) {
      stockInfoC.updateStockInfo();
    }
    // disabled 업데이트

    if (selectBoxC) {
      selectBoxC.updateOptions();
    }
  };

  // 아이템 수량 변경 또는 삭제 핸들러 -> 수량을 들고있는 observer가 있으면 이렇게 할 필요 없었을 것 같습니다.
  const handleCartItemChange = (event) => {
    const target = event.target;

    if (target.classList.contains('quantity-change') || target.classList.contains('remove-item')) {
      const productId = target.dataset.productId;
      const itemElem = document.getElementById(productId);
      const product = ProductStore.getProduct(productId);

      if (!product || !itemElem) return;

      if (target.classList.contains('quantity-change')) {
        const quantityChange = parseInt(target.dataset.change);
        const currentQuantity = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
        const newQuantity = currentQuantity + quantityChange;

        if (newQuantity > 0 && quantityChange > 0) {
          if (ProductStore.hasEnoughStock(productId, 1)) {
            itemElem.querySelector('span').textContent =
              itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQuantity;

            ProductStore.decreaseStock(productId);
          } else {
            alert('재고가 부족합니다.');
          }
        } else if (newQuantity > 0 && quantityChange < 0) {
          // 수량 감소
          itemElem.querySelector('span').textContent =
            itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQuantity;

          ProductStore.increaseStock(productId);
        } else if (newQuantity <= 0) {
          itemElem.remove();
          ProductStore.increaseStock(productId, Math.abs(quantityChange));
        }
      } else if (target.classList.contains('remove-item')) {
        const removeQuantity = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
        ProductStore.increaseStock(productId, removeQuantity);
        itemElem.remove();
      }
    }
  };

  return {
    getLastSelected: () => lastSelected,
    setLastSelected: (value) => {
      lastSelected = value;
    },
    addToCart,
    calculateCart,
    handleCartItemChange,
  };
};
