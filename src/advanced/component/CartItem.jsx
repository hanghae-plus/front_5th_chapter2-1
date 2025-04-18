export default function CartItem({ product, quantity, onChangeQty, onRemove }) {
  const { id, name, price } = product;

  return (
    <div id={id} className='flex justify-between items-center mb-2'>
      <span>{`${name} - ${price}원 x ${quantity}`}</span>
      <div>
        <button
          className='quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1'
          onClick={() => onChangeQty(id, -1)}
        >
          -
        </button>
        <button
          className='quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1'
          onClick={() => onChangeQty(id, 1)}
        >
          +
        </button>
        <button
          className='remove-item bg-red-500 text-white px-2 py-1 rounded'
          onClick={() => onRemove(id)}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
