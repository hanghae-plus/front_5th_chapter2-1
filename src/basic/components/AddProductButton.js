export const AddProductBtn = () => {
  let addProductBtn = document.createElement("button");
  addProductBtn.id = "add-to-cart";
  addProductBtn.className = "bg-blue-500 text-white px-4 py-2 rounded";
  addProductBtn.textContent = "추가";
  return addProductBtn;
};
