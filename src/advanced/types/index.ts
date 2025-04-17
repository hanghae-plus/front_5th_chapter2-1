export type ProductListType = Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
}>

export type ProductType = {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export type CartItemType = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    count: number;
}