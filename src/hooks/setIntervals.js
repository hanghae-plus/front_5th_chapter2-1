import { store } from "../store/store.js";
import { showSelectList } from "./selectProduct.js";

export function alertPromotion1 () {
  const products = store.products;
  setTimeout(() => {
    setInterval(() => {
      const promotionProduct = products[Math.floor(Math.random() * products.length)];

      if (Math.random() < 0.3 && promotionProduct.q > 0) {
        promotionProduct.val = Math.round(promotionProduct.val * 0.8);
        alert(`번개세일! ${promotionProduct.name}이(가) 20% 할인 중입니다!`);
        showSelectList();
      }
    }, 30000)
  }, Math.random() * 10000)
}

export function alertPromotion2 () {
  setTimeout(() => {
    setInterval(() => {
      const products = store.products;
      const lastSel = store.state.lastSel;
      
      if (lastSel) {
        const promotion = products.find(
          (item) => item.id !== lastSel && item.q > 0
        );
        if (promotion) {
          alert(`${promotion.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
          promotion.val = Math.round(promotion.val * 0.95);
          showSelectList();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}