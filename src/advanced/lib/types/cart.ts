
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  addedItems: CartItem[];
  lastSelected: string;
  totalAmount: number;
  totalQuantity: number;
  totalAmountBeforeDiscount: number
  discountRate: number;
  bonusPoints: number;
  error?: string | null;
}

