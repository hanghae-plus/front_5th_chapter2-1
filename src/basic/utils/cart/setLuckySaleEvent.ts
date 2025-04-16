import type { GlobalState } from "../../types";

export const setLuckySaleEvent = (state: GlobalState) => {
  // globalState.productList에서 임의의 상품 선택 (여기서는 count를 사용)
  const productList = state.productList;
  const luckyItem = productList[Math.floor(Math.random() * productList.length)];
  // 30% 확률 && 재고(count 혹은 q)가 남아있을 경우 할인 적용
  if (Math.random() < 0.3 && luckyItem.count > 0) {
    // 기존 가격(val, 혹은 price)를 20% 할인한 값으로 업데이트
    luckyItem.price = Math.round(luckyItem.price * 0.8);
    alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);

    const updatedProductList = productList.map((product) => (product.id === luckyItem.id ? luckyItem : product));
    return updatedProductList;
  }
  return productList;
};
