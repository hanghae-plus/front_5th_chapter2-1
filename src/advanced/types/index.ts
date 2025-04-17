export interface Item {
  id: string;
  name: string;
  value: number;
  q: number;
}

export interface CartItem {
  itemId: string;
  quantity: number;
}
