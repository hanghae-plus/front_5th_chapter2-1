import { MainPage } from "./pages";
import { ShoppingProvider } from "./context";

function App() {
  return (
    <ShoppingProvider>
      <MainPage />
    </ShoppingProvider>
  );
}

export default App;
