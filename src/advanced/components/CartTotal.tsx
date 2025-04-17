interface CartTotalProps {
  totalPrice: number;
  discountRate: number;
  bonusPoints: number;
}

const CartTotal = ({ totalPrice, discountRate, bonusPoints }: CartTotalProps) => {
  return (
    <div className="text-xl font-bold my-4">
      총액: {Math.round(totalPrice).toLocaleString()}원
      {discountRate > 0 && (
        <span className="text-green-500 ml-2">({(discountRate * 100).toFixed(1)}% 할인 적용)</span>
      )}
      <span className="text-gray-500 ml-2">(포인트: {bonusPoints})</span>
    </div>
  );
};

export default CartTotal;
