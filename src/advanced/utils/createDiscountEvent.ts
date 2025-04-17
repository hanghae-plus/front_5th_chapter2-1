import { Dispatch, SetStateAction } from 'react';

import { Product } from '../types/product';
import { EventType, EventConfig } from '../types/event';
import { eventConfigs } from '../constants/event';

export const createDiscountEvent = (
  products: Product[],
  setAvailableProducts: Dispatch<SetStateAction<Product[]>>,
): void => {
  let lastSelectedId: string | null = null;
  const originalPrices = new Map<string, number>();
  let flashTimer: number | null = null;
  let suggestTimer: number | null = null;

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

    const originalPrice = originalPrices.get(randomProduct.id) || randomProduct.price;
    const discountedPrice = Math.round(originalPrice * (1 - config.discountRate));

    setAvailableProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === randomProduct.id ? { ...product, price: discountedPrice } : product,
      ),
    );

    alert(config.messageTemplate(randomProduct.name));
    lastSelectedId = randomProduct.id;
  };

  if (flashTimer) clearTimeout(flashTimer);
  if (suggestTimer) clearTimeout(suggestTimer);

  const flashDelay = eventConfigs[EventType.FLASH].delay();
  flashTimer = setTimeout(() => {
    runDiscountEvent(EventType.FLASH);
    setInterval(() => runDiscountEvent(EventType.FLASH), eventConfigs[EventType.FLASH].interval);
  }, flashDelay);

  const suggestDelay = eventConfigs[EventType.SUGGEST].delay();
  suggestTimer = setTimeout(() => {
    runDiscountEvent(EventType.SUGGEST);
    setInterval(
      () => runDiscountEvent(EventType.SUGGEST),
      eventConfigs[EventType.SUGGEST].interval,
    );
  }, suggestDelay);
};
