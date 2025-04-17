import { useEffect } from 'react';
import {
  BULK_DISCOUNT_ITEM_COUNT,
  BULK_DISCOUNT_RATE,
  TUESDAY_DISCOUNT_RATE,
  useSumStore,
} from '../stores/useSumStore';

export const useUpdateDiscountRate = () => {
  const total = useSumStore((state) => state.total);
  const originTotal = useSumStore((state) => state.originTotal);
  const itemCnt = useSumStore((state) => state.itemCnt);
  const setTotal = useSumStore((state) => state.setTotal);
  const setDiscountRate = useSumStore((state) => state.setDiscountRate);

  useEffect(() => {
    let updatedTotal = total;
    let updatedDiscountRate = 0;

    // 30개 이상이면 할인 적용
    if (itemCnt >= BULK_DISCOUNT_ITEM_COUNT) {
      const bulkDiscountPrice = total * BULK_DISCOUNT_RATE;
      const itemDiscountPrice = originTotal - total;

      if (bulkDiscountPrice > itemDiscountPrice) {
        updatedTotal = originTotal * (1 - BULK_DISCOUNT_RATE);
        updatedDiscountRate = BULK_DISCOUNT_RATE;
      } else {
        updatedDiscountRate = (originTotal - total) / originTotal;
      }
    } else {
      updatedDiscountRate = (originTotal - total) / originTotal;
    }

    // 화요일이면 할인 적용
    const TUESDAY = 2;
    const today = new Date().getDay();
    if (today === TUESDAY) {
      updatedTotal = updatedTotal * (1 - TUESDAY_DISCOUNT_RATE);
      updatedDiscountRate = Math.max(updatedDiscountRate, TUESDAY_DISCOUNT_RATE);
    }

    setTotal(updatedTotal);
    setDiscountRate(updatedDiscountRate);
  }, [total, originTotal, itemCnt, setTotal, setDiscountRate]);
};
