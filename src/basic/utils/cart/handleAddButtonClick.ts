import type { CartItem, GlobalState } from "../../types";

export const handleAddButtonClick = (selectedProductId: string, state: GlobalState) => {
  const product = state.productList.find((product) => product.id === selectedProductId);
  if (!product) {
    alert("상품을 찾을 수 없습니다.");
    return {
      updatedProductList: state.productList,
      updatedCartList: state.cartList,
      newTotalPrice: state.totalPrice,
    };
  }

  // 재고가 없으면 중단
  if (product.count <= 0) {
    alert("재고가 부족합니다.");
    return {
      updatedProductList: state.productList,
      updatedCartList: state.cartList,
      newTotalPrice: state.totalPrice,
    };
  }

  const updatedProduct = {
    ...product,
    count: product.count - 1,
  };
  const updatedProductList = state.productList.map((product) =>
    product.id === selectedProductId ? updatedProduct : product,
  );

  let updatedCartList: CartItem[];
  const existingCartItem = state.cartList.find((item: CartItem) => item.id === selectedProductId);
  if (existingCartItem) {
    updatedCartList = state.cartList.map((item: CartItem) =>
      item.id === selectedProductId ? { ...item, count: (item.count || 1) + 1 } : item,
    );
  } else {
    updatedCartList = [...state.cartList, { ...updatedProduct, count: 1 }];
  }

  const newTotalPrice = updatedCartList.reduce(
    (acc: number, item: CartItem) => acc + item.price * (item.count || 1),
    0,
  );

  return {
    updatedProductList,
    updatedCartList,
    newTotalPrice,
  };
};
