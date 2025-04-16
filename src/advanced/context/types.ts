export interface CartState {
  itemCount: number;
  subTotal: number;
  totalAmount: number;
}

export interface ProductState {
  selectedProductId: string | null;
}