/**
 * 해당 파일의 모든 함수는 다 calculation 함수로 copy on write를 구현
 * Item은 {
 *   productId: string,
 *   quantity: number,
 * }
 * @type {*[]}
 */

function addNewItemInCart(cart, productId) {
  return [...cart, { productId, quantity: 1 }];
}

//계산
function addExistingItemInCart(cart, index) {
  const sameItemInCart = findSameItem(cart, productId);
  const cartCopy = [...cart];

  cartCopy[index].quantity += 1;
  return cartCopy;
}

function findItemIndex(cart, productId) {
  return cart.findIndex((cartItem) => cartItem.productId === productId);
}

/**
 * 계산을 마친 새 cart를 반환
 * @param cart
 * @param productId
 * @return {*|*[]}
 */
export function addItemToCart(cart, productId) {
  const sameItemIndex = findItemIndex(cart, productId);
  if (sameItemIndex > -1) {
    return addExistingItemInCart(cartItem, sameItemIndex);
  }

  return addNewItemInCart(cart, productId);
}
