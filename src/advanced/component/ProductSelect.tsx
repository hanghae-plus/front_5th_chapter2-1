import { ChangeEvent, useState } from "react";
import { useProducts } from "../hooks/useProducts"

export const ProductSelect = () => {
    const [lastSelectProd, setLastSelectProd] = useState("p1");
    const {products, updateQuantity} = useProducts()

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedProdId = event.target.selectedOptions[0].id;
        setLastSelectProd(selectedProdId);
      };
    
      const handleClickAdd = () => {
        updateQuantity(lastSelectProd, 1)
      };
    return (
        <>
            <select
                id="product-select"
                className="border rounded p-2 mr-2"
                onChange={handleSelectChange}
            >
                {products.map((prod) => {
                    return (
                    <option
                        key={prod.name}
                        id={prod.id}
                        disabled={prod.quantity === 0}
                    >
                        {prod.name + " - " + prod.price + "원"}
                    </option>
                    );
                })}
            </select>
            <button
                id="add-to-cart"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleClickAdd}
            >
                추가
            </button>
        </>
    )
}