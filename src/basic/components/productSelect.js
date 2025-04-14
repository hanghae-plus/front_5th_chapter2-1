export default function productSelect() {
  const productSelect = document.createElement('select');
  productSelect.id = 'product-select';
  productSelect.className = 'border rounded p-2 mr-2';
  return productSelect;
}
