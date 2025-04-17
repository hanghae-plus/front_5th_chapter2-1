import { CartItem, Product } from "../../types/store-type";

const MIN_DISCOUNT_QUANTITY = 10;

const DISCOUNT_MAP: Record<string, number> = {
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
  p4: 0.05,
  p5: 0.25,
};

/**
 * 특정 상품 ID와 수량에 따라 할인율을 반환
 *
 * @param {string} currentItemId - 상품 ID
 * @param {number} quantity - 해당 상품의 수량
 * @returns {number} - 할인율 (0.1 = 10%)
 */

const getDiscountRate = (productId: string, quantity: number): number => {
  if (quantity < MIN_DISCOUNT_QUANTITY) return 0;
  return DISCOUNT_MAP[productId] || 0;
};

/**
 * 주어진 ID에 해당하는 상품 정보를 products 배열에서 찾아 반환
 *
 * @param {string} id - 찾고자 하는 상품 ID
 * @param {Array} products - 상품 목록
 * @returns {Object|undefined} - 일치하는 상품 객체 또는 undefined
 */

const findProductById = (id: string, products: Product[]): Product | undefined => {
  return products.find((product) => product.id === id);
};

/**
 * 장바구니 항목과 전체 상품 목록을 기반으로 총 금액, 수량, 할인 적용 금액을 계산
 */

export const calculateCartTotals = (cartItems: CartItem[], products: Product[]) => {
  let originalTotal = 0;
  let finalTotal = 0;
  let itemCount = 0;

  for (const cartItem of cartItems) {
    const currentItem = findProductById(cartItem.id, products);
    if (!currentItem) continue;

    const quantity = cartItem.quantity;
    const itemTotal = currentItem.val * quantity;
    const discountRate = getDiscountRate(cartItem.id, quantity);

    itemCount += quantity;
    originalTotal += itemTotal;
    finalTotal += itemTotal * (1 - discountRate);
  }

  return { originalTotal, finalTotal, itemCount };
};
