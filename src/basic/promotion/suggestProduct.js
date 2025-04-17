export const suggestProduct = (
  lastSelectedItem,
  products,
  interval = 60000,
  delay = Math.random() * 20000
) => {
  setTimeout(() => {
    setInterval(() => {
      if (lastSelectedItem) {
        const suggest = products.find(item => {
          return item.id !== lastSelectedItem && item.quantity > 0;
        });

        if (suggest) {
          alert(
            `${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`
          );

          suggest.price = Math.round(suggest.price * 0.95);

          updateProductOptions(lastSelectedItem, products);
        }
      }
    }, interval);
  }, delay);
};
