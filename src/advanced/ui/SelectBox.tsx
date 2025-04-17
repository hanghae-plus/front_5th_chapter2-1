import React from 'react';
import { ProductStore } from '../../basic/store/productState';

const SelectBox = () => {
  const allProducts = ProductStore.getAllProducts();

  return (
    <select id="product-select" className="border rounded p-2 mr-2">
      {allProducts.map((product) => (
        <option
          value={product.id}
          key={product.id}
          disabled={!ProductStore.hasEnoughStock(product.id)}
        >
          {product.name} - {product.price}원
        </option>
      ))}
    </select>
  );
};

export default SelectBox;

// //  재고에따른 옵션 업데이트 함수
// const updateOptions = () => {
//   selectEle.innerHTML = '';

//   const allProducts = ProductStore.getAllProducts();

//   allProducts.forEach((item) => {
//     let opt = document.createElement('option');
//     opt.value = item.id;
//     opt.textContent = item.name + ' - ' + item.price + '원';

//     if (!ProductStore.hasEnoughStock(item.id)) {
//       opt.disabled = true;
//     }

//     selectEle.appendChild(opt);
//   });
// };
