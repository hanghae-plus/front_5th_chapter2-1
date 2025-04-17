import { useEffect } from "react";
import { ProductListType, ProductType } from "../types";

type Props = {
    prodList: ProductListType;
    selectedProduct: ProductType;
    setSelectedProduct: (product: ProductType) => void;
}

const ProductSelect = ({ prodList, selectedProduct, setSelectedProduct }: Props) => {

    useEffect(() => {
        console.log('prodList:', prodList);
    }, [prodList])

    const handleButton = (value: string) => {

        const selectedProduct: ProductType = prodList.find((product) => product.id === value) as ProductType;

        setSelectedProduct(selectedProduct);
    }
    return (
        <select
            id="product-select"
            className="border rounded p-2 mr-2"
            value={selectedProduct.id}
            onChange={(e) => handleButton(e.target.value)}
        >
            {prodList.map((product) => (
                <option key={product.id} value={product.id}>
                    {product.name} - {product.price} 원
                </option>
            ))}
        </select>
    );
};

export default ProductSelect;