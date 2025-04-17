export const createAppContainer = () => {
  const container = document.createElement("div");
  container.className = "bg-gray-100 p-8";
  return container;
};

export const createMainContainer = () => {
  const container = document.createElement("div");
  container.className = "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";
  return container;
};

export const createTitle = (text) => {
  const title = document.createElement("h1");
  title.className = "text-2xl font-bold mb-4";
  title.textContent = text;
  return title;
};
