import { create } from 'zustand/react';
import { CartItem } from './useCartStore';

// 고객 구매 정보 상태 정의
interface SumState {
  total: number;
  originTotal: number;
  itemCnt: number;
  discountRate: number;
  bonusPts: number;

  setTotal: (val: number) => void;
  setOriginTotal: (val: number) => void;
  setItemCnt: (val: number) => void;
  setDiscountRate: (val: number) => void;
  setBonusPts: (val: number) => void;
  updateCart: (items: { id: string; price: number; quantity: number }[]) => void;
}

const MIN_DISCOUNT_QUANTITY = 10;

export const BULK_DISCOUNT_ITEM_COUNT = 30;
export const BULK_DISCOUNT_RATE = 0.25;

export const TUESDAY_DISCOUNT_RATE = 0.1;

// 상품별 할인율
const DISCOUNT_RATES = {
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
  p4: 0.05,
  p5: 0.25,
};

export const useSumStore = create<SumState>((set) => ({
  total: 0,
  originTotal: 0,
  itemCnt: 0,
  discountRate: 0,
  bonusPts: 0,

  setTotal: (val) => set({ total: val }),
  setOriginTotal: (val) => set({ originTotal: val }),
  setItemCnt: (val) => set({ itemCnt: val }),
  setDiscountRate: (val) => set({ discountRate: val }),
  setBonusPts: (val) => set({ bonusPts: val }),
  updateCart: (items: CartItem[]) => {
    let total = 0;
    let originTotal = 0;
    let itemCnt = 0;
    let discountRate = 0;

    for (const item of items) {
      const itemTotal = item.price * item.quantity;
      originTotal += itemTotal;
      itemCnt += item.quantity;

      let discount = 0;
      if (item.quantity >= MIN_DISCOUNT_QUANTITY) {
        discount = DISCOUNT_RATES[item.id] || 0;
      }

      total += itemTotal * (1 - discount);
    }

    if (itemCnt >= BULK_DISCOUNT_ITEM_COUNT) {
      const bulkDiscountPrice = originTotal * BULK_DISCOUNT_RATE;
      const itemDiscountPrice = originTotal - total;

      if (bulkDiscountPrice > itemDiscountPrice) {
        total = originTotal * (1 - BULK_DISCOUNT_RATE);
        discountRate = BULK_DISCOUNT_RATE;
      } else {
        discountRate = itemDiscountPrice / originTotal;
      }
    } else {
      discountRate = (originTotal - total) / originTotal;
    }

    const TUESDAY = 2;
    if (new Date().getDay() === TUESDAY) {
      total *= 1 - TUESDAY_DISCOUNT_RATE;
      discountRate = Math.max(discountRate, TUESDAY_DISCOUNT_RATE);
    }

    const bonusPts = Math.floor(total / 1000);

    set({
      total,
      originTotal,
      itemCnt,
      discountRate,
      bonusPts,
    });
  },
}));
