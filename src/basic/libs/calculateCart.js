import { renderBonusPoints, updateStockInfo } from ".";
import { createElement } from "./utils/createElement";

const discountMap = {
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
  p4: 0.05,
  p5: 0.25,
};

const BULK_DISCOUNT_RATE = 0.25;
const PRODUCT_DISCOUNT_RATE = 0.1;

/**
 * 장바구니 계산
 *
 * @param {HTMLElement} $cartDisplay - 장바구니 요소
 * @param {Product[]} products - 상품 목록
 */
const calculateCartTotals = ($cartDisplay, products) => {
  const cartProducts = $cartDisplay.children;

  let totalPrice = 0;
  let subTotal = 0;
  let productCount = 0;

  for (let i = 0; i < cartProducts.length; i++) {
    const curItem = products.find((product) => product.id === cartProducts[i].id);

    const stock = parseInt(cartProducts[i].querySelector("span").textContent.split("x ")[1]);
    const productTotal = curItem.price * stock;
    let discount = 0;

    productCount += stock;
    subTotal += productTotal;

    if (stock >= 10) {
      discount = discountMap[curItem.id];
    }

    totalPrice += productTotal * (1 - discount);
  }

  return { totalPrice, subTotal, productCount };
};

/**
 * 할인 비율 계산
 *
 * @param {number} totalPrice - 총 금액
 * @param {number} subTotal - 총 금액
 * @param {number} productCount - 상품 개수
 * @returns {number} 할인 비율
 */
const getDiscountRate = (totalPrice, subTotal, productCount) => {
  let discountRate = 0;
  const bulkDiscount = totalPrice * BULK_DISCOUNT_RATE;
  const productDiscount = subTotal - totalPrice;

  if (productCount >= 30 && bulkDiscount > productDiscount) {
    totalPrice = subTotal * (1 - BULK_DISCOUNT_RATE);
    discountRate = BULK_DISCOUNT_RATE;
  } else {
    discountRate = productDiscount / subTotal;
  }

  if (new Date().getDay() === 2) {
    totalPrice *= 1 - PRODUCT_DISCOUNT_RATE;
    discountRate = Math.max(discountRate, PRODUCT_DISCOUNT_RATE);
  }

  return discountRate;
};

/**
 * 장바구니 계산
 *
 * @param {HTMLElement} $cartDisplay - 장바구니 요소
 * @param {HTMLElement} $sum - 총 금액 요소
 * @param {HTMLElement} $stockInfo - 재고 정보 요소
 * @param {Product[]} products - 상품 목록
 */
export const calculateCart = ($cartDisplay, $sum, $stockInfo, products) => {
  // TODO: totalPrice이 getDiscountRate()에서 변하는데 괜찮은지 확인 ( 테스트 코드는 통과함 )
  const { totalPrice, subTotal, productCount } = calculateCartTotals($cartDisplay, products);
  const discountRate = getDiscountRate(totalPrice, subTotal, productCount);

  $sum.textContent = "총액: " + Math.round(totalPrice) + "원";

  if (discountRate > 0) {
    const $discountInfo = createElement(
      "span",
      {
        class: "text-green-500 ml-2",
      },
      `(${(discountRate * 100).toFixed(1)}% 할인 적용)`,
    );
    $sum.appendChild($discountInfo);
  }

  updateStockInfo($stockInfo, products);
  renderBonusPoints($sum, totalPrice);
};
