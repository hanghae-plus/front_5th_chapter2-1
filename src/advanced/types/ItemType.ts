export interface ItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// eslint-disable-next-line prettier/prettier
export interface ItemListType extends Array<ItemType> { }
