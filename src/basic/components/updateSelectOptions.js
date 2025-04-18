import { createSelectProduct } from "../utils/createElement.js";

export function updateSelectOptions(productList, parentElement) {
    parentElement.innerHTML = "";
    productList.forEach(function (item) {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.name + " - " + item.val + "원";
        if (item.q === 0) option.disabled = true;
        parentElement.appendChild(option);
    });
}
