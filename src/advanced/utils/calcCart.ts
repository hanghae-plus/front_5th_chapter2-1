import { CartItem } from '../store/cartStore';

export const calcCart = (cart: CartItem[]) => {
  let totalAmt = 0;
  let itemCnt = 0;
  let subTot = 0;

  for (const item of cart) {
    const { id, val, qty } = item;
    let discount = 0;

    if (qty >= 10) {
      if (id === 'p1') discount = 0.1;
      else if (id === 'p2') discount = 0.15;
      else if (id === 'p3') discount = 0.2;
      else if (id === 'p4') discount = 0.05;
      else if (id === 'p5') discount = 0.25;
    }

    const itemTotal = val * qty;
    itemCnt += qty;
    subTot += itemTotal;
    totalAmt += itemTotal * (1 - discount);
  }

  let discRate = 0;
  if (itemCnt >= 30) {
    const bulkDisc = subTot * 0.25;
    const itemDisc = subTot - totalAmt;
    if (bulkDisc > itemDisc) {
      totalAmt = subTot * 0.75;
      discRate = 0.25;
    } else {
      discRate = itemDisc / subTot;
    }
  } else {
    discRate = (subTot - totalAmt) / subTot;
  }

  if (new Date().getDay() === 2) {
    totalAmt *= 0.9;
    discRate = Math.max(discRate, 0.1);
  }

  const rounded = Math.round(totalAmt);
  const bonusPts = Math.floor(rounded / 1000);

  return {
    totalAmt: rounded,
    bonusPts,
    discRate,
  };
};
