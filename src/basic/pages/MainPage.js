import { cartService } from "../services/CartService";
import { productService } from "../services/ProductService";
import { Template } from "./MainPage.template";

export function MainPage() {
  document.body.innerHTML = Template;

  productService.updateProductList();

  cartService.calcCart();

  setTimeout(function () {
    setInterval(function () {
      const prodList = productService.productList;
      let luckyItem = prodList[Math.floor(Math.random() * prodList.length)];
      if (Math.random() < 0.3 && luckyItem.q > 0) {
        luckyItem.val = Math.round(luckyItem.val * 0.8);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        productService.updateProductList();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function () {
    setInterval(function () {
      if (cartService.lastSelected) {
        const prodList = productService.productList;
        let suggest = prodList.find(function (item) {
          return item.id !== cartService.lastSelected && item.q > 0;
        });
        if (suggest) {
          alert(
            suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!",
          );
          suggest.val = Math.round(suggest.val * 0.95);
          productService.updateProductList();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}
