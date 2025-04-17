import { useState } from 'react';
import { Select } from '../Select';
import { AddButton } from '../AddButton';
import { useCartControls } from '../../context';

export const ProductSelect = () => {
  const { productList } = useCartControls();
  const [productId, setProductId] = useState<string>(productList[0].id ?? 0);

  return (
    <div className="flex">
      <Select productId={productId} onChange={setProductId} />
      <AddButton productId={productId} />
    </div>
  );
};
