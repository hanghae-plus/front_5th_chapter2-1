import { handleAddButtonClick, handleCartItemRemove, handleCountChange } from "../handler";
import { globalState } from "../state/globalState";
import type { GlobalState } from "../types";
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
    container.className = "bg-gray-100 p-8";
    wrapper.className = "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";
    container.appendChild(wrapper);
    app?.appendChild(container);
  };

  new Header({ target: wrapper });
  const cartList = new CartList({
    target: wrapper,
    initialState: this.state,
    handleCountChange: (productId: string, change: number) => {
      const { updatedProductList, updatedCartList, newTotalPrice } = handleCountChange(productId, change, this.state);

      this.setState({
        productList: updatedProductList,
        cartList: updatedCartList,
        totalPrice: newTotalPrice,
      });
    },
    handleCartItemRemove: (productId: string) => {
      const { updatedProductList, updatedCartList, newTotalPrice } = handleCartItemRemove(productId, this.state);

      this.setState({
        productList: updatedProductList,
        cartList: updatedCartList,
        totalPrice: newTotalPrice,
      });
    },
  });
  const totalPrice = new TotalPrice({ target: wrapper, initialState: this.state });
  const productSelector = new ProductSelector({
    target: wrapper,
    initialState: this.state,
    handleButtonClick: (selectedProductId: string) => {
      const { updatedProductList, updatedCartList, newTotalPrice } = handleAddButtonClick(
        selectedProductId,
        this.state,
      );

      this.setState({
        productList: updatedProductList,
        cartList: updatedCartList,
        totalPrice: newTotalPrice,
      });
    },
  });
  const soldOutList = new SoldOutList({ target: wrapper, initialState: this.state });

  this.init();
}
