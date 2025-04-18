export function createProductElement(product) {
  const $product = document.createElement("div");
  $product.id = product.id;
  $product.className = "flex justify-between items-center mb-2";
  $product.innerHTML =
    "<span>" +
    product.name +
    " - " +
    product.val +
    "원 x 1</span><div>" +
    '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
    product.id +
    '" data-change="-1">-</button>' +
    '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
    product.id +
    '" data-change="1">+</button>' +
    '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
    product.id +
    '">삭제</button></div>';
  return $product;
}
// dataset id 요소 get

export function getProductElementAndProduct($element, productList) {
  if (!$element) return;

  const productId = $element.dataset.productId;
  const $product = document.getElementById(productId);
  const product = productList.find((product) => product.id === productId);
  return { $product, product };
}
