import { ChangeEvent, MouseEvent, useState } from "react";
import CartItem from "./component/CartItem";
import { Product } from "./types";
import { useProducts } from "./hooks/useProducts";

function App() {
  const [lastSelectProd, setLastSelectProd] = useState("p1");
  const {products, updateQuantity, resetQuantity} = useProducts()
  const [prodList, setProdList] = useState<Product[]>([
    {
      id: "p1",
      name: "상품1",
      price: 10000,
      quantity: 50,
      cart: 0,
      originalQuantity: 50,
    },
    {
      id: "p2",
      name: "상품2",
      price: 20000,
      quantity: 30,
      cart: 0,
      originalQuantity: 30,
    },
    {
      id: "p3",
      name: "상품3",
      price: 30000,
      quantity: 20,
      cart: 0,
      originalQuantity: 20,
    },
    {
      id: "p4",
      name: "상품4",
      price: 15000,
      quantity: 0,
      cart: 0,
      originalQuantity: 0,
    },
    {
      id: "p5",
      name: "상품5",
      price: 25000,
      quantity: 10,
      cart: 0,
      originalQuantity: 10,
    },
  ]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedProdId = event.target.selectedOptions[0].id;
    setLastSelectProd(selectedProdId);
  };

  const handleClickAdd = () => {
    updateQuantity(lastSelectProd, 1)
  };

  const handleClickQtyChangeBtn = (event: MouseEvent<HTMLButtonElement>) => {
    const { target } = event;
    if (target instanceof HTMLElement) {
      const classList = target.classList;
      if (classList.contains("quantity-change")) {
        const changeQty = parseInt(target.dataset.change || "0"); // 1 | -1
        const prodId = target.dataset.productId as string;
        updateQuantity(prodId, changeQty)
      } else if (classList.contains("remove-item")) {
        const prodId = target.dataset.productId as string;
        resetQuantity(prodId)
      }
    }
  };

  const getTotalAmount = () => {
    return prodList.reduce((acc, prod) => {
      return acc + prod.cart * prod.price
    }, 0)
  }

  const getLoyaltyPoints = (totalAmount: number) => {
    return Math.floor(totalAmount / 1000);
  }

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        <div id="cart-items">
          {products.map((prod) => {
            if (prod.cart <= 0) return;
            return CartItem(prod, handleClickQtyChangeBtn);
          })}
        </div>
        <div id="cart-total" className="text-xl font-bold my-4">
          {`총액: ${Math.round(getTotalAmount())}원`}
          <span id="loyalty-points" className="text-blue-500 ml-2">{`(포인트: ${getLoyaltyPoints(getTotalAmount())})`}</span>
        </div>
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
        <div id="stock-status" className="text-sm text-gray-500 mt-2">
          {products.filter(prod => prod.quantity < 5).map((prod) => {
            if(prod.quantity > 0) {
              return `${prod.name}: 재고 부족 (${prod.quantity}개 남음)`
            } else {
              return `${prod.name}: 품절`;
            }
          }).join("\n")}
        </div>
      </div>
    </div>
  );
}

export default App;
