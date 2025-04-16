import products from "../consts/products";

// 상품 선택 옵션 업데이트
const updateSelectOptions = () => {
  var select = document.createElement("select");
  select.id = "product-select";
  select.innerHTML = "";
  select.className = "border rounded p-2 mr-2";

  products.forEach(function (item) {
    var opt = document.createElement("option");
    opt.value = item.id;
    opt.textContent = item.name + " - " + item.price + "원";
    if (item.stock === 0) opt.disabled = true;
    select.appendChild(opt);
  });
  return select;
};

export default updateSelectOptions;
