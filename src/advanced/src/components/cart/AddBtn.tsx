import { Product } from "../../constants";

export const AddBtn = ({
  selectedProduct,
  products,
  setProducts,
  cartItems,
  setCartItems,
}: {
  selectedProduct: { id: string };
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cartItems: Record<string, Product>;
  setCartItems: React.Dispatch<React.SetStateAction<Record<string, Product>>>;
}) => {
  const handleAddToCart = () => {
    const productId = selectedProduct.id;
    const product = products.find((p) => p.id === productId);

    if (product && product.quantity > 0) {
      const updatedProducts = products.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
      );
      setProducts(updatedProducts);

      let updatedCartItems: Record<string, Product>;
      if (Object.prototype.hasOwnProperty.call(cartItems, productId)) {
        // 상품이 이미 장바구니에 있는 경우
        updatedCartItems = { ...cartItems };
        Object.entries(cartItems).forEach(([key, value]) => {
          if (key === productId) {
            updatedCartItems[key as keyof typeof cartItems]["quantity"] =
              value["quantity"] + 1;
          }
        });
      } else {
        // 상품이 장바구니에 없는 경우
        updatedCartItems = {
          ...cartItems,
          [productId]: { ...product, quantity: 1 },
        };
      }
      setCartItems(updatedCartItems);
    }
  };

  return (
    <button
      id="add-to-cart"
      className="bg-blue-400 text-white px-4 py-2 rounded"
      onClick={handleAddToCart}
    >
      추가
    </button>
  );
};
