const renderStockInfo = (stockEl, products) => {
  const lowStockProducts = products.filter((product) => product.q < 5);

  stockEl.textContent = lowStockProducts
    .map(
      (product) =>
        `${product.name}: ${product.q > 0 ? `재고 부족 (${product.q}개 남음)` : "품절"}`,
    )
    .join("\n");
};
export default renderStockInfo;
