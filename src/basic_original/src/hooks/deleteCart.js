import { store } from "../store/store";
import { getCartPrice } from "./getCartPrice";

// 장바구니 빼기
export function DeleteCart () {
    const { cartDisp, products } = store.element;

    cartDisp.addEventListener('click', (event) => {
        const target = event.target;
        const isQtyChange = target.classList.contains("quantity-change");
        const isRemove = target.classList.contains("remove-item");
        
        if (!isQtyChange && !isRemove) return;

        const prodId = target.dataset.productId;
        const product = store.products.find((p) => p.id === prodId);
        const itemElem = document.getElementById(prodId);

        if (!product || !itemElem) return;

        const qtySpan = itemElem.querySelector("span");
        const currentQty = parseInt(qtySpan.textContent.split("x ")[1]);

        if(isQtyChange) {
            const change = parseInt(target.dataset.change);
            const newQty = currentQty + change;

            if (newQty > 0 && newQty <= product.q + currentQty) {
                qtySpan.textContent = `${product.name} - ${product.val}원 x ${newQty}`;
                product.q -= change;
            } else if (newQty <= 0) {
                itemElem.remove();
                product.q += currentQty;
            } else {
                alert("재고가 부족합니다.");
            }
        }

        if (isRemove) {
            product.q += currentQty;
            itemElem.remove();
        }

        getCartPrice();
    })
}