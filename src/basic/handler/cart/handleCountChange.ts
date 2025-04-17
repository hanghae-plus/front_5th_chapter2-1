import type { GlobalState } from "../../types";
import { calculateTotalPrice, updateCartList, updateProductList } from "../../utils";

export const handleCountChange = (productId: string, change: number, state: GlobalState) => {
  const cartList = state.cartList;
  const product = state.productList.find((product) => product.id === productId);

  if (!product) {
    alert("상품을 찾을 수 없습니다.");
    return {
      updatedProductList: state.productList,
      updatedCartList: state.cartList,
      newTotalPrice: state.totalPrice,
    };
  }

  if (product.count - change < 0) {
    alert("재고가 부족합니다. ");
    return {
      updatedProductList: state.productList,
      updatedCartList: state.cartList,
      newTotalPrice: state.totalPrice,
    };
  }

  const updatedProductList = updateProductList(state.productList, productId, -change);

  const updatedCartList = updateCartList(cartList, product, change).filter((item) => item.count > 0);

  const newTotalPrice = calculateTotalPrice(updatedCartList);

  return {
    updatedProductList,
    updatedCartList,
    newTotalPrice,
  };
};
