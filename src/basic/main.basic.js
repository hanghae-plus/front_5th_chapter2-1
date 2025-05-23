// lib
import { Container } from "@/basic/components";
import { $ } from "@/basic/lib";

// render
import { renderCartTotal, renderProductOptions } from "@/basic/render";

// setup
import { setListener } from "@/basic/setup/setListener";
import { setRandomDiscount } from "@/basic/setup/setRandomDiscount";

// data
const products = [
  { id: "p1", name: "상품1", cost: 10_000, quantity: 50, discount: 0.1 },
  { id: "p2", name: "상품2", cost: 20_000, quantity: 30, discount: 0.15 },
  { id: "p3", name: "상품3", cost: 30_000, quantity: 20, discount: 0.2 },
  { id: "p4", name: "상품4", cost: 15_000, quantity: 0, discount: 0.05 },
  { id: "p5", name: "상품5", cost: 25_000, quantity: 10, discount: 0.25 },
];

/**
 * [Main] 엘리먼트 생성 및 조립
 * 엘리먼트를 선언하여 컴포넌트를 조립하고, 초기값과 스케쥴링 함수 세팅
 *
 * - 컴포넌트 조립
 * - 엘리먼트 생성(id, class, textContent)
 *    - 상품 목록을 option으로 세팅
 * - 장바구니 초기값 세팅
 * - 스케쥴링 함수 호출
 * - 이벤트 핸들러 세팅
 *
 * @fires renderProductOptions
 * @fires renderCartTotal
 * @fires setRandomDiscount
 * @fires setListener
 */
const main = () => {
  // 전역 상수 선언 TODO store 구현
  globalThis.products = products;
  globalThis.lastSelected = undefined;

  // $app 컴포넌트 조립
  $("#app").appendChild(Container());

  // 초기 세팅 함수
  renderProductOptions(products);
  renderCartTotal(products);

  // setup 함수
  setRandomDiscount();
  setListener();
};

main();
