export interface CartTotalResult {
  totalPrice: number;
  discountRate: number;
  bonusPoints: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; change: number } };

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  discountRate: number;
  bonusPoints: number;
}
