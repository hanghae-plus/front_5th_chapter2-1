import React from "react";
import { useCartStore } from "../store/useCartStore";

/**재고 현황  */
export const StockStatus = () => {
  const { products } = useCartStore();

  const info = products
    .filter((item) => item.q < 5)
    .map((item) => {
      const status = item.q > 0 ? `재고 부족 (${item.q}개 남음)` : `품절`;
      return (
        <div key={item.id}>
          {item.name}:{" "}
          <span className={item.q > 0 ? "text-red-500" : "text-gray-500"}>{status}</span>
        </div>
      );
    });

  return (
    <div id="stock-status" className="text-sm text-gray-500 mt-2">
      {info}
    </div>
  );
};
