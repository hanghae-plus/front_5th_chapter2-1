import {cartState, state} from '../main.basic'

let $template

const createNewMainNode = () => {
    if(!$template) {
        $template = document.getElementById('main')
    }

    return $template
            .content
            .firstElementChild
            .cloneNode(true)
}

const getMainElement = () => {
    const $element = createNewMainNode()
    return $element;
}

const addHandleAddEvent = ($targetElement) => {
    $targetElement
        .querySelector('#add-to-cart')
        .addEventListener("click", () => {
            const $productSelect = document.querySelector("#product-select");
            const selItem = $productSelect.value; 
            const itemToAdd = { id: selItem, ...state.stock[selItem] };

            if (!itemToAdd || itemToAdd.quantity <= 0) {
                alert("재고가 부족합니다.");
                return;
            }
            cartState[selItem]++;
        
            state.lastSelectedProduct = selItem;
        })
}

const addHandleRemoveItem = ($targetElement) => {
    $targetElement
        .querySelector('#cart-items')
        .addEventListener("click", event => {
            const tgt = event.target;
            if (tgt.classList.contains("remove-item")) {
                const prodId = tgt.dataset.productId;
                const remQty = cartState[prodId];

                cartState[prodId] -= remQty;
            }
        })
}

const addHandleClickQuantityChange = ($targetElement) => {
    $targetElement
        .querySelector('#cart-items')
        .addEventListener("click", event => {
            const tgt = event.target;
            if (tgt.classList.contains("quantity-change")) {
                const prodId = tgt.dataset.productId;
                const qtyChange = parseInt(tgt.dataset.change); // -1 | 1

                if (state.stock[prodId].quantity === 0) {
                alert("재고가 부족합니다.");
                return;
                }
                cartState[prodId] += qtyChange;
            }
        })
}

export default ($targetElement) => {
    const newApp = $targetElement.cloneNode(true)

    newApp.innerHTML = ''

    newApp.appendChild(getMainElement())
    addHandleAddEvent(newApp)
    addHandleRemoveItem(newApp)
    addHandleClickQuantityChange(newApp)

    return newApp
}