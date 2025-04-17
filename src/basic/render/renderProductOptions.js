import { ProductOptions } from "@/basic/components";
import { $ } from "@/basic/lib";

/**
 * [Render] 상품 선택(select) 요소의 옵션 목록을 **PRODUCT_LIST**에 따라 랜더링
 * 할인 상품이 생겼을 때 갱신 후 랜더링
 *
 * - 기존 옵션을 모두 제거
 * - 상품 리스트를 기반으로 option 요소들을 생성
 * - DocumentFragment에 담아 한 번에 select 요소에 추가
 *
 * disabled 속성은 품절 여부(quantity === 0)에 따라 설정
 *
 * @see products - 상품 데이터 배열
 */
export const renderProductOptions = (products) => {
  const $productSelect = $("#product-select");
  if (!$productSelect) return;
  $productSelect.innerHTML = "";
  $productSelect.appendChild(ProductOptions(products));
};
