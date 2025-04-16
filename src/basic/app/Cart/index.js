import { ElementIds } from "../constants.js";
import { createCartDisplay } from "./components/CartDisplay/index.js";
import { createAddProduct } from "./components/AddProduct/index.js";

function createHeaderTxt() {
  const hTxt = document.createElement("h1");
  hTxt.className = "text-2xl font-bold mb-4";
  hTxt.textContent = "장바구니";

  return hTxt;
}

function createSum() {
  const sum = document.createElement("div");
  sum.id = ElementIds.SUM;
  sum.className = "text-xl font-bold my-4";

  return sum;
}

export function createCart() {
  const wrap = document.createElement("div");
  wrap.className =
    "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";

  const cartCompositions = [
    createHeaderTxt(),
    createCartDisplay(),
    createSum(),
    ...createAddProduct(),
  ];

  cartCompositions.map((child) => wrap.appendChild(child));
  return wrap;
}
