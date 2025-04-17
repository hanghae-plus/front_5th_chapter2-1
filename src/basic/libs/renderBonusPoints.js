import store from "#basic/libs/store";
import { createElement } from "#basic/libs/utils";

/**
 * 보너스 포인트 렌더링
 * @param {number} totalPrice - 총 금액
 */
export const renderBonusPoints = (totalPrice) => {
  const { $sum } = store.elements;

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
