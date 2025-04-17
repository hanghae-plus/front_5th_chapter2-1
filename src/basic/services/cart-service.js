import { state } from '../store/index.js';
import { cartCalculate } from './cart-calculate.js';

/**
 * 장바구니 상품 증가
 * @param {string} productId 상품 ID
 * @returns {void}
 */
const increaseCartItem = (productId) => {
  const products = state.products;
  const cartList = state.cartList;

  const product = products.find(({ id }) => id === productId);
  const cartProduct = cartList.find(({ id }) => id === productId);

  if (!product || product.stock < 1) {
    alert('재고가 부족합니다.');
    return;
  }

  product.stock--;
  if (cartProduct) {
    // 장바구니 상품이 있으면 장바구니 상품 수량 증가
    cartProduct.price += product.price;
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

  state.set('products', [...products]);
  state.set('cartList', [...cartList]);

  cartCalculate();
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
const handleClickIncrease = (event) => {
  const productId = event.target.dataset.productId;
  increaseCartItem(productId);
  console.log(state.products);
};

/**
 * 장바구니 상품 감소
 * @param {Event} event 이벤트 객체
 * @returns {void}
 */
const handleClickDecrease = (event) => {
  const products = state.products;
  const cartList = state.cartList;

  const productId = event.target.dataset.productId;
  const product = products.find(({ id }) => id === productId);
  const cartProduct = cartList.find(({ id }) => id === productId);

  cartProduct.quantity--;
  product.stock++;

  if (cartProduct.quantity === 0) {
    // 장바구니 상품이 0개면 장바구니에서 제거
    const filteredCartList = cartList.filter(({ id }) => id !== productId);
    state.set('cartList', filteredCartList);
  } else {
    // 장바구니 상품이 0개가 아니면 장바구니 상품 수량 감소
    state.set('cartList', [...cartList]);
  }

  // 상품 상태 업데이트
  state.set('products', [...products]);

  // 장바구니 총액 계산
  cartCalculate();
};

/**
 * 장바구니 상품 삭제
 * @param {Event} event 이벤트 객체
 * @returns {void}
 */
const handleClickRemove = (event) => {
  const products = state.products;
  const cartList = state.cartList;

  const productId = event.target.dataset.productId;
  const product = products.find(({ id }) => id === productId);
  const cartProduct = cartList.find(({ id }) => id === productId);

  // 상품 재고 증가
  product.stock += cartProduct.quantity;

  // 장바구니 상품 제거
  const filteredCartList = cartList.filter(({ id }) => id !== productId);
  state.set('cartList', filteredCartList);

  // 상품 상태 업데이트
  state.set('products', [...products]);

  // 장바구니 총액 계산
  cartCalculate();
};

export {
  handleClickAdd,
  handleClickIncrease,
  handleClickDecrease,
  handleClickRemove,
};
