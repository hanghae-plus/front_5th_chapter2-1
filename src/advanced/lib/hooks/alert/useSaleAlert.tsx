import { PRODUCT_INVENTORY, SALE_CONFIGS } from "@advanced/lib/configs";
import { useCart } from "@advanced/lib/contexts/CartProvider";
import { calculatePercentageFromRate, isEligibleForFlashSale } from "@advanced/lib/utils";

export function useSaleAlert() {
  const { state } = useCart();
  const { flashSale, recommendSale } = SALE_CONFIGS;

  const registerFlashSale = () => {
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        const saleItem = PRODUCT_INVENTORY[Math.floor(Math.random() * PRODUCT_INVENTORY.length)];

        if (!isEligibleForFlashSale(saleItem.stock)) return;

        saleItem.price = Math.round(saleItem.price * flashSale.rate);

        alert(
          `번개세일! ${saleItem.name}이(가) ${calculatePercentageFromRate(flashSale.rate)}% 할인 중입니다!`,
        );
      }, flashSale.interval);
    }, Math.random() * 10000);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  };

  const registerRecommendSale = () => {
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (!state.lastSelected) return;
        
        const saleRecommendItem = PRODUCT_INVENTORY.find((item) => item.id !== state.lastSelected && item.stock > 0);
        if (!saleRecommendItem) return;

        saleRecommendItem.price = Math.round(saleRecommendItem.price * recommendSale.rate);

        alert(
          `${saleRecommendItem.name}은(는) 어떠세요? 지금 구매하시면 ${calculatePercentageFromRate(recommendSale.rate)}% 추가 할인!`,
        );
      }, recommendSale.interval);
    }, Math.random() * 20000);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  };

  return { registerFlashSale, registerRecommendSale };
}
