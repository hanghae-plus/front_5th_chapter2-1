import React from "react";

import type { ICartProduct, IProduct } from "#advanced/pages/main/_types";
import { cn } from "#advanced/libs";

interface IProps {
  cartProducts: ICartProduct[];
  handleRemoveProductFromCart: (productId: ICartProduct["id"]) => void;
  handleIncreaseProductCount: (productId: ICartProduct["id"]) => void;
  handleDecreaseProductCount: (productId: ICartProduct["id"]) => void;
}

const CartTable: React.FC<IProps> = ({
  cartProducts,
  handleRemoveProductFromCart,
  handleIncreaseProductCount,
  handleDecreaseProductCount,
}) => {
  const handleClickRemoveButton = (productId: IProduct["id"]) => {
    handleRemoveProductFromCart(productId);
  };

  return (
    <section className={cn("my-4 -mb-2", cartProducts.length === 0 && "mb-10")}>
      <div className="max-h-[600px] overflow-y-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="sticky top-0 z-10 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">상품명</th>
              <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">가격</th>
              <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">수량</th>
              <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">총액</th>
              <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                추가/제거
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">삭제</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {cartProducts.map((product) => {
              const targetProduct = cartProducts.find((cartProduct) => cartProduct.id === product.id);
              const stock = product.stock - (targetProduct?.count ?? 0);

              return (
                <tr key={product.id} className="bg-white">
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-right text-sm whitespace-nowrap text-gray-500">
                    {product.price.toLocaleString()}원
                  </td>
                  <td className="px-6 py-4 text-right text-sm whitespace-nowrap text-gray-500">{product.count}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap text-gray-900">
                    {(product.price * product.count).toLocaleString()}원
                  </td>
                  <td className="flex gap-2 px-6 py-4 text-right text-sm whitespace-nowrap">
                    <button
                      type="button"
                      className="cursor-pointer rounded bg-gray-500 px-2 py-1 text-white transition-colors hover:bg-gray-500 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none active:bg-gray-700"
                      onClick={() => handleDecreaseProductCount(product.id)}
                      disabled={product.count === 0}
                    >
                      -
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer rounded bg-blue-500 px-2 py-1 text-white transition-colors hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none active:bg-blue-700"
                      onClick={() => handleIncreaseProductCount(product.id)}
                      disabled={stock === 0}
                    >
                      +
                    </button>
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
              );
            })}
          </tbody>
          {cartProducts.length > 0 && (
            <tfoot className="sticky bottom-0 bg-gray-50">
              <tr>
                <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                  총 합계:
                </td>
                <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">
                  {cartProducts.reduce((sum, item) => sum + item.price * item.count, 0).toLocaleString()}원
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
