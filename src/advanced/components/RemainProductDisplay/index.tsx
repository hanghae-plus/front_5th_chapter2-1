import { useCartControls } from '../../context';

export const RemainProductList = () => {
  const { remainProductList } = useCartControls();

  return (
    <div className="flex gap-1 text-sm text-gray-500 mt-2">
      {remainProductList.map((product) => {
        return product.remainQuantity < 5 ? (
          <p key={product.id}>
            {product.name}:{' '}
            {product.remainQuantity > 0 ? `재고 부족 (${product.remainQuantity}개 남음)` : '품절'}
          </p>
        ) : null;
      })}
    </div>
  );
};
