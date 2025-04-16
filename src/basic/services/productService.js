export const validateStock = (product) => {
  // 상품의 재고가 충분한지 확인하는 함수
  if (!product || product.q <= 0) {
    alert("재고가 부족합니다.");
    return false;
  }
  return true;
};

// 스토어에서 특정 상품의 재고 수량을 업데이트하는 함수
export const updateProductStock = (store, productId, quantityChange) => {
  const state = store.getState();

  store.update({
    products: state.products.map((p) =>
      p.id === productId ? { ...p, q: p.q - quantityChange } : p,
    ),
  });
};

// 상품의 수량에 따른 개별 할인율을 계산하는 함수 (10개 이상 구매 시 할인 적용)
export const getIndividualDiscountRate = (product, quantity) => {
  return quantity >= 10 ? (product.discountRate ?? 0) : 0;
};

// 상품 수량에 따라 대량 할인을 적용할지 기존 할인을 유지할지 결정하는 함수!
export const applyBulkDiscount = ({ subTotal, totalAmt, itemCount, items }) => {
  if (itemCount < 30) {
    const existedRate = subTotal === 0 ? 0 : (subTotal - totalAmt) / subTotal;

    return { total: totalAmt, discountRate: existedRate, items };
  }

  const bulkDiscountAmount = subTotal * 0.25;

  const individualDiscountAmount = subTotal - totalAmt;

  const shouldApplyBulkDiscount = bulkDiscountAmount > individualDiscountAmount;

  if (shouldApplyBulkDiscount) {
    return { total: subTotal * 0.75, discountRate: 0.25, items };
  }

  const existedRate = (subTotal - totalAmt) / subTotal;

  return { total: totalAmt, discountRate: existedRate, items };
};

// 화요일 할인을 적용하는 함수 (화요일인 경우 10% 추가 할인)
export const applyTuesdayDiscount = ({ currentTotal, currentRate, items }) => {
  if (new Date().getDay() !== 2) {
    return { total: currentTotal, discountRate: currentRate, items };
  }
  return {
    total: currentTotal * 0.9,

    discountRate: Math.max(currentRate, 0.1),
    items,
  };
};

// 장바구니 아이템 정보를 누적하여 총 가격, 할인 금액 등을 계산하는 함수
export const accumulateItem = (acc, itemElem, products) => {
  const productId = itemElem.id;
  const quantity = parseInt(
    itemElem.querySelector("span").textContent.split("x ")[1],
    10,
  );
  const product = products.find((p) => p.id === productId);

  const itemTotal = product.val * quantity;

  const discRate = getIndividualDiscountRate(product, quantity);

  const discountedItemTotal = itemTotal * (1 - discRate);

  const newItems = new Map(acc.items);

  newItems.set(productId, { quantity, product });

  return {
    ...acc,
    items: newItems,
    subTotal: acc.subTotal + itemTotal,
    totalAmt: acc.totalAmt + discountedItemTotal,
    itemCount: acc.itemCount + quantity,
  };
};
