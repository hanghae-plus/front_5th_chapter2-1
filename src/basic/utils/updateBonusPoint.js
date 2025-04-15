import { $sum } from '../createElements';

/**보너스포인터를 계산합니다.*/
const updateBonusPoint = (totalPrice) => {
  let currentTotalPrice = totalPrice.get();

  const bonusPoint = Math.floor(currentTotalPrice / 1000); //보너스포인트 계산
  let bonusPointElement = document.getElementById('loyalty-points'); //보너스포인트의 elem을 생성

  if (!bonusPointElement) {
    bonusPointElement = document.createElement('span');
    bonusPointElement.id = 'loyalty-points';
    bonusPointElement.className = 'text-blue-500 ml-2';
    $sum.appendChild(bonusPointElement);
  }

  bonusPointElement.textContent = '(포인트: ' + bonusPoint + ')';
};

export default updateBonusPoint;
