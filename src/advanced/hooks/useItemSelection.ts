import { useState } from 'react';

export const useItemSelection = () => {
  const [selectedId, setSelectedId] = useState<string>('p1');

  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(e.target.value);
  };

  return {
    selectedId,
    handleItemChange,
  };
};
