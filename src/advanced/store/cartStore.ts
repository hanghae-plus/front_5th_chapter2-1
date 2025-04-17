import { create } from 'zustand';
import productList from '../../data/Product.json';

//상품 정보 타입
export type Product = {
  id: string; //상품 ID
  name: string; //상품 이름
  val: number; //가격
  q: number; //재고 수량
};

//장바구니 상품 타입입
export type CartItem = {
  id: string;
  name: string;
  val: number;
  qty: number; //장바구니 수량량
};

//zustand 스토어 타입 정의
type CartStore = {
  selectedId: string; //현재 선택된 상품 ID
  setSelectedId: (id: string) => void;
  products: Product[]; // 전체 상품 리스트
  setProducts: (products: Product[]) => void;
  cart: CartItem[]; //장바구니 리스트
  setCart: (cart: CartItem[]) => void;
  totalAmt: number; //총액
  itemCnt: number; //총 수량

  setTotalAmt: (amt: number) => void;
  setItemCnt: (cnt: number) => void;
};

// zustand 스토어 생성
export const useCartStore = create<CartStore>((set) => ({
  selectedId: '',
  setSelectedId: (id) => set({ selectedId: id }),
  products: productList, // 상품리스트 초기값 세팅
  setProducts: (products) => set({ products }),
  cart: [],
  setCart: (cart) => set({ cart }),
  totalAmt: 0,
  itemCnt: 0,

  setTotalAmt: (amt) => set({ totalAmt: amt }),
  setItemCnt: (cnt) => set({ itemCnt: cnt }),
}));
