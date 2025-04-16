export const validateStock = (product) => {
  if (!product || product.q <= 0) {
    alert("재고가 부족합니다.");
    return false;
  }
  return true;
};

export const updateProductStock = (store, productId, quantityChange) => {
  const state = store.getState();
  store.update({
    products: state.products.map((p) =>
      p.id === productId ? { ...p, q: p.q - quantityChange } : p,
    ),
  });
};

export const getIndividualDiscountRate = (product, quantity) => {
  return quantity >= 10 ? (product.discountRate ?? 0) : 0;
};

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
