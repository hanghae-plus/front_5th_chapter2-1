// 세일 이벤트 상수
const SALE_CONFIG = {
  FLASH_SALE: {
    INTERVAL: 30000, // 30초
    CHANCE: 0.3, // 30% 확률
    DISCOUNT: 0.2, // 20% 할인
  },
  RECOMMENDATION_SALE: {
    INTERVAL: 60000, // 60초
    DISCOUNT: 0.05, // 5% 할인
  },
};

// 상품 상수
const PRODUCT_CONFIG = {
  DISCOUNT_RATE: {
    p1: 0.1,
    p2: 0.15,
    p3: 0.2,
    p4: 0.05,
    p5: 0.25,
  },
};

const initialProducts = [
  { id: 'p1', name: '상품1', price: 10000, stock: 50 },
  { id: 'p2', name: '상품2', price: 20000, stock: 30 },
  { id: 'p3', name: '상품3', price: 30000, stock: 20 },
  { id: 'p4', name: '상품4', price: 15000, stock: 0 },
  { id: 'p5', name: '상품5', price: 25000, stock: 10 },
];

// 최대 재고 상수 추가
const MAXIMUM_STOCKS = initialProducts.map((product) => ({
  id: product.id,
  stock: product.stock,
}));

const state = {
  lastSelected: null,
  products: JSON.parse(JSON.stringify(initialProducts)), // 깊은 복사 수행
  totalAmount: 0,
  cartItemCount: 0,
};

/**
 * 요소 생성 및 속성 추가
 * @param {string} tag 요소 태그 이름
 * @param {Object} properties 요소 속성
 * @returns {Element} 요소
 */

// 요소 생성
const $root = document.getElementById('app');

const createElementFromHTML = (htmlString) => {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};

const $container = () => {
  return createElementFromHTML(/* html */ `
    <div class="bg-gray-100 p-8"></div>
  `);
};

const $wrapper = () => {
  return createElementFromHTML(/* html */ `
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8"></div>
  `);
};

const $header = () => {
  return createElementFromHTML(/* html */ `
    <h1 class="text-2xl font-bold mb-4">장바구니</h1>
  `);
};

const $cartItemsContainer = () => {
  return createElementFromHTML(/* html */ `
    <div id="cart-items" class="text-xl font-bold my-4"></div>
  `);
};

const $cartTotal = () => {
  return createElementFromHTML(/* html */ `
    <div id="cart-total" class="text-xl font-bold my-4"></div>
  `);
};

const $productSelect = () => {
  return createElementFromHTML(/* html */ `
    <select id="product-select" class="border rounded p-2 mr-2"></select>
  `);
};

const $addToCartBtn = () => {
  return createElementFromHTML(/* html */ `
    <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
  `);
};

const $stockStatus = () => {
  return createElementFromHTML(/* html */ `
    <div id="stock-status" class="text-sm text-gray-500 mt-2"></div>
  `);
};

/**
 * DOM 요소 생성
 */
const createElements = () => {
  const container = $container();
  const wrapper = $wrapper();

  container.appendChild(wrapper);
  wrapper.append(
    $header(),
    $cartItemsContainer(),
    $cartTotal(),
    $productSelect(),
    $addToCartBtn(),
    $stockStatus(),
  );

  $root.appendChild(container);
};

/**
 * 상품 선택 옵션 업데이트
 * @param {Array<{id: string, name: string, price: number, stock: number}>} products 상품 목록
 */
const updateProductOption = (products = state.products) => {
  const productSelect = document.getElementById('product-select');
  productSelect.innerHTML = ''; // 기존 옵션 초기화

  const selectOptions = products.map((product) => {
    return createElementFromHTML(
      /* html */
      `<option value="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>${product.name} - ${product.price}원</option>`,
    );
  });
  // 각 옵션을 추가
  selectOptions.forEach((option) => productSelect.appendChild(option));
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
  createElements();

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
  let discountRate = 0;

  const cartItemsContainer = document.getElementById('cart-items');
  const cartItems = [...cartItemsContainer.children];

  for (const item of cartItems) {
    const currentProduct = products.find((product) => product.id === item.id);
    const quantity = parseInt(item.dataset.quantity);
    const currentProductPrice = currentProduct.price * quantity;
    let pointDiscountRate = 0;

    cartItemCount += quantity;

    subTotalAmount += currentProductPrice;

    if (quantity >= 10) {
      pointDiscountRate = PRODUCT_CONFIG.DISCOUNT_RATE[currentProduct.id] || 0;
    }
    // 할인 가격 계산
    totalAmount += getDiscountPrice(currentProductPrice, pointDiscountRate);
  }

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
 * 장바구니 할인 계산 결과
 *
 */
const calculateCartDiscountPrice = () => {
  const { totalAmount, discountRate, cartItemCount } = calculateTotalAmount();
  const cartTotal = document.getElementById('cart-total');
  state.totalAmount = totalAmount;
  state.cartItemCount = cartItemCount;

  cartTotal.textContent = `총액: ${Math.round(totalAmount)}원`;

  // 할인 적용 여부 확인
  if (discountRate > 0) {
    const discountTag = createElementFromHTML(
      /* html */
      `<span class="text-green-500 ml-2">(${(discountRate * 100).toFixed(1)}% 할인 적용)</span>`,
    );
    cartTotal.appendChild(discountTag);
  }

  updateStockStatus();
  renderLoyaltyPoints();
};

/**
 * 포인트 계산
 * @returns {number} 포인트
 */
const calculateLoyaltyPoints = () => {
  return Math.floor(state.totalAmount / 1000);
};

/**
 * 포인트 렌더링
 */
const renderLoyaltyPoints = () => {
  const loyaltyPoints = calculateLoyaltyPoints();
  const cartTotal = document.getElementById('cart-total');
  const pointsTag = () => {
    return createElementFromHTML(
      /* html */
      `<span id="loyalty-points" class="text-blue-500 ml-2">(포인트: ${loyaltyPoints})</span>`,
    );
  };
  cartTotal.append(pointsTag());
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
  const stockStatus = document.getElementById('stock-status');
  stockStatus.textContent = createStockStatusMessage(state.products);
}

/**
 * 장바구니 상품 생성
 * @param {Object} product 상품 객체
 * @returns {Element} 장바구니 상품 요소
 */
const createCartItem = (product) => {
  const cartItemTag = () => {
    return createElementFromHTML(
      /* html */
      `<div id="${product.id}" class="flex justify-between items-center mb-2">
          <span>${product.name} - ${product.price}원 x 1</span>
          <div>
            <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                    data-product-id="${product.id}" data-change="-1">-</button>
            <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                    data-product-id="${product.id}" data-change="1">+</button>
            <button class="remove-item bg-red-500 text-white px-2 py-1 rounded"
                    data-product-id="${product.id}">삭제</button>
          </div>
        </div>
      `,
    );
  };
  return cartItemTag();
};

/**
 * 장바구니 수량 계산
 * @param {number} currentQuantity 현재 수량
 * @param {number} change 변경 수량
 * @param {number} maximumStock 최대 재고
 * @returns {{success: boolean, quantity: number, isRemove: boolean}} 성공 여부, 수량, 삭제 여부
 */
const calculateCartQuantity = (currentQuantity, change, maximumStock) => {
  const updatedQuantity = currentQuantity + change;
  if (updatedQuantity > maximumStock) return { success: false };
  if (updatedQuantity <= 0) return { success: true, quantity: 1 };
  return { success: true, quantity: updatedQuantity };
};

/**
 * 장바구니 수량 업데이트
 * @param {Element} cartItemElement 장바구니 아이템 요소
 * @param {Object} product 상품 객체
 * @param {number} quantity 수량
 */
const updateCartItem = (cartItemElement, product, quantity) => {
  product.stock -= quantity - parseInt(cartItemElement.dataset.quantity);
  cartItemElement.dataset.quantity = quantity;
  cartItemElement.querySelector('span').textContent =
    `${product.name} - ${product.price}원 x ${quantity}`;
};

/**
 * 장바구니 동작 처리
 * @param {Event} event 이벤트 객체
 */
const handleCartAction = (event) => {
  const cartItemsContainer = document.getElementById('cart-items');
  const productSelect = document.getElementById('product-select');

  const targetElement = event.target;
  const selectedProductId =
    targetElement.dataset.productId || productSelect.value;
  const product = state.products.find((p) => p.id === selectedProductId);

  const cartItemElement = document.getElementById(product.id);
  const currentQuantity = cartItemElement
    ? parseInt(cartItemElement.dataset.quantity)
    : 0;

  const handleAdd = () => {
    const { success, quantity } = calculateCartQuantity(
      currentQuantity,
      1,
      MAXIMUM_STOCKS.find((p) => p.id === product.id).stock,
    );
    if (!success) return alert('재고가 부족합니다.');
    if (cartItemElement) updateCartItem(cartItemElement, product, quantity);
    else {
      const newCartItem = createCartItem(product);
      newCartItem.dataset.quantity = 1;
      cartItemsContainer.appendChild(newCartItem);
      product.stock--;
    }
  };

  const handleQuantityChange = () => {
    const { success, quantity, isRemove } = calculateCartQuantity(
      currentQuantity,
      1,
      product.stock + currentQuantity,
    );
    if (success) updateCartItem(cartItemElement, product, quantity, isRemove);
    else alert('재고가 부족합니다.');
  };

  const handleRemove = () => {
    product.stock += currentQuantity;
    cartItemElement.remove();
  };

  if (targetElement.id === 'add-to-cart') {
    if (!cartItemElement) {
      handleAdd();
    } else {
      handleQuantityChange();
    }
  }

  if (targetElement.closest('#cart-items')) {
    if (targetElement.classList.contains('quantity-change')) {
      handleQuantityChange();
    }
    if (targetElement.classList.contains('remove-item')) {
      handleRemove();
    }
  }

  calculateCartDiscountPrice();
  updateStockStatus();
  state.lastSelectedProductId = selectedProductId;
};

// 이벤트 핸들러 등록

document.addEventListener('click', handleCartAction);

main();
