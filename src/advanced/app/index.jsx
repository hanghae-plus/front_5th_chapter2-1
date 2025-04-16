import { logic } from './Cart/logic.js';
import { setSaleAlert, setSuggestionAlert } from './logic.js';
import { Cart } from './Cart/index.jsx';
import { useEffect } from 'react';
import React from 'react';

export function App() {
  useEffect(() => {
    logic();
    setSaleAlert();
    setSuggestionAlert();
  }, []);

  return (
    <div className={'bg-gray-100 p-8'}>
      <Cart />
    </div>
  );
}
