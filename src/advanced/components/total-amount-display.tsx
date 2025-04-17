export const TotalAmountDisplay = () => {
  return (
    <div id="cart-total" className="text-lg font-bold my-4">
      <TotalAmount />
      <Discounts />
      <Points />
    </div>
  );
};

export const TotalAmount = () => {
  return `총액: ${0}원`;
};

export const Discounts = () => {
  return <span className="text-red-500 ml-2">( % 할인 적용)</span>;
};

export const Points = () => {
  return (
    <span id="loyalty-points" className="text-blue-500 ml-2">
      (포인트: )
    </span>
  );
};
