import type { GlobalState, Product } from "../../types";
import { calculateTotalPrice, updateCartList, updateProductList } from "../../utils";

export const handleAddButtonClick = (selectedProductId: string, state: GlobalState) => {
  const selectedProduct = state.productList?.find((p) => p.id === selectedProductId);
  if (!selectedProduct) {
    alert("상품을 찾을 수 없습니다.");
    return {
      updatedProductList: state.productList,
      updatedCartList: state.cartList,
      newTotalPrice: state.totalPrice,
    };
  }

  if (selectedProduct.count <= 0) {
    alert("재고가 부족합니다.");
    return { updatedProductList: state.productList, updatedCartList: state.cartList, newTotalPrice: state.totalPrice };
  }

  const updatedProductList = updateProductList(state.productList, selectedProductId, -1);
  const updatedCartList = updateCartList(state.cartList, selectedProduct as Product);
  const newTotalPrice = calculateTotalPrice(updatedCartList);

  return {
    updatedProductList,
    updatedCartList,
    newTotalPrice,
    selectedProduct,
  };
};
