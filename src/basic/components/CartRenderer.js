export const CartRenderer = (rootElement) => {
    const cartWrap = `
        <div class="bg-gray-100 p-8">
            <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
                <h1 class="text-2xl font-bold mb-4">장바구니</h1>
                <div id="cart-items"></div>
                <div id="cart-total" class="text-xl font-bold my-4"></div>
                <select id="product-select" class="border rounded p-2 mr-2"></select>
                <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
                <div id="stock-status" classs="text-sm text-gray-500 mt-2"></div>
            </div>
        </div>
    `
    rootElement.innerHTML = cartWrap;

    const cartItemList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const productSelect = document.getElementById('product-select');
    const addToCartButton = document.getElementById('add-to-cart');
    const stockStatus = document.getElementById('stock-status');

    return {
        cartItemList,
        cartTotal,
        productSelect,
        addToCartButton,
        stockStatus
    }
}