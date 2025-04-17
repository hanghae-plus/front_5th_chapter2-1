import { memo, ReactNode } from 'react';

// 컨테이너 요소 묶음 +  heading
const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        {children}
      </div>
    </div>
  );
};

export default memo(Container);
