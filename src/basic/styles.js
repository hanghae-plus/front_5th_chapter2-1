import { EVENT_FRAGMENT } from "./config/fragments";
/** @const 스타일 맵 */
export const STYLES = Object.freeze({
  CONTAINER: "bg-gray-100 p-8",
  WRAPPER:
    "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8",
  TITLE: "text-2xl font-bold mb-4",
  CART_ITEMS: "",
  CART_TOTAL: "text-xl font-bold my-4",
  PRODUCT_SELECT: "border rounded p-2 mr-2",
  ADD_TO_CART: "bg-blue-500 text-white px-4 py-2 rounded",
  STOCK_STATUS: "text-sm text-gray-500 mt-2",
  NEW_ITEM: "flex justify-between items-center mb-2",
  QUANTITY_CHANGE: [
    EVENT_FRAGMENT.QUANTITY_CHANGE,
    " bg-blue-500 text-white px-2 py-1 rounded mr-1",
  ],
  REMOVE_ITEM: [
    EVENT_FRAGMENT.REMOVE_ITEM,
    "bg-red-500 text-white px-2 py-1 rounded",
  ],
  TOTAL_TEXT: "text-green-500 ml-2",
  LOYALTY_POINTS: "text-blue-500 ml-2",
});
