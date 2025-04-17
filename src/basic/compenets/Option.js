export const Option = ({ id, name, price, stock }) => `
<option data-id="${id}" ${stock === 0 ? `disabled` : ''}>
  ${name} - ${price}원
</option>`;
