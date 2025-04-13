export function ProductSelectItem({ id, name, price, quantity }) {
  const item = document.createElement("option");
  item.value = id;
  item.textContent = `${name} - ${price}원`;
  if (quantity === 0) item.disabled = true;
  return item;
}
