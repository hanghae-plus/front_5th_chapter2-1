/**
 * 해당 파일의 모든 함수는 다 calculation 함수로 copy on write를 구현
 * updateCart, getCart 만 action 으로 사용한다
 * Item은 {
 *   productId: string,
 *   quantity: number,
 * }
 * @type {*[]}
 */
export type CartItem = {
  productId: string;
  quantity: number;
};
export type Cart = CartItem[];
let cart: Cart = [];
export function updateCart(newCart: Cart) {
  cart = newCart;
}
export function getCart() {
  return cart;
}
export function addNewItemInCart(cart: Cart, productId: string) {
  return [...cart, { productId, quantity: 1 }];
}

//계산
export function addExistingItemInCart(cart: Cart, productId: string) {
  const index = findItemIndex(cart, productId);
  const cartCopy = [...cart];

  cartCopy[index].quantity += 1;
  console.log('장바구니 new quantity ', productId, cartCopy[index].quantity);
  return cartCopy;
}

export function findItemIndex(cart: Cart, productId: string) {
  return cart.findIndex((cartItem) => cartItem.productId === productId);
}

/**
 * 계산을 마친 새 cart를 반환
 * @param cart
 * @param productId
 * @return {*|*[]}
 */
export function addItemToCart(cart: Cart, productId: string) {
  const hasSameItem = hasSameItemInCart(cart, productId);
  if (hasSameItem) {
    return addExistingItemInCart(cart, productId);
  }

  return addNewItemInCart(cart, productId);
}
export function hasSameItemInCart(cart: Cart, productId: string) {
  return findItemIndex(cart, productId) > -1;
}
