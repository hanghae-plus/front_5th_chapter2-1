import { store } from "../store/store";
import { getCartPrice } from "./getCartPrice";
import { CartList } from "../components/cartList";

// 장바구니 담기
export function addCart () {

    const { sel, addBtn, cartDisp } = store.element;

    addBtn.addEventListener('click', () => {
        const selectedId = sel.value;
        const product = store.products.find(p => p.id === selectedId);

        if (!product || product.q <= 0) return;

        const existingItem = document.getElementById(product.id);

        if (existingItem) {
            const qtySpan = existingItem.querySelector('span');
            const currentQty = parseInt(qtySpan.textContent.split('x ')[1]);
            const newQty = currentQty + 1;

            if (newQty <= product.q) {
                qtySpan.textContent = `${product.name} - ${product.val}원 x ${newQty}`;
                product.q--;
            } else {
                alert('재고가 부족합니다.');
                return;
            }
        } else {
            const newItem = CartList(product);
            cartDisp.appendChild(newItem);
            product.q--;
        }

        getCartPrice();
        store.state.lastSel = selectedId;
    })
}