import { updateSelectOptions } from './updateSelectOptions.js';
import { handleAddToCart } from './handleAddToCart.js';

export const ProductSelector = (productSelectElement, addToCartButtonElement, productList, cartItemList, calculationCart, lastSelectedProduct) => {
    addToCartButtonElement.addEventListener('click', function () {
        handleAddToCart({
            productSelectElement,
            productList,
            cartItemList,
            calculationCart,
            lastSelectedProduct
        })();
    });

    return { updateSelectOptions: () => updateSelectOptions(productSelectElement, productList) }
};

