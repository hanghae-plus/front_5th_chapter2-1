import { useProducts } from '../contexts/ProductsContext';

interface Props {
  selectedId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
}

export default function ProductSelect({ selectedId, onSelect, onAdd }: Props) {
  const { products } = useProducts();
  return (
    <div className="flex items-center my-4">
      <select
        value={selectedId}
        onChange={(e) => onSelect(e.currentTarget.value)}
        className="border rounded p-2 mr-2"
      >
        {products.map((p) => (
          <option key={p.id} value={p.id} disabled={p.units === 0}>
            {p.name} - {p.price}원
          </option>
        ))}
      </select>
      <button onClick={onAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
        추가
      </button>
    </div>
  );
}
