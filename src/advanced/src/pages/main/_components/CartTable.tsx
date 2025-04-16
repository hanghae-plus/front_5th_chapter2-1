import React from "react";

import type { ICart, IProduct } from "#advanced/pages/main/_types";

interface IProps {
  cart: ICart[];
  handleRemoveProduct: (productId: IProduct["id"]) => void;
  handleRemoveCart: (productId: ICart["id"]) => void;
}

const CartTable: React.FC<IProps> = ({ cart, handleRemoveProduct, handleRemoveCart }) => {
  const handleClickRemoveButton = (productId: IProduct["id"]) => {
    handleRemoveProduct(productId);
    handleRemoveCart(productId);
  };

  return (
    <section className="my-4 mb-10">
      <div className="max-h-[600px] overflow-y-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="sticky top-0 z-10 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">상품명</th>
              <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">가격</th>
              <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">수량</th>
              <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">총액</th>
              <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">삭제</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {cart.map((product, index) => (
              <tr key={product.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{product.name}</td>
                <td className="px-6 py-4 text-right text-sm whitespace-nowrap text-gray-500">
                  {product.price.toLocaleString()}원
                </td>
                <td className="px-6 py-4 text-right text-sm whitespace-nowrap text-gray-500">{product.count}</td>
                <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap text-gray-900">
                  {(product.price * product.count).toLocaleString()}원
                </td>
                <td className="px-6 py-4 text-right text-sm whitespace-nowrap">
                  <button
                    type="button"
                    className="cursor-pointer rounded bg-red-500 px-2 py-1 text-white transition-colors hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none active:bg-red-700"
                    onClick={() => handleClickRemoveButton(product.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {cart.length > 0 && (
            <tfoot className="sticky bottom-0 bg-gray-50">
              <tr>
                <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                  총 합계:
                </td>
                <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">
                  {cart.reduce((sum, item) => sum + item.price * item.count, 0).toLocaleString()}원
                </td>
                <td></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </section>
  );
};

export default React.memo(CartTable);
