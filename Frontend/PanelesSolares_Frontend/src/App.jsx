import Routers from "./Routers";
import { CartProvider } from './components/Contexts/cartContext';

function App() {
  return (
  <CartProvider>
    <Routers />
  </CartProvider>
  )
}

export default App;
