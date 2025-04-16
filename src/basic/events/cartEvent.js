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
    addBtn.addEventListener("click", function () {
        console.log("추가 버튼 클릭");

        // 상품 선택하는 드롭다운
        var selItem = selectProductEl.value;
        console.log("selItem: ", selItem);

        var itemToAdd = productList.find(function (p) {
            return p.id === selItem;
        });
        console.log("itemToAdd: ", itemToAdd);

        if (itemToAdd && itemToAdd.q > 0) {
            var item = document.getElementById(itemToAdd.id);
            console.log("item: ", item);

            if (item) {
                console.log("들어오니3?");

                var newQty =
                    parseInt(
                        item.querySelector("span").textContent.split("x ")[1]
                    ) + 1;
                if (newQty <= itemToAdd.q) {
                    item.querySelector("span").textContent =
                        itemToAdd.name +
                        " - " +
                        itemToAdd.val +
                        "원 x " +
                        newQty;
                    itemToAdd.q--;
                } else {
                    alert("재고가 부족합니다.");
                }
            } else {
                console.log("들어오니4?");

                var newItem = document.createElement("div");
                newItem.id = itemToAdd.id;
                newItem.className = "flex justify-between items-center mb-2";
                newItem.innerHTML =
                    "<span>" +
                    itemToAdd.name +
                    " - " +
                    itemToAdd.val +
                    "원 x 1</span><div>" +
                    '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
                    itemToAdd.id +
                    '" data-change="-1">-</button>' +
                    '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
                    itemToAdd.id +
                    '" data-change="1">+</button>' +
                    '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
                    itemToAdd.id +
                    '">삭제</button></div>';
                cartDisplayEl.appendChild(newItem);
                itemToAdd.q--;
            }
            calcCart();
            setLastSel(selItem);
        }
    });
}
export function setupCartItemEvents(cartDisplayEl, productList, calcCart) {
    cartDisplayEl.addEventListener("click", function (event) {
        console.log("cartDisplayEl");

        var tgt = event.target;
        console.log("tgt: ", tgt);

        // quantity-change: - + class
        // remove-item: 삭제 class
        if (
            tgt.classList.contains("quantity-change") ||
            tgt.classList.contains("remove-item")
        ) {
            var prodId = tgt.dataset.productId;
            var itemElem = document.getElementById(prodId);
            var prod = productList.find(function (p) {
                return p.id === prodId;
            });
            if (tgt.classList.contains("quantity-change")) {
                var qtyChange = parseInt(tgt.dataset.change);
                var newQty =
                    parseInt(
                        itemElem
                            .querySelector("span")
                            .textContent.split("x ")[1]
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
                        itemElem
                            .querySelector("span")
                            .textContent.split("x ")[0] +
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
                var remQty = parseInt(
                    itemElem.querySelector("span").textContent.split("x ")[1]
                );
                prod.q += remQty;
                itemElem.remove();
            }
            calcCart();
        }
    });
}
