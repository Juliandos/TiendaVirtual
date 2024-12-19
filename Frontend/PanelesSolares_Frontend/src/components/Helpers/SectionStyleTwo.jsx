import ProductCardRowStyleOne from "./Cards/ProductCardRowStyleOne";
import DataIteration from "./DataIteration";
import PropTypes from "prop-types";

export default function SectionStyleTwo({ className, products, type }) {
  // console.log(products);
  
  return (
    <div
      className={`section-content w-full grid sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 ${
        className || ""
      }`}
    >
      <DataIteration datas={products} startLength={0} endLength={4}>
        {({ datas }) => (
          <div key={datas.id} className="item w-full">
            <ProductCardRowStyleOne type={type} datas={datas} />
          </div>
        )}
      </DataIteration>
    </div>
  );
}

SectionStyleTwo.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array.isRequired,
  type: PropTypes.string,
};