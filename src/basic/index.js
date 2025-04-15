const App = () => {
  const $root = document.getElementById("app");

  try {
    const components = () => /* html */ `
          <div id="container" class="bg-gray-100 p-8">
              <div id="wrapper" class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
                  <h1 id="title" class="text-2xl font-bold mb-4">장바구니</h1>
                  <div id="cart-items"></div>
                  <div id="cart-total" class="text-xl font-bold my-4"></div>
                  <div id="stock-status" class="text-sm text-gray-500 mt-2">
                      <select id="product-select" class="border rounded p-2 mr-2"></select>
                      <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
                  </div>
              </div>
          </div> 
        `;
    $root.innerHTML = components();
  } catch (e) {
    console.error(e);
  }
};

App();
