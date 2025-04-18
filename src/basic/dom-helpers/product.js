function updateProductElementPrice(product, newPrice) {
  const productSelector = document.querySelector(`#${PRODUCT_SELECT_ID}`);
  const productOptions = productSelector.querySelectorAll('option');

  for (const option of productOptions) {
    if (option.value !== product.id) {
      continue;
    }
    option.textContent = `${product.name} - ${newPrice}원`;
  }
}

export { updateProductElementPrice };
