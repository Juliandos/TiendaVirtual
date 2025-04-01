import Routers from "./Routers";
import { CartProvider } from './components/Contexts/cartContext';
import { WishProvider } from "./components/Contexts/wishContext";

function App() {
  return (
    <WishProvider>
      <CartProvider>
        <Routers />
      </CartProvider>
    </WishProvider>
  )
}

export default App;
