import { useState } from 'react';

export const useSelectedProduct = (initialProductId: string) => {
  const [selectedProductId, setSelectedProductId] = useState(initialProductId);
  return { selectedProductId, setSelectedProductId };
};
