import { $sum } from '../components/getElements';

/**보너스포인터를 계산합니다.*/
const updatePoint = (totalPrice) => {
  const point = Math.floor(totalPrice.get() / 1000);
  let $point = document.getElementById('loyalty-points');

  if (!$point) {
    $point = document.createElement('span');
    $point.id = 'loyalty-points';
    $point.className = 'text-blue-500 ml-2';
    $sum.appendChild($point);
  }

  $point.textContent = '(포인트: ' + point + ')';
};

export default updatePoint;
