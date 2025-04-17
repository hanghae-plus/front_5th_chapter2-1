import { useState } from 'react';

const useSelect = () => {
  const [selectedItemId, setSelectedItemId] = useState('p1');

  const handleItemSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItemId(event.target.value);
  };
  return { selectedItemId, handleItemSelect };
};
export default useSelect;
