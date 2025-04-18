import MOCK_PRODUCT_LIST from '../mock/product';

export const getProductById = (id) => {
    return MOCK_PRODUCT_LIST.find(function (product) {
        return product.id === id;
    });
};

export const getDiscountPercentage = (rate) => {
    return (1 - rate) * 100;
};