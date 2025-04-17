(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const i of c.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function e(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(n){if(n.ep)return;n.ep=!0;const c=e(n);fetch(n.href,c)}})();const a={products:[{id:"p1",name:"상품1",val:1e4,q:50},{id:"p2",name:"상품2",val:2e4,q:30},{id:"p3",name:"상품3",val:3e4,q:20},{id:"p4",name:"상품4",val:15e3,q:0},{id:"p5",name:"상품5",val:25e3,q:10}],state:{lastSel:null,bonusPts:0,totalAmt:0,itemCnt:0},element:{sel:null,addBtn:null,cartDisp:null,sum:null,stockInfo:null}};function p(){const s=a.products,t=document.getElementById("product-select");t.innerHTML="",s.forEach(function(e){let o=document.createElement("option");o.value=e.id,o.textContent=e.name+" - "+e.val+"원",e.q===0&&(o.disabled=!0),t.appendChild(o)})}const x=()=>{const s=document.getElementById("app");s.innerHTML=`
    <div class="bg-gray-100 p-8">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 id="title" class="text-2xl font-bold mb-4">장바구니</h1>
        <div id="cart-items"></div>
        <div id="cart-total" class="text-xl font-bold my-4"></div>
        <select id="product-select" class="border rounded p-2 mr-2"></select>
        <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
        <div id="stock-status" class="text-sm text-gray-500 mt-2"></div>
      </div>
    </div>
  `;const t=document.getElementById("cart-items"),e=document.getElementById("cart-total"),o=document.getElementById("product-select"),n=document.getElementById("add-to-cart"),c=document.getElementById("stock-status");a.element.cartDisp=t,a.element.sum=e,a.element.sel=o,a.element.addBtn=n,a.element.stockInfo=c,p()};function q(){const s=a.products;setTimeout(()=>{setInterval(()=>{const t=s[Math.floor(Math.random()*s.length)];Math.random()<.3&&t.q>0&&(t.val=Math.round(t.val*.8),alert(`번개세일! ${t.name}이(가) 20% 할인 중입니다!`),p())},3e4)},Math.random()*1e4)}function b(){setTimeout(()=>{setInterval(()=>{const s=a.products,t=a.state.lastSel;if(t){const e=s.find(o=>o.id!==t&&o.q>0);e&&(alert(`${e.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`),e.val=Math.round(e.val*.95),p())}},6e4)},Math.random()*2e4)}function I(){const s=a.products;let t="";s.forEach(e=>{e.q<5&&(t+=e.name+": "+(e.q>0?"재고 부족 ("+e.q+"개 남음)":"품절")+`
`)}),a.element.stockInfo.textContent=t}function C(s){const{totalAmt:t}=a.state,e=Math.floor(t/1e3);a.state.bonusPts=e;let o=document.getElementById("loyalty-points");o||(o=document.createElement("span"),o.id="loyalty-points",o.className="text-blue-500 ml-2",s.appendChild(o)),o.textContent=`(포인트: ${e})`}const E={p1:.1,p2:.15,p3:.2,p4:.05,p5:.25};function f(){const s=a.element.cartDisp.children,{products:t,state:e}=a;let o=0,n=0,c=0;Array.from(s).forEach(l=>{var y;const r=t.find(v=>v.id===l.id);if(!r)return;const m=((y=l.querySelector("span"))==null?void 0:y.textContent)||"",d=parseInt(m.split("x ")[1])||0,u=r.val*d,g=d>=10&&E[r.id]||0,h=u*(1-g);c+=d,o+=u,n+=h});let i=S(c,o,n);e.itemCnt=c,e.totalAmt=Math.round(n),$(e.totalAmt,i),I(),C(a.element.sum)}function S(s,t,e){if(s<30)return(t-e)/t;const o=t*.25,n=t-e;return o>n?(a.state.totalAmt=t*(1-.25),.25):n/t}function $(s,t){const e=a.element.sum;if(e.textContent=`총액: ${Math.round(s)}원`,t>0){const o=document.createElement("span");o.className="text-green-500 ml-2",o.textContent=`(${(t*100).toFixed(1)}% 할인 적용)`,e.appendChild(o)}}function w(s){const t=document.createElement("div");return t.id=s.id,t.className="flex justify-between items-center mb-2",t.innerHTML=`
        <span>${s.name} - ${s.val}원 x 1</span>
        <div>
            <button
                class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                data-product-id="${s.id}"
                data-change="-1"
            >-</button>
            <button
                class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                data-product-id="${s.id}"
                data-change="1"
            >+</button>
            <button
                class="remove-item bg-red-500 text-white px-2 py-1 rounded"
                data-product-id="${s.id}"
            >삭제</button>
        </div>
    `,t}function L(){const{sel:s,addBtn:t,cartDisp:e}=a.element;t.addEventListener("click",()=>{const o=s.value,n=a.products.find(i=>i.id===o);if(!n||n.q<=0)return;const c=document.getElementById(n.id);if(c){const i=c.querySelector("span"),r=parseInt(i.textContent.split("x ")[1])+1;if(r<=n.q)i.textContent=`${n.name} - ${n.val}원 x ${r}`,n.q--;else{alert("재고가 부족합니다.");return}}else{const i=w(n);e.appendChild(i),n.q--}f(),a.state.lastSel=o})}function M(){const{cartDisp:s}=a.element;s.addEventListener("click",t=>{const e=t.target,o=e.classList.contains("quantity-change"),n=e.classList.contains("remove-item");if(!o&&!n)return;const c=e.dataset.productId,i=a.products.find(d=>d.id===c),l=document.getElementById(c);if(!i||!l)return;const r=l.querySelector("span"),m=parseInt(r.textContent.split("x ")[1]);if(o){const d=parseInt(e.dataset.change),u=m+d;u>0&&u<=i.q+m?(r.textContent=`${i.name} - ${i.val}원 x ${u}`,i.q-=d):u<=0?(l.remove(),i.q+=m):alert("재고가 부족합니다.")}n&&(i.q+=m,l.remove()),f()})}x();f();q();b();L();M();
