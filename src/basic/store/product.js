const productStore = (function () {
  const productList = [];

  function getProductList() {
    return [...productList];
  }

  function getProductItem(id) {
    return productList.find((item) => item.id === id);
  }

  function addProductItem(product) {
    productList.push(product);
  }

  function updateProductItem(productId, updateFn) {
    const index = productList.findIndex((product) => product.id === productId);

    if (index !== -1) {
      const updatedProduct = updateFn({ ...productList[index] });
      productList.splice(index, 1, updatedProduct);
    }
  }

  return {
    getProductList,
    getProductItem,
    addProductItem,
    updateProductItem,
  };
})();

export default productStore;
