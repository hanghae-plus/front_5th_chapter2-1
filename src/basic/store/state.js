import { PRODUCT_LIST } from '../constants';

export const state = {
    productList: [...PRODUCT_LIST],
    lastSelectedProductId: null,
    bonusPoints: 0,
    totalAmount: 0,
    totalItemCount: 0,
};

export const domRefs = {
    cartItemsContainer: null,
    totalAmountElement: null,
    productSelectElement: null,
    addToCartButton: null,
    stockStatusElement: null,
};
