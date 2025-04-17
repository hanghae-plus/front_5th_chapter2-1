import { productStore } from '../stores';
import { DISCOUNT } from '../constants';
import { getDiscountedPrice, isOutOfStock } from '../utils';

export const addDiscountEvents = () => {
  const triggerFlashDiscount = () => {
    const { products } = productStore.getState();

    const randomProduct = products[Math.floor(Math.random() * products.length)];

    if (Math.random() < 0.3 && !isOutOfStock(randomProduct.stock)) {
      alert(`번개세일! ${randomProduct.name}이(가) 20% 할인 중입니다!`);

      productStore.actions.updateProduct({
        ...randomProduct,
        price: getDiscountedPrice(randomProduct.price, DISCOUNT.FLASH.RATE, true),
      });
    }
  };

  const triggerSuggestedDiscount = () => {
    const { lastSelectedProductId, products } = productStore.getState();

    if (lastSelectedProductId) {
      const suggestedProduct = products.find(
        (product) => product.id !== lastSelectedProductId && !isOutOfStock(product.stock),
      );
      if (suggestedProduct) {
        alert(`${suggestedProduct.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);

        productStore.actions.updateProduct({
          ...suggestedProduct,
          price: getDiscountedPrice(suggestedProduct.price, DISCOUNT.SUGGEST.RATE, true),
        });
      }
    }
  };

  const init = () => {
    setTimeout(() => {
      setInterval(triggerFlashDiscount, 30000);
    }, Math.random() * 10000);

    setTimeout(() => {
      setInterval(triggerSuggestedDiscount, 60000);
    }, Math.random() * 20000);
  };

  return { init };
};
