import type { GlobalState } from "../../types";

export const setSuggestSaleEvent = (state: GlobalState) => {
  // lastSel: 마지막 선택한 제품 아이디 (전역 또는 App 내부 변수라고 가정)
  const productList = state.productList;
  const lastSelectedProduct = state.lastSelectedProduct;

  if (lastSelectedProduct) {
    // 마지막 선택과 다른 상품 중 재고가 남은 상품을 추천
    const suggestedProduct = productList.find((item) => item.id !== lastSelectedProduct.id && item.count > 0);
    if (suggestedProduct) {
      alert(`${suggestedProduct.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
      // 5% 할인 적용
      suggestedProduct.price = Math.round(suggestedProduct.price * 0.95);
      const updatedProductList = productList.map((product) =>
        product.id === suggestedProduct.id ? suggestedProduct : product,
      );
      return updatedProductList;
    }
  }
  return productList;
};
