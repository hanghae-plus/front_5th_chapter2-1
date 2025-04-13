import {
  renderBonusPts,
  renderProductList,
  renderStockInfo,
  renderTotalPrice,
} from "../components/render";
import { productService } from "../services/ProductService";
import { cartStore } from "../stores/cartStore";
import { Template } from "./MainPage.template";

export function MainPage() {
  document.body.innerHTML = Template;

  cartStore.subscribe((state) => {
    if (state.error) {
      alert(state.error);
      return;
    }

    renderProductList();
    renderTotalPrice(state.totalPrice);
    renderBonusPts(state.bonusPoints);
    renderStockInfo();
  });

  renderProductList();
  renderTotalPrice(cartStore.getState().totalPrice);
  renderBonusPts(cartStore.getState().bonusPoints);

  setTimeout(function () {
    setInterval(function () {
      const prodList = productService.productList;
      let luckyItem = prodList[Math.floor(Math.random() * prodList.length)];
      if (Math.random() < 0.3 && luckyItem.q > 0) {
        luckyItem.val = Math.round(luckyItem.val * 0.8);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        renderProductList();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function () {
    setInterval(function () {
      if (cartStore.getState().lastSelected) {
        const prodList = productService.productList;
        let suggest = prodList.find(function (item) {
          return item.id !== cartStore.getState().lastSelected && item.q > 0;
        });
        if (suggest) {
          alert(
            suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!",
          );
          suggest.val = Math.round(suggest.val * 0.95);
          renderProductList();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}
