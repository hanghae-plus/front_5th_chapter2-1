// 제품 타입
export interface Product {
    id: string;
    name: string;
    val: number;
    q: number;
}

// 장바구니 아이템 타입
export interface CartItem {
    id: string;
    product: Product;
    quantity: number;
}

// 계산 결과 타입
export interface CartCalculation {
    totalAmount: number;
    discountRate: number;
    discountPercentage: number;
    // discountedAmount: number;
    points: number;
    hasDiscount: boolean;
}
