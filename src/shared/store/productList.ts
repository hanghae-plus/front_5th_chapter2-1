export type Product = {
  id: string;
  name: string;
  val: number;
  q: number;
};

const defaultProdList: Product[] = [
  { id: 'p1', name: '상품1', val: 10000, q: 50 },
  { id: 'p2', name: '상품2', val: 20000, q: 30 },
  { id: 'p3', name: '상품3', val: 30000, q: 20 },
  { id: 'p4', name: '상품4', val: 15000, q: 0 },
  { id: 'p5', name: '상품5', val: 25000, q: 10 },
];

function deepCopyProdList(prodList: Product[]): Product[] {
  return prodList.map((prod) => ({
    ...prod,
  }));
}

export const prodList: Product[] = deepCopyProdList(defaultProdList);

export function getProductList() {
  return prodList;
}

export function findProductWithCondition(
  prodList: Product[],
  condition: (prod: Product) => boolean,
) {
  const product = prodList.find(condition);
  return product ? { ...product } : undefined;
}

export function findProduct(
  prodList: Product[],
  id: string,
): Product | undefined {
  return prodList.find((prod) => prod.id === id);
}

/**
 * 특정 상품의 수량을 감소시키는 함수
 * @param prodList 상품 리스트
 * @param id 수량을 감소시킬 상품 ID
 * @param amount 감소시킬 수량 (기본값: 1)
 * @param shouldCopy 결과를 새로운 배열로 반환할지 여부 (기본값: true)
 * @returns 수정된 상품 리스트
 */
export function decreaseProductQuantity(
  prodList: Product[],
  id: string,
  amount: number = 1,
): Product[] {
  const prodListCopy = deepCopyProdList(prodList);

  // 불변성 유지 (원본 데이터 변경 없음)
  return prodListCopy.map((prod) => {
    if (prod.id === id) {
      return {
        ...prod,
        q: Math.max(0, prod.q - amount),
      };
    }
    return prod;
  });
}

/**
 * 특정 상품의 재고가 요청한 수량보다 많은지 확인하는 함수
 * @param prodList 상품 리스트
 * @param id 확인할 상품 ID
 * @param amount 필요한 수량 (기본값: 1)
 * @returns 재고가 충분하면 true, 부족하면 false
 */
export function hasEnoughStock(
  prodList: Product[],
  id: string,
  amount: number = 1,
): boolean {
  const product = findProduct(prodList, id);
  if (!product) {
    return false; // 상품이 존재하지 않는 경우
  }

  return product.q >= amount;
}
