export default function TotalAmount({
  totalPrice,
  discountRate,
  bonusPoints,
}: {
  totalPrice: number;
  discountRate: number;
  bonusPoints: number;
}) {
  return (
    <div id="cart-total" className="text-xl font-bold my-4">
      {`총액: ${totalPrice}원`}

      {discountRate ? (
        <span className="text-green-500 ml-2">{`(${discountRate.toFixed(1)}% 할인 적용)`}</span>
      ) : null}

      <span id="loyalty-points" className="text-blue-500 ml-2">
        {`(포인트: ${bonusPoints})`}
      </span>
    </div>
  );
}
