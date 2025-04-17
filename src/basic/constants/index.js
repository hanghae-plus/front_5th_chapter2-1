export const BULK_DISCOUNT_RATE = 0.25;
export const SPECIAL_DISCOUNT_DAY = 2;
export const SPECIAL_DISCOUNT_RATE = 0.1;
export const BONUS_POINT_UNIT = 1000;

export const PRODUCT_LIST = [
    { id: 'p1', name: '상품1', val: 10000, q: 50 },
    { id: 'p2', name: '상품2', val: 20000, q: 30 },
    { id: 'p3', name: '상품3', val: 30000, q: 20 },
    { id: 'p4', name: '상품4', val: 15000, q: 0 },
    { id: 'p5', name: '상품5', val: 25000, q: 10 },
];

export const DISCOUNT_THRESHOLDS = {
    p1: 0.1,
    p2: 0.15,
    p3: 0.2,
    p4: 0.05,
    p5: 0.25,
};

export const ID = {
    CART_ITEMS: 'cart-items',
    CART_TOTAL: 'cart-total',
    PRODUCT_SELECT: 'product-select',
    ADD_TO_CART: 'add-to-cart',
    STOCK_STATUS: 'stock-status',
    LOYALTY_POINTS: 'loyalty-points',
};

export const CLASS_NAME = {
    CONTAINER: 'bg-gray-100 p-8',
    WRAPPER: 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8',
    HEADING: 'text-2xl font-bold mb-4',
    TOTAL_AMOUNT: 'text-xl font-bold my-4',
    SELECT: 'border rounded p-2 mr-2',
    ADD_BUTTON: 'bg-blue-500 text-white px-4 py-2 rounded',
    STOCK_STATUS: 'text-sm text-gray-500 mt-2',
    DISCOUNT: 'text-green-500 ml-2',
    POINTS: 'text-blue-500 ml-2',
};
