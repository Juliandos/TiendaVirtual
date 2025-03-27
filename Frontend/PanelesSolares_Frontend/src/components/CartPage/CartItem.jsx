import PropTypes from "prop-types";
import { useCart } from "../Contexts/UseCart";
import InputQuantityCom from "../Helpers/InputQuantityCom";

const apiUrl = import.meta.env.VITE_API_URL

export default function CartItem({ product }) {

  const { removeFromCart, updateQuantity } = useCart();
  const price = parseFloat(product.offer_price.replace('$', ''));

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="pl-10 py-4 w-[350px]">
        <div className="flex space-x-6 items-center">
          <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
            <img
              src={`${apiUrl}/imagenes/imagen/${product.image}`}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <p className="font-medium text-[15px] text-qblack">
              {product.title}
            </p>
          </div>
        </div>
      </td>

      {/* Columna: Marca */}
      <td className="text-center py-4 px-2">
        <div className="flex justify-center items-center">
          <span
            className="w-[20px] h-[20px] block rounded-full"
          >{product.brand}</span>
        </div>
      </td>

      {/* Columna: Precio unitario */}
      <td className="text-center py-4 px-2">
        <div className="flex space-x-1 items-center justify-center">
          <span className="text-[15px] font-normal">
          ${price.toFixed(2)}
          </span>
        </div>
      </td>

      {/* Columna: Cantidad (input editable) */}
      <td className="py-4">
        <div className="flex justify-center items-center">
          <InputQuantityCom
            quantity={product.quantity}
            setQuantity={(newQuantity) =>
              updateQuantity(product.id, newQuantity)
            }
          />
        </div>
      </td>

      {/* Columna: Total (precio x cantidad) */}
      <td className="text-right py-4">
        <div className="flex space-x-1 items-center justify-center">
          <span className="text-[15px] font-normal">
          ${(price * product.quantity).toFixed(2)}
          </span>
        </div>
      </td>

      {/* Columna: Botón para eliminar */}
      <td className="text-right py-4">
        <div className="flex space-x-1 items-center justify-center">
          <button
            onClick={() => removeFromCart(product.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

CartItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    offer_price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    brand: PropTypes.string.isRequired
  }).isRequired,
};
