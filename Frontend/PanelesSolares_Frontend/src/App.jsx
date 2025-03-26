import Routers from "./Routers";
import { CartProvider } from './components/Contexts/CartProvider';

function App() {
  return (
  <CartProvider>
    <Routers />
  </CartProvider>
  )
}

export default App;
