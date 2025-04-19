import { useSelect } from '../../context/select';

interface SelectProps extends React.HTMLAttributes<HTMLSelectElement> {}

export const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  const { selectedId, setSelectedId } = useSelect();

  return (
    <select
      id="product-select"
      data-testid="product-select"
      className="border rounded p-2 mr-2"
      value={selectedId}
      onChange={(e) => setSelectedId(e.target.value)}
      {...props}
    >
      {children}
    </select>
  );
};
