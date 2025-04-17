import { PointTag } from '../../component';

/**
 * 총 금액에 따른 포인트를 계산하여 화면에 표시합니다.
 * 총 금액을 기준으로 포인트를 계산하고, 포인트 표시용 요소가 없으면 새로 생성하여 추가합니다.
 * 포인트는 총 금액을 1000으로 나눈 값의 정수 부분으로 계산됩니다.
 *
 * @param {HTMLElement} $cartTotal - 총 금액을 표시하는 HTML 요소
 * @param {number} totalAmount - 현재 장바구니의 총 금액
 */

export const renderRewardPoints = ($cartTotal, totalAmount) => {
  const rewardPoints = Math.floor(totalAmount / 1000);
  let $pointTag = document.getElementById('loyalty-points');

  if (!$pointTag) {
    $pointTag = PointTag();
    $cartTotal.appendChild($pointTag);
  }
  $pointTag.textContent = `(포인트: ${rewardPoints})`;
};
