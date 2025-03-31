// import InputQuantityCom from "../Helpers/InputQuantityCom";
import PropTypes from "prop-types";
import { useCart } from '../Contexts/UseCart';
import CartItem from "./CartItem";

export default function ProductsTable({ className }) {

  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className={`w-full ${className || ""}`}>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className || ""}`}>
      <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
              <td className="py-4 pl-10 block whitespace-nowrap min-w-[300px]">
                product
              </td>
              <td className="py-4 whitespace-nowrap text-center">Marca</td>
              <td className="py-4 whitespace-nowrap text-center">price</td>
              <td className="py-4 whitespace-nowrap text-center">quantity</td>
              <td className="py-4 whitespace-nowrap text-center">total</td>
              <td className="py-4 whitespace-nowrap text-right w-[114px]"></td>
            </tr>
            {/* table heading end */}
            {cartItems.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

ProductsTable.propTypes = {
  className: PropTypes.string,
}