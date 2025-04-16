import type { GlobalState } from "../../types";

export const handleCartItemRemove = (productId: string, state: GlobalState) => {
  const removedCartItem = state.cartList.find((item) => item.id === productId);
  if (!removedCartItem)
    return {
      updatedProductList: state.productList,
      updatedCartList: state.cartList,
      newTotalPrice: state.totalPrice,
    };

  // 상품 정보를 productList에서 찾습니다.
  const product = state.productList.find((item) => item.id === productId);
  if (!product)
    return {
      updatedProductList: state.productList,
      updatedCartList: state.cartList,
      newTotalPrice: state.totalPrice,
    };

  // cartList에서 해당 상품을 필터링하여 제거합니다.
  const updatedCartList = state.cartList.filter((item) => item.id !== productId);

  const newTotalPrice = updatedCartList.reduce((acc: number, item) => acc + item.price * (item.count || 1), 0);

  // 제거된 상품의 count만큼 상품의 재고를 증가시킵니다.
  const updatedProductList = state.productList.map((item) =>
    item.id === productId ? { ...item, count: item.count + removedCartItem.count } : item,
  );

  return { updatedProductList, updatedCartList, newTotalPrice };
};
