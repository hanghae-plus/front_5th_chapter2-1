import ProductModel from '../sel/Sel.Model.js';

// 상품 장바구니 담기
export function increaseCartItem(productId, amount = 1) {
  return ProductModel.decreaseQuantity(productId, amount);
}

// 상품 장바구니 빼기
export function decreaseCartItem(productId, amount = 1) {
  return ProductModel.increaseQuantity(productId, amount);
}

// 상품 정보 가져오기
export function getProductInfo(productId) {
  return ProductModel.findList(productId);
}

// 마지막 선택한 상품정보 기억하기
export function setLastSelectedItem(productId) {
  ProductModel.setLastSelectedItem(productId);
}
