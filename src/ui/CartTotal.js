import { cartState } from '../store/cartState';

// 장바구니 총액 표시 컴포넌트
const cartResult = () => {
  // 요소 생성
  const resultEl = document.createElement('div');
  resultEl.id = 'cart-total';
  resultEl.className = 'text-xl font-bold my-4';

  // 렌더링 함수
  const render = (targetEl) => {
    targetEl.appendChild(resultEl);
  };

  /**
   * @desc 총액 업데이트 함수
   * @param {*} totalAmount
   * @param {*} discountRate
   */
  const updateTotal = (totalAmount, discountRate = 0) => {
    resultEl.textContent = `총액: ${Math.round(totalAmount)}원`; // 초기화

    // 할인율이 있으면 표시
    if (discountRate > 0) {
      // 할인율 엘리먼트 생성
      const discountSpan = document.createElement('span');
      discountSpan.className = 'text-green-500 ml-2';
      discountSpan.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;

      resultEl.appendChild(discountSpan);
    }
  };

  /**
   * @desc 보너스 포인트 표시 함수
   * @param {*} bonusPoint
   */
  const updateBonusPoints = () => {
    const getBonusPoints = cartState.getBonusPoints;
    let pointsTag = document.getElementById('loyalty-points');

    //
    if (!pointsTag) {
      pointsTag = document.createElement('span');
      pointsTag.id = 'loyalty-points';
      pointsTag.className = 'text-blue-500 ml-2';
      resultEl.appendChild(pointsTag);
    }

    //
    pointsTag.textContent = `(포인트: ${getBonusPoints()})`;
  };

  return {
    element: resultEl,
    render,
    updateTotal,
    updateBonusPoints,
  };
};

export { cartResult };
