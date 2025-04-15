
import { TAGS } from "../../constant/tags";
import { createElement } from "../utils/createElement";

export const makeUI = () =>{
    // 요소 생성하기
    const root=document.getElementById(TAGS.APP);

    const cont = createElement(TAGS.DIV,{
      className:'bg-gray-100 p-8'
    })

    const wrap = createElement(TAGS.DIV,{
    className:'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8'
    })

    const hTxt = createElement(TAGS.H1,{
      className:'text-2xl font-bold mb-4',
      textContent:'장바구니'
    })

    const cartDisplay = createElement(TAGS.DIV,{
      id:'cart-items',
    })

    const sum = createElement(TAGS.DIV,{
      id:'cart-total',
      className:'text-xl font-bold my-4'
    })

    const select = createElement(TAGS.SELECT,{
      id:'product-select',
      className:'border rounded p-2 mr-2'
    })

    const addBtn = createElement(TAGS.BUTTON,{
      id:'add-to-cart',
      className:'bg-blue-500 text-white px-4 py-2 rounded',
      textContent:'추가'
    })

    const stockInfo = createElement(TAGS.DIV,{
      id:'stock-status',
      className:'text-sm text-gray-500 mt-2'
    })

    const elements = [hTxt,cartDisplay, sum, select, addBtn, stockInfo];
    elements.forEach(child => wrap.appendChild(child));

    cont.appendChild(wrap);
    root.appendChild(cont);

  return {
    select,
    cartDisplay,
    stockInfo,
    sum
  } 
}