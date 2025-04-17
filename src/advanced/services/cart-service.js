import { getState, setState } from '../store/index.js';
import {
  calculateTotalAmount,
  calculateCartQuantity,
} from './cart-calculate.js';

/**
 * 장바구니 상품 증가
 * @param {string} productId 상품 ID
 * @returns {void}
 */
const increaseCartItem = (productId) => {
  const products = [...getState().products];
  const cartList = [...getState().cartList];

  const product = products.find(({ id }) => id === productId);
  const cartProduct = cartList.find(({ id }) => id === productId);

  if (!product || product.stock < 1) {
    alert('재고가 부족합니다.');
    return;
  }

  product.stock--;
  if (cartProduct) {
    // 장바구니 상품이 있으면 장바구니 상품 수량 증가
    cartProduct.quantity++;
  } else {
    // 장바구니 상품이 없으면 장바구니 상품 추가
    cartList.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  setState('products', products);
  setState('cartList', cartList);

  // 총액 및 할인 계산
  const { totalAmount, discountRate, points } = calculateTotalAmount(
    products,
    cartList,
  );
  setState('totalAmount', totalAmount);
  setState('discountRate', discountRate);
  setState('points', points);
};

/**
 * 장바구니 상품 추가
 * @returns {void}
 */
const handleClickAdd = () => {
  const productId = document.querySelector('#product-select').value;
  increaseCartItem(productId);
};

/**
 * 장바구니 상품 증가
 * @param {Event} event 이벤트 객체
 * @returns {void}
 */
const handleClickIncrease = (productId) => {
  increaseCartItem(productId);
};

/**
 * 장바구니 상품 감소
 * @param {Event} event 이벤트 객체
 * @returns {void}
 */
const handleClickDecrease = (productId) => {
  const products = [...getState().products];
  const cartList = [...getState().cartList];

  const product = products.find(({ id }) => id === productId);
  const cartProduct = cartList.find(({ id }) => id === productId);

  if (!product || !cartProduct) return;

  const { success, quantity, isRemove } = calculateCartQuantity(
    cartProduct.quantity,
    -1,
    cartProduct.quantity + product.stock,
  );

  if (!success) {
    alert('재고가 부족합니다.');
    return;
  }

  product.stock++;

  if (isRemove) {
    // 수량이 0이면 삭제
    const filteredCartList = cartList.filter(({ id }) => id !== productId);
    setState('cartList', filteredCartList);
  } else {
    // 수량 감소
    cartProduct.quantity = quantity;
    setState('cartList', cartList);
  }

  setState('products', products);

  // 총액 및 할인 계산
  const { totalAmount, discountRate, points } = calculateTotalAmount(
    products,
    cartList,
  );
  setState('totalAmount', totalAmount);
  setState('discountRate', discountRate);
  setState('points', points);
};

/**
 * 장바구니 상품 삭제
 * @param {Event} event 이벤트 객체
 * @returns {void}
 */
const handleClickRemove = (productId) => {
  const products = [...getState().products];
  const cartList = [...getState().cartList];

  const product = products.find(({ id }) => id === productId);
  const cartProduct = cartList.find(({ id }) => id === productId);

  if (!product || !cartProduct) return;

  // 재고 복구
  product.stock += cartProduct.quantity;

  // 장바구니에서 제거
  const filteredCartList = cartList.filter(({ id }) => id !== productId);

  setState('cartList', filteredCartList);
  setState('products', products);

  // 총액 및 할인 계산
  const { totalAmount, discountRate, points } = calculateTotalAmount(
    products,
    filteredCartList,
  );
  setState('totalAmount', totalAmount);
  setState('discountRate', discountRate);
  setState('points', points);
};

export {
  handleClickAdd,
  handleClickIncrease,
  handleClickDecrease,
  handleClickRemove,
};
