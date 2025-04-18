/**
 * 상품 목록 배열을 얕은 복사하여 새로운 배열을 반환한다.
 * 각 상품 객체는 개별적으로 복사되며, 원본 객체와의 참조를 끊는다.
 *
 * @param {Array<{ id: string, name: string, val: number, q: number }>} products - 복사할 상품 배열
 * @returns {Array<{ id: string, name: string, val: number, q: number }>} - 복사된 상품 배열
 */

export const cloneProducts = (products) => {
  return products.map((p) => ({ ...p }));
};
