export const TotalAmount = ({ totalPrice = 0, discountRate = 0, bonusPoints = 0 }) => {
  return `
    <div id="cart-total" class="text-xl font-bold my-4">
      총액: ${totalPrice}원

      ${discountRate ? `<span class="text-green-500 ml-2">(${discountRate.toFixed(1)}% 할인 적용)</span>` : ''}

      <span id="loyalty-points" class="text-blue-500 ml-2">
        (포인트: ${bonusPoints})
      </span>
    </div>
  `;
};
