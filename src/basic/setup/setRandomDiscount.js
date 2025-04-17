// render
import { renderProductOptions } from "@/basic/render";

/**
 * 랜덤 할인 세팅 함수
 *
 * - 랜덤한 시간마다 번개 할인
 * - 랜덤한 시간마다 마지막에 선택하지 않은 상품 5% 추가 할인
 *   * TODO: 이미 담겨있는 상품이 할인되는 상황 예외처리
 *
 * @fires renderProductOptions
 */
export const setRandomDiscount = () => {
  setTimeout(() => {
    setInterval(() => {
      const { products } = globalThis;
      const luckyItem = products[Math.floor(Math.random() * products.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.cost = Math.round(luckyItem.cost * 0.8);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        renderProductOptions(products);
      }
    }, 30_000);
  }, Math.random() * 10_000);

  setTimeout(() => {
    setInterval(() => {
      const { products, lastSelected } = globalThis;
      if (!lastSelected) return;
      const suggest = products.find(
        (item) => item.id !== lastSelected && item.quantity > 0,
      );
      if (!suggest) return;
      alert(suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!");
      suggest.cost = Math.round(suggest.cost * 0.95);
      renderProductOptions(products);
    }, 60_000);
  }, Math.random() * 20_000);
};
