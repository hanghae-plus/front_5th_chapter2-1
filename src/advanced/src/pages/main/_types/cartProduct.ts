import { IProduct } from "./product";

/** 장바구니 */
export interface ICartProduct extends IProduct {
  /** 상품 개수 */
  count: number;
}
