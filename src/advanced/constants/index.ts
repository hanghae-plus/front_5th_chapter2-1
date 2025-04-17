import { ProductListType } from "../types";

export let prodList: ProductListType = [
    //변수명 변경 val -> price, q -> quantity
    { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
    { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
    { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
    { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
    { id: 'p5', name: '상품5', price: 25000, quantity: 10 }
  ];

export const discountRates:{ [key: string]: number } = { p1: 0.1, p2: 0.15, p3: 0.2, p4: 0.05, p5: 0.25 };

// export let lastSel;