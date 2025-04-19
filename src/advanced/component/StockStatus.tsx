import { useProducts } from "../hooks/useProducts"

export const StockStatus = () => {
    const {products} = useProducts()
    return (
        <div id="stock-status" className="text-sm text-gray-500 mt-2">
          {products.filter(prod => prod.quantity < 5).map((prod) => {
            if(prod.quantity > 0) {
              return `${prod.name}: 재고 부족 (${prod.quantity}개 남음)`
            } else {
              return `${prod.name}: 품절`;
            }
          }).join("\n")}
        </div>
    )
}