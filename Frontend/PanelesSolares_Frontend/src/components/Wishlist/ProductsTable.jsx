// import InputQuantityCom from "../Helpers/InputQuantityCom";
import PropTypes from "prop-types";
import { useWish } from "../Contexts/UseWish"
import CartItem from "../../components/CartPage/CartItem";

export default function ProductsTable({ className }) {

  const { wishItems } = useWish();

  if (wishItems.length === 0) {
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
              <td className="py-4 pl-10 block whitespace-nowrap  w-[380px]">
                product
              </td>
              <td className="py-4 whitespace-nowrap text-center">color</td>
              <td className="py-4 whitespace-nowrap text-center">size</td>
              <td className="py-4 whitespace-nowrap text-center">price</td>
              <td className="py-4 whitespace-nowrap  text-center">quantity</td>
              <td className="py-4 whitespace-nowrap  text-center">total</td>
              <td className="py-4 whitespace-nowrap text-right w-[114px] block"></td>
            </tr>
            {/* table heading end */}
            {wishItems.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

ProductsTable.propTypes = {
  className: PropTypes.string
};