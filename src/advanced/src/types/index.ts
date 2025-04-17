export interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
    discountRate: number;
}

export interface CartItemType {
    product: Product;
    quantity: number;
}
