import ProductSelectItem from './ProductSelectItem';

import { useProdListContext } from '../store/prodList/ProdListContext';
import { useSelectContext } from '../store/select/SelectContext';

const ProductSelect = () => {
  const { select, handleChange } = useSelectContext();
  const { prodList } = useProdListContext();
  return (
    <select className="border rounded p-2 mr-2" onChange={handleChange} value={select}>
      {prodList.map((item) => {
        return <ProductSelectItem key={item.id} {...item} />;
      })}
    </select>
  );
};

export default ProductSelect;
