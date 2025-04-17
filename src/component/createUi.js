export function createUI() {
  const root = document.getElementById('app');

  const cont = document.createElement('div');
  const wrap = document.createElement('div');
  const hTxt = document.createElement('h1');
  const cartDisp = document.createElement('div');
  const sum = document.createElement('div');
  const sel = document.createElement('select');
  const addBtn = document.createElement('button');
  const stockInfo = document.createElement('div');

  // ID 부여
  cartDisp.id = 'cart-items';
  sum.id = 'cart-total';
  sel.id = 'product-select';
  addBtn.id = 'add-to-cart';
  stockInfo.id = 'stock-status';

  // 클래스 설정
  cont.className = 'bg-gray-100 p-8';
  wrap.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  hTxt.className = 'text-2xl font-bold mb-4';
  sum.className = 'text-xl font-bold my-4';
  sel.className = 'border rounded p-2 mr-2';
  addBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  stockInfo.className = 'text-sm text-gray-500 mt-2';

  // 텍스트 설정
  hTxt.textContent = '장바구니';
  addBtn.textContent = '추가';

  // 구조 조립
  wrap.appendChild(hTxt);
  wrap.appendChild(cartDisp);
  wrap.appendChild(sum);
  wrap.appendChild(sel);
  wrap.appendChild(addBtn);
  wrap.appendChild(stockInfo);
  cont.appendChild(wrap);
  root.appendChild(cont);

  return { cartDisp, sum, sel, addBtn, stockInfo };
}
