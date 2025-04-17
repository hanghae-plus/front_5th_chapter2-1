import Points from '../points/Points.js';

export default function CartTotal() {
  const amount = 0;
  const points = 0;
  return (
    <div id="cart-total" className="text-xl font-bold my-4">
      총액: {amount}원 <Points points={points} />
    </div>
  );
}
