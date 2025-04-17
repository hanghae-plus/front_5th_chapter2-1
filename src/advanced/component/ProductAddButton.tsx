import React from 'react';

interface IProps {
  onClick: () => void;
}

function ProductAddButton({ onClick }: IProps) {
  return (
    <button id='add-to-cart' className='bg-blue-500 text-white px-4 py-2 rounded' onClick={onClick}>
      추가
    </button>
  );
}

export { ProductAddButton };
