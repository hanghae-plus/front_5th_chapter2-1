import $cartTotal from '../components/CartTotal';

const currentPoint = (totalPrice) => {
  return Math.floor(totalPrice.get() / 1000);
};
const createPointElement = () => {
  const $point = document.createElement('span');
  $point.id = 'loyalty-points';
  $point.className = 'text-blue-500 ml-2';
  $cartTotal.appendChild($point);
  return $point;
};

const updatePointElement = ($point, point) => {
  $point.textContent = '(포인트: ' + point + ')';
  return $point;
};
/**보너스포인터를 계산합니다.*/
const updatePoint = (totalPrice) => {
  const point = currentPoint(totalPrice);
  let $point = document.getElementById('loyalty-points');

  if (!$point) {
    $point = createPointElement($point);
  }
  updatePointElement($point, point);
};

export default updatePoint;
