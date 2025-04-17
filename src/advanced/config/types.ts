export interface Product {
  id: string;
  name: string;
  price: number;
  stockQuantity: number;
  cartQuantity: number;
  discountRate: number;
  discountThreshold: number;
}

export interface CartTotal {
  count: number;
  amountWithDiscount: number;
  amountWithoutDiscount: number;
}

export interface CartSummary extends CartTotal {
  discountRate: number;
  totalAmount: number;
}

export type StockAction =
  | { type: 'INCREMENT'; id: string }
  | { type: 'DECREMENT'; id: string }
  | { type: 'REMOVE'; id: string }
  | { type: 'APPLY_DISCOUNT'; id: string; discountRate: number };

export interface StockContextType {
  stockList: Product[];
  cartList: Product[];
  dispatch: React.Dispatch<StockAction>;
  lastAddedProductId: string | undefined;
  setLastAddedProductId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  summary: CartSummary;
}
