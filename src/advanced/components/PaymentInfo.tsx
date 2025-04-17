import { DISCOUNT } from '../constants/numbers';
import { useProdListContext } from '../store/prodList/ProdListContext';
import { isTuesday } from '../utils/date';

const PaymentInfo = () => {
  // 할인을 적용하기 전의 총 금액 preDiscountTotal
  let preDiscountTotalPrice = 0;
  // 카트에 올라가 있는 상품의 총 합 newItemCount
  let itemCount = 0;
  // 할인이 들어간 값 newTotalAmount
  let discountedTotalPrice = 0;
  // 총 할인율
  let discount = 0;

  const { prodList } = useProdListContext();

  // 할인전 기본값 계산
  prodList.forEach(({ cartCount, price, id }) => {
    if (cartCount < 0) return;
    let eachItemDiscount = 0;

    const currentItemTotalPrice = price * cartCount;
    preDiscountTotalPrice += currentItemTotalPrice;
    itemCount += cartCount;

    if (cartCount >= DISCOUNT.FOR_MIN_QUANTITY) {
      eachItemDiscount = DISCOUNT.ITEM_RATIO[id as keyof typeof DISCOUNT.ITEM_RATIO];
    }

    discountedTotalPrice += currentItemTotalPrice * (DISCOUNT.FULL_PRICE_RATIO - eachItemDiscount);
  });

  if (itemCount >= DISCOUNT.BULK_DISCOUNT.QUANTITY) {
    const bulkDiscount = discountedTotalPrice * DISCOUNT.BULK_DISCOUNT.RATIO;
    const itemDiscount = preDiscountTotalPrice - discountedTotalPrice;

    if (bulkDiscount > itemDiscount) {
      discountedTotalPrice = preDiscountTotalPrice * (DISCOUNT.FULL_PRICE_RATIO - DISCOUNT.BULK_DISCOUNT.RATIO);
      discount = DISCOUNT.BULK_DISCOUNT.RATIO;
    } else {
      discount = (preDiscountTotalPrice - discountedTotalPrice) / preDiscountTotalPrice;
    }
  } else {
    discount = (preDiscountTotalPrice - discountedTotalPrice) / preDiscountTotalPrice;
  }

  if (isTuesday()) {
    discountedTotalPrice *= DISCOUNT.FULL_PRICE_RATIO - DISCOUNT.TUESDAY_RATIO;
    discount = Math.max(discount, DISCOUNT.TUESDAY_RATIO);
  }

  const purchasePoints = Math.floor(discountedTotalPrice / 1000);

  return (
    <div className="text-xl font-bold my-4">
      총액: {discountedTotalPrice}원{' '}
      {discount > 0 && <span className="text-green-500 ml-2">({(discount * 100).toFixed(1)}% 할인 적용)</span>}
      <span className="text-blue-500 ml-2">(포인트: {purchasePoints})</span>
    </div>
  );
};

export default PaymentInfo;
