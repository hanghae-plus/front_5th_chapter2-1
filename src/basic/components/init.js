import { dom } from '../store';

export function inIt(root) {
  root.innerHTML = `
    <div class="bg-gray-100 p-8">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 class="text-2xl font-bold mb-4">장바구니</h1>
      </div>
    </div>
  `;
  const cont = root.firstElementChild;
  const wrap = cont.firstElementChild;

  dom.cartDisp = document.createElement('div');
  dom.cartDisp.id = 'cart-items';
  wrap.appendChild(dom.cartDisp);

  dom.sum = document.createElement('div');
  dom.sum.id = 'cart-total';
  dom.sum.className = 'text-xl font-bold my-4';
  wrap.appendChild(dom.sum);

  dom.sel = document.createElement('select');
  dom.sel.id = 'product-select';
  dom.sel.className = 'border rounded p-2 mr-2';
  wrap.appendChild(dom.sel);

  dom.stockInfo = document.createElement('div');
  dom.stockInfo.id = 'stock-status';
  dom.stockInfo.className = 'text-sm text-gray-500 mt-2';
  wrap.appendChild(dom.stockInfo);

  dom.addBtn = document.createElement('button');
  dom.addBtn.id = 'add-to-cart';
  dom.addBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  dom.addBtn.textContent = '추가';
  wrap.appendChild(dom.addBtn);
}
