let $sel;
let $addBtn;

function createSelElement() {
  $sel = document.createElement('select');
  $sel.id = 'product-select';
  $sel.className = 'border rounded p-2 mr-2';
  return $sel;
}

function createAddBtnElement() {
  $addBtn = document.createElement('button');
  $addBtn.id = 'add-to-cart';
  $addBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  $addBtn.textContent = '추가';
  return $addBtn;
}

function renderSelectProductList(list) {
  $sel.innerHTML = '';
  list.forEach(function (item) {
    let $opt = document.createElement('option');
    $opt.value = item.id;
    $opt.textContent = item.name + ' - ' + item.price + '원';
    if (item.quantity === 0) $opt.disabled = true;
    $sel.appendChild($opt);
  });
}

function getSelElement() {
  return $sel;
}

function getAddBtnElement() {
  return $addBtn;
}

export {
  createSelElement,
  createAddBtnElement,
  renderSelectProductList,
  getSelElement,
  getAddBtnElement,
};
