import { cartState, state } from "../main.basic";

let template;

const createNewCartElement = () => {
  if (!template) {
    template = document.getElementById("cart-item");
  }

  return template.content.firstElementChild.cloneNode(true);
};

const getCartElement = ({ id, name, price, quantity }) => {
  const $element = createNewCartElement();

  $element.id = id;
  $element.querySelector("span").textContent =
    name + " - " + price + "원 x " + quantity;
  Array.from($element.querySelectorAll("button")).forEach((btn) => {
    btn.setAttribute("data-product-id", id);
  });
  console.log($element);
  return $element;
};

const addHandleRemoveItem = ($targetElement) => {
  $targetElement.addEventListener("click", (event) => {
    const tgt = event.target;
    if (tgt.classList.contains("remove-item")) {
      const prodId = tgt.dataset.productId;
      const remQty = cartState[prodId];

      cartState[prodId] -= remQty;
    }
  });
};

const addHandleClickQuantityChange = ($targetElement) => {
  $targetElement.addEventListener("click", (event) => {
    const tgt = event.target;
    if (tgt.classList.contains("quantity-change")) {
      const prodId = tgt.dataset.productId;
      const qtyChange = parseInt(tgt.dataset.change); // -1 | 1

      if (state.stock[prodId].quantity === 0) {
        alert("재고가 부족합니다.");
        return;
      }
      cartState[prodId] += qtyChange;
    }
  });
};

export const CartItems = ($targetElement) => {
  const $newCartItems = $targetElement.cloneNode(true);

  $newCartItems.innerHTML = "";

  Object.entries(cartState)
    .filter(([_, quantity]) => quantity > 0)
    .map(([prodId, quantity]) => {
      return getCartElement({
        ...state.stock[prodId],
        id: prodId,
        quantity: quantity,
      });
    })
    .forEach(($element) => {
      console.log("$el", $element);
      $newCartItems.appendChild($element);
    });

  addHandleRemoveItem($newCartItems);
  addHandleClickQuantityChange($newCartItems);

  return $newCartItems;
};
