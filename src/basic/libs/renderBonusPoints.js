import { createElement } from "./utils/createElement";

/**
 * 보너스 포인트 렌더링
 *
 * @param {HTMLElement} $sum - 총 금액을 표시하는 요소
 * @param {number} totalPrice - 총 금액
 *
 * @example
 * renderBonusPoints($sum, totalPrice);
 */
export const renderBonusPoints = ($sum, totalPrice) => {
  let $pointsTag = document.getElementById("loyalty-points");

  if (!$pointsTag) {
    $pointsTag = createElement("span", {
      id: "loyalty-points",
      class: "text-blue-500 ml-2",
    });
    $sum.appendChild($pointsTag);
  }

  const bonusPoints = Math.floor(totalPrice / 1000);
  $pointsTag.textContent = `(포인트: ${bonusPoints})`;
};
