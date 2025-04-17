/** select option을 업데이트하는 함수 */
export function updateSelectOption(products) {
    const $select = document.getElementById('product-select');

    if ($select === null || products === null) {
        return;
    }

    $select.innerHTML = '';

    products.forEach(function (item) {
        const $option = document.createElement('option');

        $option.value = item.id;
        $option.textContent = item.name + ' - ' + item.price + '원';

        if (item.quantity === 0) {
            $option.disabled = true;
        }

        $select.appendChild($option);
    });
}
