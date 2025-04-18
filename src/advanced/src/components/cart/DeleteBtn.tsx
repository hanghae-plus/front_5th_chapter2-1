export const DeleteBtn = ({ id }: { id: string }) => {
  return (
    <button
      className="remove-item bg-red-500 text-white px-2 py-1 rounded"
      data-product-id={id}
    >
      삭제
    </button>
  );
};
