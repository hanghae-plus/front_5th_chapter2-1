import { findProduct } from "../../../../store/prodList.js";
import { logic, getCartItemText, getValueFromCardItem } from "../../logic.js";

function changeCardItemQuantity(tgt, itemElem, prod) {
  var qtyChange = parseInt(tgt.dataset.change);
  const previousQuantity = getValueFromCardItem(itemElem);
  const newQty = previousQuantity + qtyChange;

  if (newQty > 0 && newQty <= prod.q + previousQuantity) {
    getCartItemText(itemElem).textContent =
      getValueFromCardItem(itemElem, "price") + "x " + newQty;
    prod.q -= qtyChange;
    return;
  }

  if (newQty <= 0) {
    itemElem.remove();
    prod.q -= qtyChange;
    return;
  }

  alert("재고가 부족합니다.");
}

function removeCardItem(itemElem, prod) {
  var remQty = getValueFromCardItem(itemElem);
  prod.q += remQty;
  itemElem.remove();
}

function isValidTarget(tgt) {
  return (
    tgt.classList.contains("quantity-change") ||
    tgt.classList.contains("remove-item")
  );
}

export function handleClickCartDisp(event) {
  const tgt = event.target;

  if (!isValidTarget(tgt)) {
    return;
  }

  const productId = tgt.dataset.productId;
  const prod = findProduct(productId);
  const itemElem = document.getElementById(productId);

  if (tgt.classList.contains("quantity-change")) {
    changeCardItemQuantity(tgt, itemElem, prod);
  } else {
    removeCardItem(itemElem, prod);
  }

  logic();
}
