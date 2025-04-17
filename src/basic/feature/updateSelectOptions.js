import { domRefs, state } from '../store/state';

export default function updateSelectOptions() {
    const { productSelectElement } = domRefs;
    const { productList } = state;

    productSelectElement.innerHTML = '';

    productList.forEach((product) => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} - ${product.val}원`;

        if (product.q === 0) {
            option.disabled = true;
        }
        productSelectElement.appendChild(option);
    });
}
