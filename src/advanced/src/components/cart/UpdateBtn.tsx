import { Product } from "../../constants";

type Props = {
  id: string;
  cartItems: Record<string, Product>;
  setCartItems: React.Dispatch<React.SetStateAction<Record<string, Product>>>;
};

export const UpdateBtn = ({ id, cartItems, setCartItems }: Props) => {
  const updateCartItemQuantity = (e: React.MouseEvent<HTMLButtonElement>) => {
    const productId = e.currentTarget.dataset.productId;
    const change = e.currentTarget.dataset.change;

    if (productId && change) {
      const updatedCartItems = { ...cartItems };
      Object.entries(cartItems).forEach(([key, value]) => {
        if (key === productId) {
          updatedCartItems[key as keyof typeof cartItems]["quantity"] =
            value["quantity"] + Number(change);
        }
      });
      setCartItems(updatedCartItems);
    }
  };

  return (
    <>
      <button
        className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
        data-product-id={id}
        data-change="-1"
        onClick={updateCartItemQuantity}
      >
        -
      </button>
      <button
        className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
        data-product-id={id}
        data-change="1"
        onClick={updateCartItemQuantity}
      >
        +
      </button>
    </>
  );
};
