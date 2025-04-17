export const updateSelectOptions = (products, select) => {
  select.innerHTML = '';

  products.forEach((item) => {
    const option = document.createElement('option');

    option.value = item.id;
    option.textContent = `${item.name} - ${item.price}원`;

    if (item.stock === 0) option.disabled = true;

    select.appendChild(option);
  });
};
