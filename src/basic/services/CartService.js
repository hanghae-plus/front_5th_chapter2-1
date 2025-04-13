import { CartItem } from "../components/CartItem";
import { bonusPointsService } from "./BonusPointService";
import { discountService } from "./DiscountService";
import { productService } from "./ProductService";

class CartService {
  constructor() {
    this.lastSelected = 0;
    this.totalPrice = 0;
    this.totalQuantity = 0;
    this.originalTotalPrice = 0;
    this.items = [];
  }

  addToCart(selectedId) {
    let itemToAdd = productService.productList.find(function (p) {
      return p.id === selectedId;
    });
    if (itemToAdd && itemToAdd.q > 0) {
      let item = document.getElementById(itemToAdd.id);
      if (item) {
        let newQty =
          parseInt(item.querySelector("span").textContent.split("x ")[1]) + 1;
        if (newQty <= itemToAdd.q) {
          item.querySelector("span").textContent =
            itemToAdd.name + " - " + itemToAdd.val + "원 x " + newQty;
          itemToAdd.q--;
        } else {
          alert("재고가 부족합니다.");
        }
      } else {
        this.renderNewItem(itemToAdd);
      }
      this.calcCart();
      this.lastSelected = selectedId;
    }
  }

  removeFromCart(selectedItem) {
    let prodId = selectedItem.dataset.productId;
    let itemElem = document.getElementById(prodId);

    let prod = productService.productList.find(function (p) {
      return p.id === prodId;
    });
    if (selectedItem.classList.contains("quantity-change")) {
      let qtyChange = parseInt(selectedItem.dataset.change);
      let newQty =
        parseInt(itemElem.querySelector("span").textContent.split("x ")[1]) +
        qtyChange;
      if (
        newQty > 0 &&
        newQty <=
          prod.q +
            parseInt(itemElem.querySelector("span").textContent.split("x ")[1])
      ) {
        itemElem.querySelector("span").textContent =
          itemElem.querySelector("span").textContent.split("x ")[0] +
          "x " +
          newQty;
        prod.q -= qtyChange;
      } else if (newQty <= 0) {
        itemElem.remove();
        prod.q -= qtyChange;
      } else {
        alert("재고가 부족합니다.");
      }
    } else if (selectedItem.classList.contains("remove-item")) {
      let remQty = parseInt(
        itemElem.querySelector("span").textContent.split("x ")[1],
      );
      prod.q += remQty;
      itemElem.remove();
    }
    this.calcCart();
  }

  calcCart() {
    const prodList = productService.productList;
    this.totalQuantity = 0;
    this.originalTotalPrice = 0;
    this.totalPrice = 0;

    const cartDisp = document.getElementById("cart-items");
    const cartItems = cartDisp.children;

    if (cartItems.length === 0) {
      this.renderTotalPrice();
      bonusPointsService.bonusPoints = 0;
      bonusPointsService.renderBonusPts();
      return;
    }

    for (let i = 0; i < cartItems.length; i++) {
      let curItem;
      for (let j = 0; j < prodList.length; j++) {
        if (prodList[j].id === cartItems[i].id) {
          curItem = prodList[j];
          break;
        }
      }
      let q = parseInt(
        cartItems[i].querySelector("span").textContent.split("x ")[1],
      );
      let itemTot = curItem.val * q;
      let disc = 0;
      this.totalQuantity += q;
      this.originalTotalPrice += itemTot;
      if (q >= 10) {
        if (curItem.id === "p1") disc = 0.1;
        else if (curItem.id === "p2") disc = 0.15;
        else if (curItem.id === "p3") disc = 0.2;
        else if (curItem.id === "p4") disc = 0.05;
        else if (curItem.id === "p5") disc = 0.25;
      }
      this.totalPrice += itemTot * (1 - disc);
    }

    this.totalPrice = discountService.applyDiscount(
      this.totalQuantity,
      this.totalPrice,
      this.originalTotalPrice,
    );

    bonusPointsService.bonusPoints = this.totalPrice;

    this.renderTotalPrice();

    productService.updateStockInfo();
    bonusPointsService.renderBonusPts();
  }

  renderTotalPrice() {
    const sum = document.getElementById("cart-total");
    sum.textContent = `총액: ${Math.round(this.totalPrice)}원`;

    if (discountService.discountRate > 0) {
      sum.appendChild(
        `<span class="text-green-500 ml-2">(${discountService.discountRate * 100}% 할인 적용)</span>`,
      );
    }
  }

  renderNewItem(item) {
    const newItem = CartItem({
      id: item.id,
      name: item.name,
      price: item.val,
      quantity: 1,
    });

    const cartDisp = document.getElementById("cart-items");
    cartDisp.appendChild(newItem);

    item.q--;
  }
}

export const cartService = new CartService();
