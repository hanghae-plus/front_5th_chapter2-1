export function suggestProduct(
  products,
  lastSelectedItem,
  select,
  updateSelectOptions,
  additionalDiscountRate = 0.05
) {
  if (lastSelectedItem) {
    const suggestItem = products.find((item) => {
      return item.id !== lastSelectedItem && item.stock > 0;
    });

    if (suggestItem) {
      const message = `${suggestItem.name}은(는) 어떠세요? 지금 구매하시면 ${additionalDiscountRate * 100}% 추가 할인!`;
      alert(message);

      suggestItem.price = Math.round(suggestItem.price * (1 - additionalDiscountRate));

      updateSelectOptions(products, select);
    }
  }
}
