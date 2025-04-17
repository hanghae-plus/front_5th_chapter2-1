export const CART = {
  TOTAL_PRICE: {
    ID: "cart-total",
    STYLE: "text-xl font-bold my-4",
  },
  DISCOUNT_RATE: {
    STYLE: "text-green-500 ml-2",
  },
  LOYALTY_POINTS: {
    ID: "loyalty-points",
    STYLE: "text-blue-500 ml-2",
  },
  SOLD_OUT_LIST: {
    ID: "stock-status",
    STYLE: "text-sm text-gray-500 mt-2",
  },
  PRODUCT_SELECTOR: {
    ID: "product-select",
    STYLE: "border rounded p-2 mr-2",
  },
  ADD_BUTTON: {
    ID: "add-to-cart",
    STYLE: "bg-blue-500 text-white px-4 py-2 rounded",
    TEXT: "추가",
  },
  CART_LIST: {
    ID: "cart-items",
    STYLE: "flex justify-between items-center mb-2",
  },
  CART_QUANTITY_CHANGE: {
    STYLE: "bg-blue-500 text-white px-2 py-1 rounded mr-1",
  },
  CART_REMOVE_ITEM: {
    STYLE: "bg-red-500 text-white px-2 py-1 rounded",
  },
} as const;
