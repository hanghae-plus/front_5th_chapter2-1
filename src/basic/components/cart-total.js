import { state } from '../store';

const CartTotal = () => {
  const $cartTotal = Object.assign(document.createElement('div'), {
    id: 'cart-total',
    className: 'text-xl font-bold my-4',
  });

  const render = () => {
    const totalAmount = state.totalAmount;
    const discountRate = state.discountRate;
    const loyaltyPoints = Math.floor(totalAmount / 1000);

    $cartTotal.innerHTML = `총액: ${totalAmount}원${
      discountRate > 0
        ? `<span class="text-green-500 ml-2">(${(discountRate * 100).toFixed(1)}% 할인 적용)</span>`
        : ''
    }<span id="loyalty-points" class="text-blue-500 ml-2">(포인트: ${loyaltyPoints})</span></div>
  `;

    return $cartTotal;
  };

  render();

  // 상태 변경 구독
  state.subscribe('totalAmount', render);
  state.subscribe('discountRate', render);

  return $cartTotal;
};

export { CartTotal };
