export interface CartTotalProps {
  totalPrice: number;
  discountRate: number;
  bonusPoints: number;
}

export const CartTotal = ({ totalPrice, discountRate, bonusPoints }: CartTotalProps) => {
  return (
    <div>
      <div className="cart-total">
        <span>총액: {Math.round(totalPrice)}원</span>
        {discountRate > 0 && (
          <span className="text-green-500 ml-2">
            ({(discountRate * 100).toFixed(1)}% 할인 적용)
          </span>
        )}
        <span className="text-blue-500 ml-2">(포인트: {bonusPoints})</span>
      </div>
    </div>
  );
};
