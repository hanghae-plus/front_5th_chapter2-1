// 헬퍼 함수 모음
const createElement = (tag, props = {}) => {
  const element = document.createElement(tag);

  for (const [key, value] of Object.entries(props)) {
    if (value) {
      element[key] = value;
    }
  }

  return element;
};

const getDiscountedPrice = (amount, rate) => amount * (1 - rate);

const setupDiscountTimer = (interval, delay, callback) => {
  setTimeout(() => setInterval(callback, interval), delay);
};

// 알림 메시지 생성 함수
const getDiscountAlertMessage = (product, discountRate) => {
  return `${product.name}${
    discountRate === FLASH_SALE_DISCOUNT_RATE
      ? `이(가) ${discountRate * 100}% 할인 중입니다!`
      : `은(는) 어떠세요? 지금 구매하시면 ${discountRate * 100}% 추가 할인!`
  }`;
};

export {
  createElement,
  getDiscountedPrice,
  setupDiscountTimer,
  getDiscountAlertMessage,
};
