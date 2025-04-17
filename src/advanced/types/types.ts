export interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CartItemTotals {
    quantity: number;
    itemTotal: number;
    discountedTotal: number;
}