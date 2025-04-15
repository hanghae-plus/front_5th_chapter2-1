import { PRODUCT_INVENTORY } from "../configs/products";
import { bonusPointService } from "../services/BonusPointService";
import { discountService } from "../services/DiscountService";
import { getDiscountRateByProduct } from "./discountUtils";

export function calculateCartTotal(addedItems) {
  let totalQuantity = 0;
  let totalAmountBeforeDiscount = 0;
  let totalAmount = 0;

  if (addedItems.length === 0) {
    bonusPointService.resetBonusPoints();
    return {
      totalQuantity,
      totalAmountBeforeDiscount,
      totalAmount,
    };
  }

  for (let cartItem of addedItems) {
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

  totalAmount = discountService.applyDiscount(
    totalQuantity,
    totalAmount,
    totalAmountBeforeDiscount,
  );

  bonusPointService.getBonusPointsFromTotalAmount(totalAmount);

  return {
    totalQuantity,
    totalAmountBeforeDiscount,
    totalAmount,
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
  return parseInt(itemElem.dataset.change);
}
