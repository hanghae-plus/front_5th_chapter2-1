import type { GlobalState } from "../../types";
import { calculateTotalPrice, updateProductList } from "../../utils";

export const handleCartItemRemove = (productId: string, state: GlobalState) => {
  const removedCartItem = state.cartList.find((item) => item.id === productId);
  if (!removedCartItem)
    return {
      updatedProductList: state.productList,
      updatedCartList: state.cartList,
      newTotalPrice: state.totalPrice,
    };

  // 상품 정보를 productList에서 찾음.
  const product = state.productList.find((item) => item.id === productId);
  if (!product)
    return {
      updatedProductList: state.productList,
      updatedCartList: state.cartList,
      newTotalPrice: state.totalPrice,
    };

  // cartList에서 해당 상품을 필터링하여 제거.
  const filteredCartList = state.cartList.filter((item) => item.id !== productId);
  const newTotalPrice = calculateTotalPrice(filteredCartList);

  // 제거된 상품의 count만큼 상품의 재고를 증가시킵니다.
  const updatedProductList = updateProductList(state.productList, productId, removedCartItem.count);

  return { updatedProductList, updatedCartList: filteredCartList, newTotalPrice };
};
