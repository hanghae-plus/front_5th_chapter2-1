import { LAYOUT } from "../constants";
import { handleAddButtonClick, handleCartItemRemove, handleCountChange } from "../handler";
import { globalState } from "../state/globalState";
import type { GlobalState } from "../types";
import { calculateDiscountRate, setLuckySaleEvent, setSuggestSaleEvent } from "../utils";
import { CartList, ProductSelector, SoldOutList, TotalPrice } from "./cart";
import { Header } from "./common";

export function App() {
  const app = document.getElementById("app");
  const container = document.createElement("div");
  const wrapper = document.createElement("div");

  this.state = globalState;
  this.setState = (newState: GlobalState) => {
    const isChanged = JSON.stringify(this.state) !== JSON.stringify(newState);
    if (isChanged) {
      this.state = newState;
    }
    cartList.setState(this.state);
    totalPrice.setState(this.state);
    productSelector.setState(this.state);
    soldOutList.setState(this.state);
  };

  this.init = () => {
    container.className = LAYOUT.CONTAINER.STYLE;
    wrapper.className = LAYOUT.WRAPPER.STYLE;
    container.appendChild(wrapper);
    app?.appendChild(container);
  };

  this.setupPromotionalEvents = () => {
    // 번개세일 (20% 할인) 이벤트
    setTimeout(() => {
      setInterval(() => {
        const updatedProductList = setLuckySaleEvent(this.state);
        this.setState({
          ...this.state,
          productList: updatedProductList,
        });
        console.log(updatedProductList);
        console.log(this.state.productList);
      }, 30000);
    }, Math.random() * 10000);

    // 추천 할인 (추가 5% 할인) 이벤트
    setTimeout(() => {
      setInterval(() => {
        const updatedProductList = setSuggestSaleEvent(this.state);
        this.setState({
          ...this.state,
          productList: updatedProductList,
        });
      }, 60000);
    }, Math.random() * 20000);
  };

  new Header({ target: wrapper });
  const cartList = new CartList({
    target: wrapper,
    initialState: this.state,
    handleCountChange: (productId: string, change: number) => {
      const { updatedProductList, updatedCartList, newTotalPrice } = handleCountChange(productId, change, this.state);

      const { finalDiscountRate, finalDiscountPrice } = calculateDiscountRate(newTotalPrice, updatedCartList);

      this.setState({
        productList: updatedProductList,
        cartList: updatedCartList,
        totalPrice: finalDiscountPrice,
        totalDiscountRate: finalDiscountRate,
      });
    },
    handleCartItemRemove: (productId: string) => {
      const { updatedProductList, updatedCartList, newTotalPrice } = handleCartItemRemove(productId, this.state);

      const { finalDiscountRate, finalDiscountPrice } = calculateDiscountRate(newTotalPrice, updatedCartList);

      this.setState({
        productList: updatedProductList,
        cartList: updatedCartList,
        totalPrice: finalDiscountPrice,
        totalDiscountRate: finalDiscountRate,
      });
    },
  });
  const totalPrice = new TotalPrice({ target: wrapper, initialState: this.state });
  const productSelector = new ProductSelector({
    target: wrapper,
    initialState: this.state,
    handleButtonClick: (selectedProductId: string) => {
      const { updatedProductList, updatedCartList, newTotalPrice, selectedProduct } = handleAddButtonClick(
        selectedProductId,
        this.state,
      );

      const { finalDiscountRate, finalDiscountPrice } = calculateDiscountRate(newTotalPrice, updatedCartList);

      this.setState({
        productList: updatedProductList,
        cartList: updatedCartList,
        totalPrice: finalDiscountPrice,
        totalDiscountRate: finalDiscountRate,
        lastSelectedProduct: selectedProduct,
      });
    },
  });
  const soldOutList = new SoldOutList({ target: wrapper, initialState: this.state });

  this.init();

  this.setupPromotionalEvents();
}
