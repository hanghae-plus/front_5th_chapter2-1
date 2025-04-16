import {
  addNewProductToCart,
  addProductToCart,
  calculateCart,
} from "./libs/cart";
import { productList } from "./stores";
import { getProductElementAndProduct } from "./utils/function";

export class AppComponent {
  // private 변수 선언
  #cartBox;
  #totalPrice;
  #select;
  #addBtn;
  #stockStatus;
  #container;
  #wrap;
  #h1;

  constructor(elementId) {
    this.elementId = elementId;

    // element 변수 선언
    this.#cartBox;
    this.#totalPrice;
    this.#select;
    this.#addBtn;
    this.#stockStatus;
    this.#container;
    this.#wrap;
    this.#h1;

    // 마지막 선택한 상품 id
    this.lastSelectedProductId;
  }

  // DOM 요소 생성
  #createElements() {
    this.#cartBox = document.createElement("div");
    this.#totalPrice = document.createElement("div");
    this.#select = document.createElement("select");
    this.#addBtn = document.createElement("button");
    this.#stockStatus = document.createElement("div");
    this.#container = document.createElement("div");
    this.#wrap = document.createElement("div");
    this.#h1 = document.createElement("h1");
  }

  // DOM 요소 textContent 설정
  #setTextContent() {
    this.#totalPrice.textContent = "총액: 0원(포인트: 0)";
    this.#h1.textContent = "장바구니";
  }

  // DOM 요소 property 설정
  #setProperties() {
    this.#cartBox.id = "cart-items";
    this.#totalPrice.id = "cart-total";
    this.#select.id = "product-select";
    this.#addBtn.id = "add-to-cart";
    this.#stockStatus.id = "stock-status";
    this.#totalPrice.className = "text-xl font-bold my-4";
    this.#select.className = "border rounded p-2 mr-2";
    this.#addBtn.className = "bg-blue-500 text-white px-4 py-2 rounded";
    this.#stockStatus.className = "text-sm text-gray-500 mt-2";
    this.#addBtn.textContent = "추가";

    this.#container.className = "bg-gray-100 p-8";
    this.#wrap.className =
      "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";
    this.#h1.className = "text-2xl font-bold mb-4";
  }

  // 상품 select 옵션 설정
  #setSelectOptions() {
    this.#select.innerHTML = "";
    productList.forEach((item) => {
      const $opt = document.createElement("option");
      $opt.value = item.id;
      $opt.textContent = item.name + " - " + item.val + "원";
      if (item.quantity === 0) $opt.disabled = true;
      this.#select.appendChild($opt);
    });
  }

  // DOM 요소 appendChild 설정
  #appendChilds() {
    this.#wrap.appendChild(this.#h1);
    this.#wrap.appendChild(this.#cartBox);
    this.#wrap.appendChild(this.#totalPrice);
    this.#wrap.appendChild(this.#select);
    this.#wrap.appendChild(this.#addBtn);
    this.#wrap.appendChild(this.#stockStatus);
    this.#container.appendChild(this.#wrap);

    const $parentElement = document.getElementById(this.elementId);
    $parentElement.appendChild(this.#container);
  }

  // 이벤트 설정
  #setEvent() {
    // 상품 추가 버튼 이벤트
    this.#addBtn.addEventListener("click", () => {
      const selectedProductId = this.#select.value;
      const targetProduct = productList.find(
        (product) => product.id === selectedProductId
      );
      if (!targetProduct || targetProduct.quantity < 1) return;

      const $product = document.getElementById(targetProduct.id);
      if ($product) {
        addProductToCart($product, targetProduct);
      } else {
        addNewProductToCart(this.#cartBox, targetProduct);
      }

      calculateCart(this.#totalPrice, this.#cartBox, this.#stockStatus);
      this.lastSelectedProductId = selectedProductId;
    });

    // 상품 + - 버튼 이벤트 (수량 변경)
    this.#cartBox.addEventListener("click", (event) => {
      const $target = event.target;

      // 수량 변경 또는 삭제 버튼이 아닌 경우 무시
      if (
        !$target.classList.contains("quantity-change") &&
        !$target.classList.contains("remove-item")
      ) {
        return;
      }

      const productId = $target.dataset.productId;
      const $product = document.getElementById(productId);
      const product = productList.find((p) => p.id === productId);

      if ($target.classList.contains("quantity-change")) {
        // 수량 변경 처리
        const changeAmount = parseInt($target.dataset.change);
        const currentQuantity = parseInt(
          $product.querySelector("span").textContent.split("x ")[1]
        );
        const newQuantity = currentQuantity + changeAmount;

        if (
          newQuantity > 0 &&
          newQuantity <= product.quantity + currentQuantity
        ) {
          $product.querySelector("span").textContent =
            product.name + " - " + product.val + "원 x " + newQuantity;
          product.quantity -= changeAmount;
        } else if (newQuantity <= 0) {
          $product.remove();
          product.quantity -= changeAmount;
        } else {
          alert("재고가 부족합니다.");
        }
      } else if ($target.classList.contains("remove-item")) {
        // 삭제 처리
        const remainQuantity = parseInt(
          $product.querySelector("span").textContent.split("x ")[1]
        );
        product.quantity += remainQuantity;
        $product.remove();
      }

      calculateCart(this.#totalPrice, this.#cartBox, this.#stockStatus);
    });

    // 장바구니 삭제 버튼 이벤트
    this.#cartBox.addEventListener("click", (event) => {
      const $target = event.target;
      const hasRemoveItemClass = $target.classList.contains("remove-item");
      if (!hasRemoveItemClass) return;

      const { $product, product } = getProductElementAndProduct(
        $target,
        productList
      );

      if (!$product || !product) return;
      const remainQuantity = parseInt(
        $product.querySelector("span").textContent.split("x ")[1]
      );
      product.quantity += remainQuantity;
      $product.remove();

      calculateCart(this.#totalPrice, this.#cartBox, this.#stockStatus);
    });
  }

  // AppComponent 렌더링
  render() {
    this.#createElements();
    this.#setProperties();
    this.#setTextContent();
    this.#setSelectOptions();
    this.#appendChilds();

    // DOM 요소 생성 후 이벤트 설정
    this.#setEvent();
  }
}
