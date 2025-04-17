import { updateProductOptions } from '../components';

export const randomSale = (
  lastSelectedItem,
  products,
  interval = 30000,
  delay = Math.random() * 10000
) => {
  setTimeout(() => {
    setInterval(() => {
      const luckyItem = products[Math.floor(Math.random() * products.length)];

      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);

        alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);

        updateProductOptions(lastSelectedItem, products);
      }
    }, interval);
  }, delay);
};
