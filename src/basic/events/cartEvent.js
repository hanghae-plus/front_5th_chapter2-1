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
