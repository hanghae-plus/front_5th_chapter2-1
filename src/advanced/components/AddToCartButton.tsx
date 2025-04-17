
type Props = {
    addToCart: () => void;
}

const AddToCartButton = ({ addToCart }: Props) => {
    return (
        <button 
            id="add-to-cart" 
            className="bg-blue-500 text-white px-4 py-2 rounded" 
            onClick={addToCart}
        >
            추가
        </button>
    );
};

export default AddToCartButton;