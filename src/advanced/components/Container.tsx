import { ReactNode } from 'react';

interface PropType {
  children: ReactNode;
}

function Container({ children }: PropType) {
  return <div className="bg-gray-100 p-8">{children}</div>;
}

export default Container;
