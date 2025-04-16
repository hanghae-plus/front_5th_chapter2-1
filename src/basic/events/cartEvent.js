import { createCartItem } from "../utils/createElement.js";

// 필요한 요소와 함수를 매개변수로 전달받는 방식
export function setupAddButtonHandler(
    addBtn,
    cartDisplayEl,
    selectProductEl,
    productList,
    calcCart,
    setLastSel
) {
    // 추가 버튼 클릭
    addBtn.addEventListener("click", () => {
        console.log("추가 버튼 클릭");

        // 상품 선택하는 드롭다운
        const selItem = selectProductEl.value;
        const itemToAdd = productList.find((p) => p.id === selItem);

        if (!itemToAdd || itemToAdd.q <= 0) {
            return;
        }

        const item = document.getElementById(itemToAdd.id);
        console.log("item: ", item);

        if (item) updateExistingItem(item, itemToAdd);
        else createNewCartItem(itemToAdd, cartDisplayEl);

        calcCart();
        setLastSel(selItem);
    });
}

// 계속 장바구니 목록 업데이트
function updateExistingItem(item, itemToAdd) {
    const newQty =
        parseInt(item.querySelector("span").textContent.split("x ")[1]) + 1;

    if (newQty <= itemToAdd.q) {
        item.querySelector(
            "span"
        ).textContent = `${itemToAdd.name} - ${itemToAdd.val}원 x ${newQty}`;
        // itemToAdd.name + " - " + itemToAdd.val + "원 x " + newQty;
        itemToAdd.q--;
    } else {
        alert("재고가 부족합니다.");
    }
}

// 첫 추가 시 생성되는 장바구니 목록 엘리먼트
function createNewCartItem(itemToAdd, cartDisplayEl) {
    const newItem = createCartItem(itemToAdd.id);
    newItem.innerHTML = `
                <span>${itemToAdd.name} - ${itemToAdd.val}원 x 1</span>
                <div>
                    <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" 
                            data-product-id="${itemToAdd.id}" data-change="-1">-</button>
                    <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" 
                            data-product-id="${itemToAdd.id}" data-change="1">+</button>
                    <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" 
                            data-product-id="${itemToAdd.id}">삭제</button>
                </div>
            `;
    cartDisplayEl.appendChild(newItem);
    itemToAdd.q--;
}

export function setupCartItemEvents(cartDisplayEl, productList, calcCart) {
    cartDisplayEl.addEventListener("click", (event) => {
        console.log("cartDisplayEl");

        const tgt = event.target;
        console.log("tgt: ", tgt);

        // quantity-change: - + class
        // remove-item: 삭제 class
        if (
            !tgt.classList.contains("quantity-change") &&
            !tgt.classList.contains("remove-item")
        )
            return;

        const prodId = tgt.dataset.productId;
        const itemElem = document.getElementById(prodId);
        const prod = productList.find(function (p) {
            return p.id === prodId;
        });
        if (tgt.classList.contains("quantity-change")) {
            const qtyChange = parseInt(tgt.dataset.change);
            const newQty =
                parseInt(
                    itemElem.querySelector("span").textContent.split("x ")[1]
                ) + qtyChange;
            if (
                newQty > 0 &&
                newQty <=
                    prod.q +
                        parseInt(
                            itemElem
                                .querySelector("span")
                                .textContent.split("x ")[1]
                        )
            ) {
                itemElem.querySelector("span").textContent =
                    itemElem.querySelector("span").textContent.split("x ")[0] +
                    "x " +
                    newQty;
                prod.q -= qtyChange;
            } else if (newQty <= 0) {
                itemElem.remove();
                prod.q -= qtyChange;
            } else {
                alert("재고가 부족합니다.");
            }
        } else if (tgt.classList.contains("remove-item")) {
            const remQty = parseInt(
                itemElem.querySelector("span").textContent.split("x ")[1]
            );
            prod.q += remQty;
            itemElem.remove();
        }
        calcCart();
    });
}
