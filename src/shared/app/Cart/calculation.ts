interface DiscountRates {
  [key: string]: number;
}

interface Product {
  name: string;
  q: number;
}

interface FinalAmounts {
  totalAmt: number;
  discRate: number;
}

/** DATA */
const discountRateById: DiscountRates = {
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
  p4: 0.05,
  p5: 0.25,
};

export function getDisc(quantity: number, currentItemId: string): number {
  if (quantity < 10) {
    return 0;
  }
  return discountRateById[currentItemId] || 0;
}

export function getFinalAmounts(
  itemCnt: number,
  totalAmt: number,
  subTot: number,
): FinalAmounts {
  let discRate = 0;
  if (itemCnt >= 30) {
    const bulkDisc = totalAmt * 0.25;
    const itemDisc = subTot - totalAmt;
    if (bulkDisc > itemDisc) {
      totalAmt = subTot * (1 - 0.25);
      discRate = 0.25;
    } else {
      discRate = (subTot - totalAmt) / subTot;
    }
  } else {
    discRate = (subTot - totalAmt) / subTot;
  }
  if (new Date().getDay() === 2) {
    totalAmt *= 1 - 0.1;
    discRate = Math.max(discRate, 0.1);
  }

  return {
    totalAmt,
    discRate,
  };
}

export function getBonusPts(totalAmt: number): number {
  return Math.floor(totalAmt / 1000);
}

export function getProductQuantityMessage(prodList: Product[]): string {
  let infoMsg = '';

  prodList.forEach(function (item) {
    if (item.q < 5) {
      infoMsg +=
        item.name +
        ': ' +
        (item.q > 0 ? '재고 부족 (' + item.q + '개 남음)' : '품절') +
        '\n';
    }
  });

  return infoMsg;
}

export function getCartItemText({
  name,
  value,
  quantity,
}: {
  name: string;
  value: number;
  quantity: number;
}) {
  return `${name} - ${value}원 x ${quantity}`;
}
