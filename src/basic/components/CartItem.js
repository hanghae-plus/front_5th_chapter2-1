import { $, STYLES } from "@/basic/lib";
/**
 * [Component] 장바구니 아이템
 *
 * @param {Object} item
 * @param {string} item.id
 * @param {string} item.name
 * @param {number} item.cost
 * @returns {HTMLElement}
 */
export const CartItem = ({ id, name, cost }) => {
  return $(
    "div",
    { id, className: STYLES.NEW_ITEM },
    $("span", { textContent: name + " - " + cost + "원 x 1" }),
    $(
      "div",
      {},
      $("button", {
        className: STYLES.QUANTITY_CHANGE,
        dataset: { productId: id, change: -1 },
        textContent: "-",
      }),
      $("button", {
        className: STYLES.QUANTITY_CHANGE,
        dataset: { productId: id, change: 1 },
        textContent: "+",
      }),
      $("button", {
        className: STYLES.REMOVE_ITEM,
        dataset: { productId: id },
        textContent: "삭제",
      }),
    ),
  );
};
