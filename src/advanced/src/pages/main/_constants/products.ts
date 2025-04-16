import type { IProduct } from "#advanced/pages/main/_types";

// faker.js를 한국어 로케일로 설정하여 한국어 데이터 생성
export const PRODUCTS: IProduct[] = Array(10)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    name: `상품${index + 1}`,
    price: Math.floor(Math.random() * 100000),
    stock: Math.floor(Math.random() * 10),
  }));
