import { PRODUCT_INVENTORY } from "@advanced/lib/configs/products";
import { useCart } from "@advanced/lib/contexts/CartProvider";

const FLASH_SALE_INTERVAL = 30000;
const SUGGEST_FLASH_SALE_INTERVAL = 60000;

export function useFlashSaleAlert() {
  const { state } = useCart();

  const registerFlashSale = () => {
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        const luckyItem = PRODUCT_INVENTORY[Math.floor(Math.random() * PRODUCT_INVENTORY.length)];

        if (Math.random() < 0.3 && luckyItem.stock > 0) {
          luckyItem.price = Math.round(luckyItem.price * 0.8);
          alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
        }
      }, FLASH_SALE_INTERVAL);
    }, Math.random() * 10000);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  };

  const registerSuggestFlashSale = () => {
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (!state.lastSelected) return;
        const suggest = PRODUCT_INVENTORY.find((item) => item.id !== state.lastSelected && item.stock > 0);

        if (!suggest) return;

        alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
        suggest.price = Math.round(suggest.price * 0.95);
      }, SUGGEST_FLASH_SALE_INTERVAL);
    }, Math.random() * 20000);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  };

  return { registerFlashSale, registerSuggestFlashSale };
}
