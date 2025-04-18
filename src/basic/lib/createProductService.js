export function createProductService(store) {
  const getProductById = productId => {
    return store.products.find(product => product.id === productId);
  };

  const getProductBySuggestion = excludedProductId => {
    return store.products.find(product => product.id !== excludedProductId && product.quantity > 0);
  };

  const getRandomProduct = () => {
    return store.products[Math.floor(Math.random() * store.products.length)];
  };

  const updateProductPrice = (productId, newPrice) => {
    const product = getProductById(productId);
    updateProductElementPrice(productId, newPrice);
    product.price = newPrice;
  };

  return {
    getProductById,
    getProductBySuggestion,
    getRandomProduct,
    updateProductPrice,
  };
}
