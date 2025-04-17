export const CartList = () => {
  let cartList = document.createElement("select");
  cartList.id = "product-select";
  cartList.className = "border rounded p-2 mr-2";
  return cartList;
};
