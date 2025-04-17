import { ItemListType } from '../../types/ItemType.js';
import { DISCOUNT_RATES, POINTS_RATE, LIMIT } from '../../constants/index.js';
import Points from '../points/Points.js';
import { useItem } from '../../context/ItemContext.js';
import { calcFinalDiscount } from '../../utils/calcFinalDiscount.js';
import { textUtils } from '../../utils/textUtils.js';

export const calcCartItems = (cartList: ItemListType) => {
  let totalAmount = 0;
  let itemCount = 0;
  let originalTotalAmount = 0;

  cartList.forEach((cart) => {
    const quantity = cart.quantity;
    itemCount += quantity;

    const currentItemAmount = cart.price * quantity;
    originalTotalAmount += currentItemAmount;

    // 할인 조건 확인 및 할인율 계산
    const discountCondition = quantity >= LIMIT.QUANTITY_DISCOUNT;
    const discountRate = discountCondition
      ? (DISCOUNT_RATES['ITEM'][
          cart.id as keyof (typeof DISCOUNT_RATES)['ITEM']
        ] ?? 0)
      : 0;
    totalAmount += currentItemAmount * (1 - discountRate);
  });

  return {
    totalAmount,
    itemCount,
    originalTotalAmount,
  };
};

export default function CartTotal() {
  const { cartItemList } = useItem();
  const { totalAmount, itemCount, originalTotalAmount } =
    calcCartItems(cartItemList);
  const { finalDiscountRate, discountedTotalAmount } = calcFinalDiscount(
    totalAmount,
    itemCount,
    originalTotalAmount,
  );

  const discountedAmount = Math.round(discountedTotalAmount);
  const discountedRate = (finalDiscountRate * 100).toFixed(1);
  const points = Math.floor(totalAmount / POINTS_RATE);

  return (
    <div id="cart-total" className="text-xl font-bold my-4">
      총액: {discountedAmount}원 <Points points={points} />
      {finalDiscountRate ? (
        <span className="ml-2 text-green-500">
          {textUtils.getDiscountedAmountText(discountedRate)}
        </span>
      ) : null}
    </div>
  );
}
