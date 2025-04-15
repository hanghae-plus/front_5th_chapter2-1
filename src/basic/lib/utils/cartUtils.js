import { PRODUCT_INVENTORY } from "../configs/products";
import { calculateBonusPoints } from "./bonusPointUtils";
import { applyDiscount, getDiscountRateByProduct } from "./discountUtils";

export function generateCartInvoice(addedItems) {
  if (addedItems.length === 0) {
    return {
      totalQuantity: 0,
      totalAmountBeforeDiscount: 0,
      totalAmount: 0,
      discountRate: 0,
      bonusPoints: 0,
    };
  }

  let totalQuantity = 0;
  let totalAmountBeforeDiscount = 0;
  let totalAmount = 0;

  for (const cartItem of addedItems) {
    const product = PRODUCT_INVENTORY.find(
      (product) => product.id === cartItem.id,
    );

    const quantity = cartItem.quantity;
    const totalAmountOfItem = product.price * quantity;

    totalQuantity += quantity;
    totalAmountBeforeDiscount += totalAmountOfItem;

    if (quantity < 10) {
      totalAmount += totalAmountOfItem;
      continue;
    }

    totalAmount +=
      totalAmountOfItem * (1 - getDiscountRateByProduct(product.id));
  }

  // totalAmount = discountService.applyDiscount(
  //   totalQuantity,
  //   totalAmount,
  //   totalAmountBeforeDiscount,
  // );

  const { discountRate, discountedPrice } = applyDiscount(
    totalQuantity,
    totalAmount,
    totalAmountBeforeDiscount,
  );

  const bonusPoints = calculateBonusPoints(totalAmount);

  return {
    totalQuantity,
    totalAmountBeforeDiscount: totalAmountBeforeDiscount,
    totalAmount: discountedPrice,
    discountRate,
    bonusPoints,
  };
}

export function updateAddedItems(addedItems, itemToUpdate) {
  return [
    ...addedItems.filter((item) => item.id !== itemToUpdate.id),
    itemToUpdate,
  ];
}

export function removeItemFromAddedItems(addedItems, itemIdToRemove) {
  return addedItems.filter((item) => item.id !== itemIdToRemove);
}

export function isProductStockExists(product) {
  return product && product.stock > 0;
}

export function isProductSoldOut(newQuantity, stock) {
  return newQuantity > stock;
}

export function getQuantityChangeOfCartItem(itemElem) {
  return Number.parseInt(itemElem.dataset.change);
}
