import React from 'react';

const CartResult = () => {
  // totalAmount

  const totalAmount = 0; // TODO: 총액가져오기 필요
  const discountRate = 0; // TODO: 할인율
  const isDiscount = discountRate > 0;
  const bonusPoint = 0; // TODO: 보너스 포인트

  return (
    <div id="cart-total" className="text-xl font-bold my-4">
      총액: ${Math.round(totalAmount)}원
      {isDiscount && (
        <span className="text-green-500 ml-2">({(discountRate * 100).toFixed(1)}% 할인 적용)</span>
      )}
      <span className="text-blue-500 ml-2" id="loyalty-points">
        (포인트: {bonusPoint})
      </span>
    </div>
  );
};

export default CartResult;

//  /**
//    * @desc 총액 업데이트 함수
//    * @param {*} totalAmount
//    * @param {*} discountRate
//    */
//  const updateTotal = (totalAmount, discountRate = 0) => {
//   resultEl.textContent = `총액: ${Math.round(totalAmount)}원`; // 초기화

//   // 할인율이 있으면 표시
//   if (discountRate > 0) {
//     // 할인율 엘리먼트 생성
//     const discountSpan = document.createElement('span');
//     discountSpan.className = 'text-green-500 ml-2';
//     discountSpan.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;

//     resultEl.appendChild(discountSpan);
//   }
// };

// /**
//  * @desc 보너스 포인트 표시 함수
//  * @param {*} bonusPoint
//  */
// const updateBonusPoints = () => {
//   const getBonusPoints = cartState.getBonusPoints;
//   let pointsTag = document.getElementById('loyalty-points');

//   //
//   if (!pointsTag) {
//     pointsTag = document.createElement('span');
//     pointsTag.id = 'loyalty-points';
//     pointsTag.className = 'text-blue-500 ml-2';
//     resultEl.appendChild(pointsTag);
//   }

//   //
//   pointsTag.textContent = `(포인트: ${getBonusPoints()})`;
// };
