export interface ProductInfo {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartItemInfo extends ProductInfo {
  currentQuantity: number;
}

export interface RemainProductListInfo extends Omit<ProductInfo, 'price' | 'quantity'> {
  remainQuantity: number;
}
