export const state = {
  productList: [],
  selected: null,
  currentBonusPoints: 0,
  currentTotalAmount: 0,
  currentItemCount: 0,
};

//초기값 세팅
export function initializeState() {
  state.productList = [
    { id: 'p1', name: '상품1', price: 10000, count: 50 },
    { id: 'p2', name: '상품2', price: 20000, count: 30 },
    { id: 'p3', name: '상품3', price: 30000, count: 20 },
    { id: 'p4', name: '상품4', price: 15000, count: 0 },
    { id: 'p5', name: '상품5', price: 25000, count: 10 },
  ];
}
