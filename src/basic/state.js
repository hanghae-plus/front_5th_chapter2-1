export const state = {
  productList: [
    { id: 'p1', name: '상품1', val: 10000, q: 50 },
    { id: 'p2', name: '상품2', val: 20000, q: 30 },
    { id: 'p3', name: '상품3', val: 30000, q: 20 },
    { id: 'p4', name: '상품4', val: 15000, q: 0 },
    { id: 'p5', name: '상품5', val: 25000, q: 10 },
  ],
  lastSel: null,
  bonusPts: 0,
  totalAmt: 0,
  itemCnt: 0,
};

export const elements = {
  sel: null,
  addBtn: null,
  cartDisp: null,
  sum: null,
  stockInfo: null,
};
