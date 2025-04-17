import { useCalcCart } from "../hooks/useCalcCart";

export default function handleAddProduct(
  cartList,
  productList,
  cartContainer,
  stockInfo,
  totalAmount,
  itemCount,
  totalPrice,
  lastSel,
) {
  return function (event) {
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
      useCalcCart(totalAmount, itemCount, cartContainer, productList, stockInfo, totalPrice);
      lastSel = selectProduct;
    }
  };
}
