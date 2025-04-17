import { productStore } from "../../stores";

const getProductStockMessage = (product) => {
  const isOutOfStock = product.quantity <= 0;
  const stockMessage = isOutOfStock ? "품절" : `재고 부족 (${product.quantity}개 남음)`;

  return `${product.name}: ${stockMessage}\n`;
};

const generateStockInfoMessage = (productList) => {
  let message = "";

  for (const product of productList) {
    if (product.quantity < 5) {
      message += getProductStockMessage(product);
    }
  }

  return message;
};

export const renderStockStatus = (element) => {
  const { productList } = productStore.state;

  const infoMessage = generateStockInfoMessage(productList);

  element.textContent = infoMessage;
};
