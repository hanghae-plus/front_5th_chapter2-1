import { PRODUCT_INVENTORY } from "@advanced/lib/configs";
import type { CartItem, Product } from "@advanced/lib/types";
import { calculateBonusPoints } from "@advanced/lib/utils/bonusPointUtils";
import { applyDiscount, getDiscountRateByProduct } from "@advanced/lib/utils/discountUtils";

interface CartInvoice {
  totalQuantity: number;
  totalAmountBeforeDiscount: number;
  totalAmount: number;
  discountRate: number;
  bonusPoints: number;
}

const emptyCartInvoice: CartInvoice = {
  totalQuantity: 0,
  totalAmountBeforeDiscount: 0,
  totalAmount: 0,
  discountRate: 0,
  bonusPoints: 0,
};

type CartTotals = {
  totalQuantity: number;
  totalAmountBeforeDiscount: number;
  totalAmountAfterItemDiscounts: number;
};

export function generateCartInvoice(addedItems: CartItem[]): CartInvoice {
  if (addedItems.length === 0) return emptyCartInvoice;

  const entries = getCartEntries(addedItems);
  if (!entries) return emptyCartInvoice;

  const totals = calculateCartItemTotals(entries);
  return createInvoiceFromTotals(totals);
}

function getCartEntries(addedItems: CartItem[]): { product: Product; quantity: number }[] | null {
  const entries: { product: Product; quantity: number }[] = [];
  for (const { id, quantity } of addedItems) {
    const product = PRODUCT_INVENTORY.find((p) => p.id === id);
    if (!product) return null;

    entries.push({ product, quantity });
  }
  return entries;
}

function calculateCartItemTotals(entries: { product: Product; quantity: number }[]): CartTotals {
  return entries.reduce(
    (totals, { product, quantity }) => {
      const itemTotal = product.price * quantity;
      totals.totalQuantity += quantity;
      totals.totalAmountBeforeDiscount += itemTotal;

      const itemDiscount = quantity >= 10 ? getDiscountRateByProduct(product.id) : 0;
      totals.totalAmountAfterItemDiscounts += itemTotal * (1 - itemDiscount);

      return totals;
    },
    { totalQuantity: 0, totalAmountBeforeDiscount: 0, totalAmountAfterItemDiscounts: 0 },
  );
}

function createInvoiceFromTotals(totals: CartTotals): CartInvoice {
  const { discountRate, discountedPrice } = applyDiscount(
    totals.totalQuantity,
    totals.totalAmountAfterItemDiscounts,
    totals.totalAmountBeforeDiscount,
  );
  const bonusPoints = calculateBonusPoints(discountedPrice);

  return {
    totalQuantity: totals.totalQuantity,
    totalAmountBeforeDiscount: totals.totalAmountBeforeDiscount,
    totalAmount: discountedPrice,
    discountRate,
    bonusPoints,
  };
}

export function updateAddedItems(addedItems: CartItem[], itemToUpdate: CartItem) {
  return [...addedItems.filter((item) => item.id !== itemToUpdate.id), itemToUpdate];
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
