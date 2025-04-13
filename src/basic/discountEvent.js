const DISCOUNT_EVENT_TYPE = {
  FLASH: 'flash',
  SUGGEST: 'suggest',
};

const discountEventConfigs = {
  [DISCOUNT_EVENT_TYPE.FLASH]: {
    delay: () => Math.random() * 10000,
    interval: 30000,
    discountRate: 0.2,
    messageTemplate: (name) => `번개세일! ${name}이(가) 20% 할인 중입니다!`,
    condition: () => Math.random() < 0.3,
  },
  [DISCOUNT_EVENT_TYPE.SUGGEST]: {
    delay: () => Math.random() * 20000,
    interval: 60000,
    discountRate: 0.05,
    messageTemplate: (name) => `${name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`,
    condition: true,
  },
};

const productSelectionStrategies = {
  [DISCOUNT_EVENT_TYPE.FLASH]: (products) => products,
  [DISCOUNT_EVENT_TYPE.SUGGEST]: (products) =>
    products.filter((item) => item.id !== lastSel && item.q > 0),
};

const applyDiscount = (product, discountRate) => {
  product.val = Math.round(product.val * (1 - discountRate));
};

const showDiscountMessage = (product, messageTemplate) => {
  alert(messageTemplate(product.name));
};

const createDiscountEvent = (eventType) => {
  const config = discountEventConfigs[eventType];
  if (!config) return;

  const runDiscountEvent = () => {
    const availableProducts = productSelectionStrategies[eventType](products);
    if (availableProducts.length === 0) return;

    const randomProduct = availableProducts[Math.floor(Math.random() * availableProducts.length)];
    if (randomProduct.q === 0) return;
    if (typeof config.condition === 'function' && !config.condition(randomProduct)) return;

    applyDiscount(randomProduct, config.discountRate);
    showDiscountMessage(randomProduct, config.messageTemplate);
    updateSelOpts();
  };

  setTimeout(() => {
    runDiscountEvent();
    setInterval(runDiscountEvent, config.interval);
  }, config.delay());
};

export default createDiscountEvent;
