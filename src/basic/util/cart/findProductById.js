import { PRODUCTS } from '../../constant';

/**
 * 주어진 ID에 해당하는 제품을 PRODUCTS 목록에서 찾아 반환하는 함수
 *
 * @param {string} productId - 찾고자 하는 제품의 ID
 * @returns {object|undefined} - 일치하는 제품 객체 또는 찾지 못한 경우 undefined
 */

export function findProductById(productId) {
  return PRODUCTS.find((product) => product.id === productId);
}
