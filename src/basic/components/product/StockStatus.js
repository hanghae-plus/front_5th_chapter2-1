import { createElement } from "../../utils/createDom";
import { stores } from "../../stores";

const StockStatus = () => {
  const container = createElement("div", {
    className: "text-sm text-gray-500 mt-2",
    id: "stock-status",
  });

  const updateStatus = () => {
    const { productList } = stores.product.getState();
    let stockMessage = "";

    productList.forEach((product) => {
      if (product.stock < 5) {
        stockMessage += `${product.name}: ${product.stock > 0 ? `재고 부족 (${product.stock}개 남음)` : "품절"}\n`;
      }
    });

    container.textContent = stockMessage;
  };

  updateStatus();
  stores.product.subscribe(updateStatus);

  return container;
};

export default StockStatus;
