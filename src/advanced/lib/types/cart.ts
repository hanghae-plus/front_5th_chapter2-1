import type { Product } from "./product";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  addedItems: CartItem[];
  lastSelected: string;
  totalAmount: number;
  totalAmountBeforeDiscount: number;
  totalQuantity: number;
  discountRate: number;
  bonusPoints: number;
  error?: string | null;
}
