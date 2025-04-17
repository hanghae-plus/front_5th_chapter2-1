import { useState } from 'react';

export const useSelectedProduct = () => {
  const [selectedProductId, setSelectedProductId] = useState('');
  return { selectedProductId, setSelectedProductId };
};
