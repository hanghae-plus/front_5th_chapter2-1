export function ProductSelectItem({ id, name, price, quantity }) {
  const $selectItem = document.createElement("option");
  $selectItem.value = id;
  $selectItem.textContent = `${name} - ${price}원`;

  if (quantity === 0) $selectItem.disabled = true;

  return $selectItem;
}
