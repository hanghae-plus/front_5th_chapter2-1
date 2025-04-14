import {
    createContainer,
    createWrapper,
    createCartTitle,
    createCartDisplay,
    createTotalAmount,
    createSelectProduct,
    createAddBtn,
    createProductStock,
} from "../utils/createElement";

export function buildLayout() {
    const cartDisplayEl = createCartDisplay();
    const totalAmountEl = createTotalAmount();
    const selectProductEl = createSelectProduct();
    const addBtn = createAddBtn();
    // const productStockEl = createProductStock();
    const containerEl = createContainer();
    const wrapperEl = createWrapper();
    const cartTitleEl = createCartTitle();

    // appendChild로 조립
    wrapperEl.appendChild(cartTitleEl);
    wrapperEl.appendChild(cartDisplayEl);
    wrapperEl.appendChild(totalAmountEl);
    wrapperEl.appendChild(selectProductEl);
    wrapperEl.appendChild(addBtn);
    // wrapperEl.appendChild(productStockEl);
    containerEl.appendChild(wrapperEl);
    // rootEl.appendChild(containerEl);

    return wrapperEl;
}

// 함수로 정의됨 - 호출해야 DOM 요소를 반환함
export function selectLayout() {
    const selectProductEl = createSelectProduct();
    return selectProductEl;
}

// 함수로 정의됨 - 호출해야 DOM 요소를 반환함
export function cartDisplayLayout() {
    const cartDisplayEl = createCartDisplay();
    return cartDisplayEl;
}
