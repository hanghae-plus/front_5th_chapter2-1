export const createProductOption = (product) => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = `${product.name} - ${product.val}원`;
    if (product.quantity === 0) {
        option.disabled = true;
    }
    return option;
}