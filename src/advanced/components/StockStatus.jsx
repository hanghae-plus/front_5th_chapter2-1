import React from "react";
import { useCartContext } from "../context/CartProvider.jsx";
import { getLowStockProducts } from "../selectors/productSelectors.js";

const StockStatus = () => {
  const { state } = useCartContext();
  const lowStockProducts = getLowStockProducts(state, 5);

  return (
    <div id="stock-status" className="text-sm text-gray-500 mt-2">
      {lowStockProducts?.map((item) => (
        <React.Fragment key={item.id}>
          {item.name}: {item.quantity > 0 ? `재고 부족 (${item.quantity}개 남음)` : "품절"}{" "}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StockStatus;
