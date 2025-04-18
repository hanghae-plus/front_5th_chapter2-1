export const findProduct = (cartItemList, productId) => {
  return cartItemList.find((item) => item.id === productId);
};

export const removeProduct = (cartItemList, productId) => {
  return cartItemList.filter((item) => item.id !== productId);
};
