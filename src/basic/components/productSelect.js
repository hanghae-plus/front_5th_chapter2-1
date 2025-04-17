import {state} from "../store/state.js";

export const updateSelectedOptions = () => {
    const select = state.elements.select;
    if (!select) {
        console.log('select 렌더링 전');
        return;
    }

    select.innerHTML = '';

    state.products.forEach((product) => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} - ${product.val}원`;

        if (product.q === 0) {
            option.disabled = true;
        }

        select.appendChild(option);
    });
}