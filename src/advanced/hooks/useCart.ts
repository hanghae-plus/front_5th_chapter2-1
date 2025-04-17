import { useState } from 'react';

const useCart = () => {
  const [isClickAddButton, setIsClickAddButton] = useState(false);
  return { isClickAddButton, setIsClickAddButton };
};

export default useCart;
