import { getState, setState } from '../store/index.js';
import { cartCalculate } from './cart-calculate.js';

/**
 * 장바구니 상품 증가
 * @param {string} productId 상품 ID
 * @returns {void}
 */
const increaseCartItem = (productId) => {
  const products = getState().products;
  const cartList = getState().cartList;

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

  setState('products', [...products]);
  setState('cartList', [...cartList]);

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
 * @param {string} productId 상품 ID
 * @returns {void}
 */
const handleClickIncrease = (productId) => {
  increaseCartItem(productId);
};

/**
 * 장바구니 상품 감소
 * @param {string} productId 상품 ID
 * @returns {void}
 */
const handleClickDecrease = (productId) => {
  const products = getState().products;
  const cartList = getState().cartList;

  const product = products.find(({ id }) => id === productId);
  const cartProduct = cartList.find(({ id }) => id === productId);

  cartProduct.quantity--;
  product.stock++;

  if (cartProduct.quantity === 0) {
    const filteredCartList = cartList.filter(({ id }) => id !== productId);
    setState('cartList', filteredCartList);
  } else {
    setState('cartList', [...cartList]);
  }

  setState('products', [...products]);

  cartCalculate();
};

/**
 * 장바구니 상품 삭제
 * @param {string} productId 상품 ID
 * @returns {void}
 */
const handleClickRemove = (productId) => {
  const products = getState().products;
  const cartList = getState().cartList;

  const product = products.find(({ id }) => id === productId);
  const cartProduct = cartList.find(({ id }) => id === productId);

  product.stock += cartProduct.quantity;

  const filteredCartList = cartList.filter(({ id }) => id !== productId);
  setState('cartList', filteredCartList);

  setState('products', [...products]);

  cartCalculate();
};

export {
  handleClickAdd,
  handleClickIncrease,
  handleClickDecrease,
  handleClickRemove,
};
