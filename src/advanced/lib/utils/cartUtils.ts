import { PRODUCT_INVENTORY } from "../configs/products";
import type { CartItem, Product } from "../types/cart";
import { calculateBonusPoints } from "./bonusPointUtils";
import { applyDiscount, getDiscountRateByProduct } from "./discountUtils";

interface CartInvoice {
  totalQuantity: number;
  totalAmountBeforeDiscount: number;
  totalAmount: number;
  discountRate: number;
  bonusPoints: number;
}

export function generateCartInvoice(addedItems: CartItem[]): CartInvoice {
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

    if (!product) {
      return {
        totalQuantity: 0,
        totalAmountBeforeDiscount: 0,
        totalAmount: 0,
        discountRate: 0,
        bonusPoints: 0,
      };
    }

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

  const { discountRate, discountedPrice } = applyDiscount(
    totalQuantity,
    totalAmount,
    totalAmountBeforeDiscount,
  );

  const bonusPoints = calculateBonusPoints(totalAmount);

  return {
    totalQuantity,
    totalAmountBeforeDiscount,
    totalAmount: discountedPrice,
    discountRate,
    bonusPoints,
  };
}

export function updateAddedItems(addedItems: CartItem[], itemToUpdate: CartItem) {
  return [
    ...addedItems.filter((item) => item.id !== itemToUpdate.id),
    itemToUpdate,
  ];
}

export function removeItemFromAddedItems(addedItems: CartItem[], itemIdToRemove: string) {
  return addedItems.filter((item) => item.id !== itemIdToRemove);
}

export function isProductStockExists(product: Product) {
  return product && product.stock > 0;
}

export function isProductSoldOut(newQuantity: number, stock: number) {
  return newQuantity > stock;
}
