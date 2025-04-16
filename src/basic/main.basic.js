import { createElement, render, elements } from './core/dom';
import { renderLoyaltyPoints } from './domains/points';
import { MAXIMUM_STOCKS, state } from './core/state';
import { SALE_CONFIG, PRODUCT_CONFIG } from './core/constants';

/**
 * 상품 선택 옵션 업데이트
 * @param {Array<{id: string, name: string, price: number, stock: number}>} products 상품 목록
 */
const updateProductOption = (products = state.products) => {
  elements.productSelect.innerHTML = '';

  const selectOptions = products.map((product) =>
    createElement('option', {
      value: product.id,
      disabled: product.stock === 0,
      textContent: `${product.name} - ${product.price}원`,
    }),
  );
  elements.productSelect.append(...selectOptions);
};

/**
 * 세일 이벤트 설정
 * @param {number} interval 이벤트 간격
 * @param {Function} callback 이벤트 콜백
 * @param {number} delay 이벤트 지연 시간
 */
const setupSaleEvents = (interval, callback, delay) => {
  setTimeout(() => {
    setInterval(callback, interval);
  }, delay);
};

/**
 * 할인 가격 계산
 * @param {number} price 가격
 * @param {number} discountRate 할인율
 * @returns {number} 할인 가격
 */
const getDiscountPrice = (price, discountRate) => price * (1 - discountRate);

/**
 * 메인 함수
 */
const main = () => {
  // DOM요소 추가
  render();
  updateProductOption();
  calculateCartDiscountPrice();

  //번개 세일 이벤트 설정
  setupSaleEvents(
    SALE_CONFIG.FLASH_SALE.INTERVAL,
    () => {
      const randomProduct =
        state.products[Math.floor(Math.random() * state.products.length)];
      if (
        Math.random() < SALE_CONFIG.FLASH_SALE.CHANCE &&
        randomProduct.stock > 0
      ) {
        randomProduct.price = Math.round(
          randomProduct.price * (1 - SALE_CONFIG.FLASH_SALE.DISCOUNT),
        );
        alert('번개세일! ' + randomProduct.name + '이(가) 20% 할인 중입니다!');
        updateProductOption();
      }
    },
    Math.random() * 10000,
  );

  //추천 세일 이벤트 설정
  setupSaleEvents(
    SALE_CONFIG.RECOMMENDATION_SALE.INTERVAL,
    () => {
      if (state.lastSelected) {
        var recommendedProduct = state.products.find(function (item) {
          return item.id !== state.lastSelected && item.stock > 0;
        });
        if (recommendedProduct) {
          alert(
            recommendedProduct.name +
              '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!',
          );
          recommendedProduct.price = Math.round(
            recommendedProduct.price *
              (1 - SALE_CONFIG.RECOMMENDATION_SALE.DISCOUNT),
          );
          updateProductOption();
        }
      }
    },
    Math.random() * 20000,
  );
};

/**
 * 장바구니 총액 계산
 * @param {Array<{id: string, name: string, price: number, stock: number}>} products 상품 목록
 * @returns {{totalAmount: number, discountRate: number, cartItemCount: number}} 총액, 할인율, 총 수량
 */
const calculateTotalAmount = (products = state.products) => {
  let totalAmount = 0;
  let cartItemCount = 0;
  let subTotalAmount = 0;

  const cartItems = [...elements.cartItemsContainer.children];

  for (const item of cartItems) {
    // 현재 상품 찾기
    const currentProduct = products.find((product) => product.id === item.id);

    // 수량 추출
    const quantity = parseInt(
      item.querySelector('span').textContent.split('x ')[1],
    );
    // 상품 가격 계산
    const currentProductPrice = currentProduct.price * quantity;
    let discountRate = 0;

    // 수량 증가
    cartItemCount += quantity;

    // 총 가격 계산
    subTotalAmount += currentProductPrice;

    // 할인 적용
    if (quantity >= 10) {
      discountRate = PRODUCT_CONFIG.DISCOUNT_RATE[currentProduct.id] || 0;
    }

    // 할인 가격 계산
    totalAmount += getDiscountPrice(currentProductPrice, discountRate);
  }

  let discountRate = 0;

  // 30개 이상 구매시 25% 할인
  if (cartItemCount >= 30) {
    const bulkDiscount = totalAmount * 0.25;
    const itemDiscount = subTotalAmount - totalAmount;

    // 총 할인 가격이 상품 할인 가격보다 크면 총 할인 가격 적용
    if (bulkDiscount > itemDiscount) {
      totalAmount = getDiscountPrice(subTotalAmount, 0.25);
      discountRate = 0.25;
    } else {
      // 총 할인 가격이 상품 할인 가격보다 작으면 상품 할인 가격 적용
      discountRate = (subTotalAmount - totalAmount) / subTotalAmount;
    }
  } else {
    // 30개 미만 구매시 할인 가격 계산
    discountRate = (subTotalAmount - totalAmount) / subTotalAmount;
  }

  // 화요일 할인 적용
  const isTuesday = new Date().getDay() === 2;

  if (isTuesday) {
    totalAmount = getDiscountPrice(totalAmount, 0.1);
    discountRate = Math.max(discountRate, 0.1);
  }
  return { totalAmount, discountRate, cartItemCount };
};

/**
 * 장바구니 계산 결과
 *
 */
const calculateCartDiscountPrice = () => {
  const { totalAmount, discountRate, cartItemCount } = calculateTotalAmount();

  state.totalAmount = totalAmount;
  state.cartItemCount = cartItemCount;

  elements.cartTotal.textContent = `총액: ${Math.round(totalAmount)}원`;

  // 할인 적용 여부 확인
  if (discountRate > 0) {
    const discountTag = createElement('span', {
      className: 'text-green-500 ml-2',
      textContent: `(${(discountRate * 100).toFixed(1)}% 할인 적용)`,
    });
    elements.cartTotal.appendChild(discountTag);
  }

  updateStockStatus();
  renderLoyaltyPoints();
};

/**
 * 재고 상태 메시지 생성
 * @param  {Array<{id: string, name: string, price: number, stock: number}>} products 상품 목록
 * @returns {string} 재고 상태 메시지
 */
const createStockStatusMessage = (products) => {
  let message = '';

  for (const product of products) {
    if (product.stock < 5) {
      message += `${product.name}: ${product.stock > 0 ? '재고 부족 (' + product.stock + '개 남음)' : '품절\n'}`;
    }
  }
  return message;
};

function updateStockStatus() {
  elements.stockStatus.textContent = createStockStatusMessage(state.products);
}

/**
 * 장바구니 상품 생성
 * @param {id: string, name: string, price: number, stock: number} product 상품 객체
 * @returns {Element} 장바구니 상품 요소
 */
const createCartItem = (product) => {
  const cartItemTag = createElement('div', {
    id: product.id,
    className: 'flex justify-between items-center mb-2',
  });
  const buttonClasses = {
    countButton: () =>
      [
        'quantity-change',
        'bg-blue-500',
        'text-white',
        'px-2',
        'py-1',
        'rounded',
        'mr-1',
      ].join(' '),
    deleteButton: () =>
      [
        'remove-item',
        'bg-red-500',
        'text-white',
        'px-2',
        'py-1',
        'rounded',
      ].join(' '),
  };
  cartItemTag.innerHTML = `
    <span style="font-size: 14px; color: #333;">
      ${product.name} - ${product.price}원 x 1
    </span>
    <div>
      <button class="${buttonClasses.countButton()}" data-product-id="${product.id}" data-change="-1">-</button>
      <button class="${buttonClasses.countButton()}" data-product-id="${product.id}" data-change="1">+</button>
      <button class="${buttonClasses.deleteButton()}" data-product-id="${product.id}">삭제</button
      >
    </div>
    `;
  return cartItemTag;
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
 * 장바구니에 상품 추가
 * @param {Object} product 상품 객체
 * @returns {boolean} 성공 여부
 */
const addToCart = (product) => {
  const cartItemElement = document.getElementById(product.id);
  const currentQuantity = cartItemElement
    ? parseInt(cartItemElement.dataset.quantity)
    : 0;

  const { success, quantity, isRemove } = calculateCartQuantity(
    currentQuantity,
    1,
    MAXIMUM_STOCKS.find((p) => p.id === product.id).stock,
  );

  if (!success) {
    alert('재고가 부족합니다.');
    return false;
  }

  if (cartItemElement) {
    updateCartItem(cartItemElement, product, quantity, isRemove);
  } else {
    const newCartItemElement = createCartItem(product);
    newCartItemElement.dataset.quantity = 1;
    elements.cartItemsContainer.appendChild(newCartItemElement);
    product.stock--;
  }
  return true;
};

// 이벤트 핸들러: 장바구니 추가 버튼
elements.addToCartBtn.addEventListener('click', () => {
  const selectedProductId = elements.productSelect.value;
  const product = state.products.find(
    (product) => product.id === selectedProductId,
  );

  if (addToCart(product)) {
    calculateCartDiscountPrice();
    updateStockStatus();
    state.lastSelectedProductId = selectedProductId;
  }
});

// 이벤트 핸들러: 장바구니 아이템 조작 (수량 변경/삭제)
elements.cartItemsContainer.addEventListener('click', (event) => {
  const targetElement = event.target;
  const productId = targetElement.dataset.productId;
  const cartItemElement = document.getElementById(productId);
  const product = state.products.find((product) => product.id === productId);

  if (!cartItemElement || !product) return;

  if (targetElement.classList.contains('quantity-change')) {
    const quantityChange = parseInt(targetElement.dataset.change);
    const currentQuantity = parseInt(cartItemElement.dataset.quantity);
    const { success, quantity, isRemove } = calculateCartQuantity(
      currentQuantity,
      quantityChange,
      product.stock + currentQuantity,
    );

    if (success) {
      updateCartItem(cartItemElement, product, quantity, isRemove);
      calculateCartDiscountPrice();
      updateStockStatus();
    } else {
      alert('재고가 부족합니다.');
    }
  } else if (targetElement.classList.contains('remove-item')) {
    const currentQuantity = parseInt(cartItemElement.dataset.quantity);
    product.stock += currentQuantity;
    cartItemElement.remove();
    calculateCartDiscountPrice();
    updateStockStatus();
  }
});

main();
