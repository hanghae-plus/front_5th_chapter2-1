interface ProductType {
    id: string;
    name: string;
    val: number;
    q: number;
}

export const PRODUCT_LIST: ProductType[] = [
    { id: "p1", name: "상품1", val: 1000, q: 10 },
    { id: "p2", name: "상품2", val: 2000, q: 5 },
    { id: "p3", name: "상품3", val: 3000, q: 15 },
    { id: "p4", name: "상품4", val: 4000, q: 3 },
    { id: "p5", name: "상품5", val: 5000, q: 7 },
];
