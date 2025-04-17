// 할인이 적용된 총액
let total = 0;
// 할인이 적용되지 않은 총액
let originTotal = 0;
// 총 구매한 상품의 개수
let itemCnt = 0;
// 최종 할인율
let discountRate = 0;
// 포인트
let bonusPts = 0;

export function setTotal(val) {
  total = val;
}
export function setOriginTotal(val) {
  originTotal = val;
}
export function setItemCnt(val) {
  itemCnt = val;
}
export function setDiscountRate(val) {
  discountRate = val;
}
export function setBonusPts(val) {
  bonusPts = val;
}
export function getCartTotal() {
  return total;
}
export function getOriginTotal() {
  return originTotal;
}
export function getItemCnt() {
  return itemCnt;
}
export function getTotalDiscountRate() {
  return discountRate;
}
