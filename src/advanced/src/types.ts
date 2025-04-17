export interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface CartItem {
    productId: Product['id'];
    cartQuantity: number;
}
