import React, { useEffect, useState } from 'react';

import { findProduct, prodList } from '../../../../store/prodList.js';
import { addItemToCart } from './logic.js';
import { ElementIds } from '../../../../../shared/app/constants.js';

export function AddProduct({ productList }) {
  const [selectedValue, setSelectedValue] = useState(null);
  function isSoldOut(quantity) {
    return quantity === 0;
  }

  function handleChangeSelect(e) {
    setSelectedValue(e.target.value);
  }

  function handleClickAddBtn() {
    const itemToAdd = findProduct(selectedValue);
    if (!itemToAdd || itemToAdd.q <= 0) {
      return;
    }

    addItemToCart(itemToAdd);
  }

  return (
    <>
      <select
        id={ElementIds.SEL}
        className={'border rounded p-2 mr-2'}
        onChange={handleChangeSelect}
      >
        {prodList.map((item) => (
          <option id={item.id} disabled={isSoldOut(item.q)} value={item.id}>
            {item.name + ' - ' + item.val + '원'}
          </option>
        ))}
      </select>
      <button
        id={ElementIds.ADD_BTN}
        className={'bg-blue-500 text-white px-4 py-2 rounded'}
        onClick={handleClickAddBtn}
      >
        추가
      </button>
      <div id={ElementIds.STOCK_INFO} className={'text-sm text-gray-500 mt-2'}>
        {' '}
        {productList}
      </div>
    </>
  );
}
