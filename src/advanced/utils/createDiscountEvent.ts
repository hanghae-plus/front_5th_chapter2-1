import { Product } from '../types/product';
import { EventType, EventConfig } from '../types/event';
import { eventConfigs } from '../constants/event';
import { updateSelectBoxOptions } from './updateSelectBoxOption.ts';

export const createDiscountEvent = (products: Product[]): void => {
  let lastSelectedId: string | null = null;
  const originalPrices = new Map<string, number>();

  products.forEach((product) => {
    originalPrices.set(product.id, product.price);
  });

  const getAvailableProducts = (eventType: EventType, products: Product[]): Product[] => {
    switch (eventType) {
      case EventType.FLASH:
        return products;
      case EventType.SUGGEST:
        return products.filter((item) => item.id !== lastSelectedId && item.quantity > 0);
      default:
        return [];
    }
  };

  const runDiscountEvent = (eventType: EventType): void => {
    const config: EventConfig = eventConfigs[eventType];

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

    // 원래 가격을 기준으로 할인된 가격 계산
    const originalPrice = originalPrices.get(randomProduct.id) || randomProduct.price;
    randomProduct.price = Math.round(originalPrice * (1 - config.discountRate));
    alert(config.messageTemplate(randomProduct.name));
    lastSelectedId = randomProduct.id;

    // 5초 후 원래 가격으로 복구
    setTimeout(() => {
      randomProduct.price = originalPrice;
      const $productSelect = document.getElementById('product-select') as HTMLSelectElement;
      if ($productSelect) {
        updateSelectBoxOptions($productSelect, products);
      }
    }, 5000);
  };

  setTimeout(() => {
    runDiscountEvent(EventType.FLASH);
    setInterval(() => runDiscountEvent(EventType.FLASH), eventConfigs[EventType.FLASH].interval);
  }, eventConfigs[EventType.FLASH].delay());

  setTimeout(() => {
    runDiscountEvent(EventType.SUGGEST);
    setInterval(
      () => runDiscountEvent(EventType.SUGGEST),
      eventConfigs[EventType.SUGGEST].interval,
    );
  }, eventConfigs[EventType.SUGGEST].delay());
};
