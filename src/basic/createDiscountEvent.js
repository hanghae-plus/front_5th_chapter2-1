import updateSelectBoxOptions from './updateSelectBoxOption.js';

/**
 * 이벤트 타입
 * @typedef {Object} EventType
 * @property {string} FLASH - 번개 세일
 * @property {string} SUGGEST - 추천 상품
 */

/** @type {EventType} */
const EVENT_TYPE = {
  FLASH: 'flash',
  SUGGEST: 'suggest',
};

/**
 * 이벤트 설정
 * @typedef {Object} EventConfig
 * @property {Function} delay - 이벤트 시작 지연 시간 (ms)
 * @property {number} interval - 이벤트 반복 간격 (ms)
 * @property {number} discountRate - 할인율
 * @property {Function} messageTemplate - 알림 메시지 템플릿
 * @property {Function|boolean} condition - 이벤트 실행 조건
 */

/**
 * 이벤트 설정 목록
 * @type {Object.<string, EventConfig>}
 */
const eventConfigs = {
  [EVENT_TYPE.FLASH]: {
    delay: () => Math.random() * 10000,
    interval: 30000,
    discountRate: 0.2,
    messageTemplate: (name) => `번개세일! ${name}이(가) 20% 할인 중입니다!`,
    condition: () => Math.random() < 0.3,
  },
  [EVENT_TYPE.SUGGEST]: {
    delay: () => Math.random() * 20000,
    interval: 60000,
    discountRate: 0.05,
    messageTemplate: (name) => `${name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`,
    condition: true,
  },
};

/**
 * 할인 이벤트를 생성하고 실행합니다.
 * @param {Array} products - 상품 목록
 */
const createDiscountEvent = (products) => {
  let lastSelectedId = null;

  /**
   * 이벤트 타입에 따라 사용 가능한 상품을 필터링합니다.
   * @param {string} eventType - 이벤트 타입
   * @param {Array} products - 상품 목록
   * @returns {Array} 사용 가능한 상품 목록
   */
  const getAvailableProducts = (eventType, products) => {
    switch (eventType) {
      case EVENT_TYPE.FLASH:
        return products;
      case EVENT_TYPE.SUGGEST:
        return products.filter((item) => item.id !== lastSelectedId && item.quantity > 0);
      default:
        return [];
    }
  };

  /**
   * 할인 이벤트를 실행합니다.
   * @param {string} eventType - 이벤트 타입
   */
  const runDiscountEvent = (eventType) => {
    const config = eventConfigs[eventType];

    if (!config) {
      return;
    }

    const availableProducts = getAvailableProducts(eventType, products);

    if (availableProducts.length === 0) {
      return;
    }

    const randomProduct = availableProducts[Math.floor(Math.random() * availableProducts.length)];

    if (randomProduct.quantity === 0) {
      return;
    }

    if (typeof config.condition === 'function' && !config.condition(randomProduct)) {
      return;
    }

    randomProduct.price = Math.round(randomProduct.price * (1 - config.discountRate));
    alert(config.messageTemplate(randomProduct.name));
    lastSelectedId = randomProduct.id;

    updateSelectBoxOptions();
  };

  setTimeout(() => {
    runDiscountEvent(EVENT_TYPE.FLASH);
    setInterval(() => runDiscountEvent(EVENT_TYPE.FLASH), eventConfigs[EVENT_TYPE.FLASH].interval);
  }, eventConfigs[EVENT_TYPE.FLASH].delay());

  setTimeout(() => {
    runDiscountEvent(EVENT_TYPE.SUGGEST);
    setInterval(
      () => runDiscountEvent(EVENT_TYPE.SUGGEST),
      eventConfigs[EVENT_TYPE.SUGGEST].interval,
    );
  }, eventConfigs[EVENT_TYPE.SUGGEST].delay());
};

export default createDiscountEvent;
