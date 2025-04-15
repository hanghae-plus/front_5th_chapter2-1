import updateSelectBoxOptions from './updateSelectBoxOption.js';

const EVENT_TYPE = {
  FLASH: 'flash',
  SUGGEST: 'suggest',
};

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

const createDiscountEvent = (products) => {
  let lastSelectedId = null;

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
