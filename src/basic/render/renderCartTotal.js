import { CartTotal, StockStatus } from "@/basic/components";
import { $ } from "@/basic/lib";
import { calculateCart } from "@/basic/logic/calculateCart";

/**
 * [Render] 재고 부족 랜더 함수
 * 장바구니 총액 계산 이후 재고 부족 상품 경고 랜더링
 *
 * - 장바구니 총액 계산 이후 재고 부족 표기
 * - TODO 사용하는 함수가 renderCalculateCart만 있음
 *   - 로직상으로도 총액 계산 이후에만 동작하여 통합도 고려
 *
 * @see products - 상품 정보 배열
 */
const renderStockStatus = (products) => {
  const $stockStatus = $("#stock-status");
  if (!$stockStatus) return;
  $stockStatus.innerHTML = "";
  $stockStatus.appendChild(StockStatus(products));
};

/**
 * [Render] 총액 및 할인율 랜더 함수
 *
 * @see products - 상품 정보 배열
 * @fires renderStockInfo
 */
export const renderCartTotal = (products) => {
  const $cartTotal = $("#cart-total");
  const $cartItems = $("#cart-items");
  const { totalCost, discountRate } = calculateCart(
    products,
    $cartItems.children,
  );
  // 총액 및 할인 랜더링
  $cartTotal.innerHTML = "";
  $cartTotal.appendChild(CartTotal(totalCost, discountRate));

  renderStockStatus(products);
};
