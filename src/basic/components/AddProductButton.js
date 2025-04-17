export const AddProductBtn = () => {
  let addProductBtn = document.createElement("button");
  addProductBtn.id = "add-to-cart";
  addProductBtn.className = "bg-blue-500 text-white px-4 py-2 rounded";
  addProductBtn.textContent = "추가";
  
  // 상품담기 버튼 이벤트 핸들러
  addProductBtn.addEventListener("click", function () {
    let selectProduct = cartList.value;
    let productToAdd = productList.find(function (p) {
      return p.id === selectProduct;
    });
    if (productToAdd && productToAdd.quantity > 0) {
      let item = document.getElementById(productToAdd.id);
      if (item) {
        let newQuantity = parseInt(item.querySelector("span").textContent.split("x ")[1]) + 1;
        if (newQuantity <= productToAdd.quantity) {
          item.querySelector("span").textContent =
            productToAdd.name + " - " + productToAdd.price + "원 x " + newQuantity;
          productToAdd.quantity--;
        } else {
          alert("재고가 부족합니다.");
        }
      } else {
        let newItem = document.createElement("div");
        newItem.id = productToAdd.id;
        newItem.className = "flex justify-between items-center mb-2";
        newItem.innerHTML =
          "<span>" +
          productToAdd.name +
          " - " +
          productToAdd.price +
          "원 x 1</span><div>" +
          '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
          productToAdd.id +
          '" data-change="-1">-</button>' +
          '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
          productToAdd.id +
          '" data-change="1">+</button>' +
          '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
          productToAdd.id +
          '">삭제</button></div>';
        cartContainer.appendChild(newItem);
        productToAdd.quantity--;
      }
      calcCart();
      lastSel = selectProduct;
    }
  });
  return AddProductBtn;
};
