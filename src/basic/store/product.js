const productStore = (function () {
  const productList = [];

  function getProductList() {
    return [...productList];
  }

  function addProduct(product) {
    productList.push(product);
  }

  function updateProduct(productId, updateFn) {
    const index = productList.findIndex((product) => product.id === productId);

    if (index !== -1) {
      const updatedProduct = updateFn({ ...productList[index] });
      productList.splice(index, 1, updatedProduct);
    }
  }

  return {
    getProductList,
    addProduct,
    updateProduct,
  };
})();

export default productStore;
