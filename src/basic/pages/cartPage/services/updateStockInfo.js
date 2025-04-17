export const updateStockInfo = (products, lowStockThreshold = 5) => {
  let message = '';

  products.forEach((item) => {
    if (item.stock < lowStockThreshold) {
      message += `${item.name}: ${item.stock > 0 ? `재고 부족 (${item.stock}개 남음)` : '품절'}`;
    }
  });

  const stockInfo = document.getElementById('stock-status');
  stockInfo.textContent = message;
};
