import { messages } from '../../messages/messages.js';
import { createNewCartItem } from './createNewCartItem.js';
import { updateExistingCartItem } from './updateExistingCartItem.js';

export const handleAddToCart = ({
    productSelectElement,
    productList,
    cartItemList,
    calculationCart,
    lastSelectedProduct
}) => {
    return function () {
        const selectItem = productSelectElement.value;
        const itemToAdd = productList.find(product => product.id === selectItem);

        if (!itemToAdd || itemToAdd.quantity <= 0) {
            alert(messages.OUT_OF_STOCK);
            return;
        }

        const existingItem = document.getElementById(itemToAdd.id);

        if (existingItem) {
            updateExistingCartItem(existingItem, itemToAdd);
        } else {
            const newItem = createNewCartItem(itemToAdd);
            cartItemList.appendChild(newItem);
            itemToAdd.quantity--;
        }

        calculationCart();
        lastSelectedProduct = selectItem;
    };
};
