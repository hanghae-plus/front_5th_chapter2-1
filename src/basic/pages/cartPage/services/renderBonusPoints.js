export const renderBonusPoints = ({ bonusPoints, totalAmount }, pointsPerAmount = 1000) => {
  bonusPoints = Math.floor(totalAmount / pointsPerAmount);

  const cartTotalElement = document.getElementById('cart-total');

  let loyaltyPointsElement = document.getElementById('loyalty-points');

  if (!loyaltyPointsElement) {
    loyaltyPointsElement = document.createElement('span');
    loyaltyPointsElement.id = 'loyalty-points';
    loyaltyPointsElement.className = 'text-blue-500 ml-2';

    cartTotalElement.appendChild(loyaltyPointsElement);
  }

  // 습관: 템플릿 리터럴을 사용한다.
  const message = `(포인트: ${bonusPoints})`;
  loyaltyPointsElement.textContent = message;
};
