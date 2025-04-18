import { stores } from "../stores";

export const setupPromotions = () => {
  // 번개세일
  setTimeout(() => {
    setInterval(() => {
      const { productList } = stores.product.getState();
      const luckyItem = productList[Math.floor(Math.random() * productList.length)];

      if (Math.random() < 0.3 && luckyItem.stock > 0) {
        const updated = { ...luckyItem, price: Math.round(luckyItem.price * 0.8) };
        stores.product.actions.updateProduct(luckyItem.id, updated);

        alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
      }
    }, 30000);
  }, Math.random() * 10000);

  // 추천 할인
  setTimeout(() => {
    setInterval(() => {
      const { productList } = stores.product.getState();
      const lastSelectedProductId = stores.product.getState().lastSelectedProduct;

      if (lastSelectedProductId) {
        const suggestedProduct = productList.find(
          (product) => product.id !== lastSelectedProductId && product.stock > 0
        );

        if (suggestedProduct) {
          const updated = { ...suggestedProduct, price: Math.round(suggestedProduct.price * 0.95) };
          stores.product.actions.updateProduct(suggestedProduct.id, updated);

          alert(`${suggestedProduct.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
        }
      }
    }, 60000);
  }, Math.random() * 20000);
};
