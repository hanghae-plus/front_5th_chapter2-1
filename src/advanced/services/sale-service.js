import { getState, setState } from '../store/index.js';
import { SALE_CONFIG } from '../constants/index.js';

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

const handleSaleEvent = () => {
  //번개 세일 이벤트 설정
  setupSaleEvents(
    SALE_CONFIG.FLASH_SALE.INTERVAL,
    () => {
      const products = [...getState().products];
      const randomProduct =
        products[Math.floor(Math.random() * products.length)];
      if (
        Math.random() < SALE_CONFIG.FLASH_SALE.CHANCE &&
        randomProduct.stock > 0
      ) {
        randomProduct.price = Math.round(
          randomProduct.price * (1 - SALE_CONFIG.FLASH_SALE.DISCOUNT),
        );
        setState('products', products);
        alert('번개세일! ' + randomProduct.name + '이(가) 20% 할인 중입니다!');
      }
    },
    Math.random() * 10000,
  );

  //추천 세일 이벤트 설정
  setupSaleEvents(
    SALE_CONFIG.RECOMMENDATION_SALE.INTERVAL,
    () => {
      const lastSelected = getState().lastSelected;
      if (lastSelected) {
        const products = [...getState().products];
        const recommendedProduct = products.find(function (item) {
          return item.id !== lastSelected && item.stock > 0;
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
          setState('products', products);
        }
      }
    },
    Math.random() * 20000,
  );
};

export { handleSaleEvent };
