export function ProductSelectItem({ id, name, price, quantity }) {
  const selectItemElem = document.createElement("option");
  selectItemElem.value = id;
  selectItemElem.textContent = `${name} - ${price}원`;

  if (quantity === 0) selectItemElem.disabled = true;

  return selectItemElem;
}
