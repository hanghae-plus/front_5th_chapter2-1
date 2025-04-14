import { createElement } from "./domUtils.js";

export function createContainer() {
    return createElement("div", {
        class: "bg-gray-100 p-8",
    });
}
export function createWrapper() {
    return createElement("div", {
        class: "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8",
    });
}
export function createCartTitle() {
    return createElement(
        "h1",
        {
            class: "text-2xl font-bold mb-4",
        },
        "장바구니"
    );
}
export function createCartDisplay() {
    return createElement("div", {
        id: "cart-items",
    });
}
export function createTotalAmount() {
    return createElement("div", {
        id: "cart-total",
        class: "text-xl font-bold my-4",
    });
}
export function createSelectProduct() {
    return createElement("select", {
        id: "product-select",
        class: "border rounded p-2 mr-2",
    });
}
export function createAddBtn() {
    return createElement(
        "button",
        {
            id: "add-to-cart",
            class: "bg-blue-500 text-white px-4 py-2 rounded",
        },
        "추가"
    );
}
export function createProductStock() {
    return createElement("div", {
        id: "stock-status",
        class: "text-sm text-gray-500 mt-2",
    });
}
