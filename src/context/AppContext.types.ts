export interface Product {
  id: string;
  name: string;
  val: number;
  q: number;
}

export interface IAppContext {
  sel: HTMLSelectElement | null;
  addBtn: HTMLButtonElement | null;
  cartDisp: HTMLDivElement | null;
  sum: HTMLDivElement | null;
  stockInfo: HTMLDivElement | null;
  lastSel: string | null;
  totalAmt: number;
  itemCnt: number;
  bonusPts: number;
  productList: Product[];
  updateSelOpts?: (ctx: IAppContext) => void;
}
