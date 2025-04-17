import { products } from '../constants';

const ProductSelector = ({ onChange }: { onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void }) => {
    const options = products.map((product) => ({ ...product, name: `${product.name}-${product.price}원` }));

    return (
        <select id="product-select" className="border rounded p-2 mr-2" onChange={onChange}>
            {options.map((option) => (
                <option key={option.id} id={option.id} disabled={option.quantity === 0}>
                    {option.name}
                </option>
            ))}
        </select>
    );
};

export default ProductSelector;
