import { ReactNode } from 'react';
import { useFlashHook } from '../hooks/useFlashHook';
import { useSuggestHook } from '../hooks/useSuggestHook';

interface PropType {
  children: ReactNode;
}

function Wrapper({ children }: PropType) {
  useFlashHook();
  useSuggestHook();

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">{children}</div>
  );
}

export default Wrapper;
