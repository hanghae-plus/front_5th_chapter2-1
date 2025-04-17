// 장바구니 관련 비즈니스 로직
import { findProductById } from '../components/product.js';
import { createCartItemElement } from '../components/cart.js';
import { calcDiscountRate } from './discount-service.js';

/*
* 장바구니 계산 함수
* */
export function calcCart(cartList, products) {
  let totalAmount = 0;
  let totalItemCount = 0;
  let subtotal = 0;

  // 장바구니 아이템 순회
  Array.from(cartList.children).forEach(cartItem => {
    const product = findProductById(cartItem.id, products);
    if (!product) return;

    const quantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]);
    const itemTotal = product.price * quantity;

    totalItemCount += quantity;
    subtotal += itemTotal;
  });

  // 할인율과 최종 금액 계산
  const { finalAmount, discountRate } = calcDiscountRate(
    cartList,
    products,
    subtotal,
    totalItemCount
  );

  totalAmount = finalAmount;

  return {
    totalAmount,
    totalItemCount,
    subtotal,
    discountRate
  };
}

/*
* 장바구니에 상품 추가 함수
* */
export function addProductToCart(selectedProductId, cartList, products) {
  const product = findProductById(selectedProductId, products);

  if (!product || product.stock <= 0) return null;

  // 이미 장바구니에 있는 경우 수량 증가
  const existingItem = document.getElementById(product.id);

  if (existingItem) {
    const currQuantity = parseInt(existingItem.querySelector('span').textContent.split('x ')[1]);
    const newQuantity = currQuantity + 1;

    if (newQuantity <= product.stock + currQuantity) {
      existingItem.querySelector('span').textContent = `${product.name} - ${product.price}원 x ${newQuantity}`;
      product.stock--;
    } else {
      alert('재고가 부족합니다.');
      return null;
    }
  } else {
    // 새 아이템 추가
    const newItem = createCartItemElement(product);
    cartList.appendChild(newItem);
    product.stock--;
  }

  return selectedProductId;
}

/*
* 수량 변경 처리 함수
* */
export function changeQuantity(productId, changeAmount, cartList, products) {
  const itemElement = document.getElementById(productId);
  const product = findProductById(productId, products);

  if (!itemElement || !product) return false;

  const currQuantity = parseInt(itemElement.querySelector('span').textContent.split('x ')[1]);
  const newQuantity = currQuantity + changeAmount;

  // 수량이 0 이하면 아이템 제거
  if (newQuantity <= 0) {
    return removeCartItem(productId, cartList, products);
  }

  // 재고 확인
  if (changeAmount > 0 && newQuantity > currQuantity + product.stock) {
    alert('재고가 부족합니다.');
    return false;
  }

  // 수량 업데이트
  itemElement.querySelector('span').textContent =
    `${itemElement.querySelector('span').textContent.split('x ')[0]}x ${newQuantity}`;

  // 재고 업데이트
  product.stock -= changeAmount;

  return true;
}

/*
* 장바구니에서 상품 제거 함수
* */
export function removeCartItem(productId, cartList, products) {
  const itemElement = document.getElementById(productId);
  const product = findProductById(productId, products);

  if (!itemElement || !product) return false;

  // 현재 수량 확인
  const currQuantity = parseInt(itemElement.querySelector('span').textContent.split('x ')[1]);

  // 재고 복구
  product.stock += currQuantity;

  // 아이템 제거
  itemElement.remove();

  return true;
}