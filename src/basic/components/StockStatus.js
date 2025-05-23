import { STOCK_WARNING_LIMIT } from "@/basic/config/constants";
import { $ } from "@/basic/lib";

/**
 * [Component] 재고 부족 안내 텍스트
 *
 * @param {Array<{id: string, name: string, cost: number, quantity: number, discount: number}>} products
 * @returns {DocumentFragment}
 */
export const StockStatus = (products) => {
  const stocks = products
    .filter((i) => i.quantity < STOCK_WARNING_LIMIT)
    .map(
      (item) =>
        item.name +
        ": " +
        (item.quantity > 0
          ? "재고 부족 (" + item.quantity + "개 남음)"
          : "품절"),
    );
  return $("frag", null, ...stocks);
};
