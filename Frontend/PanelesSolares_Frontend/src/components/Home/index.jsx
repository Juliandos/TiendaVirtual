import { useEffect, useState } from "react";
import datas from "../../data/products.json";
import SectionStyleFour from "../Helpers/SectionStyleFour";
import SectionStyleOne from "../Helpers/SectionStyleOne";
import SectionStyleThree from "../Helpers/SectionStyleThree";
import SectionStyleTwo from "../Helpers/SectionStyleTwo";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import Layout from "../Partials/Layout";
// import Ads from "./Ads";
import Banner from "./Banner";
import BestSellers from "./BestSellers";
import BrandSection from "./BrandSection";
import CampaignCountDown from "./CampaignCountDown";
import ProductsAds from "./ProductsAds";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Home() {
  const { products } = datas;
  // console.log(datas);
  
  const brands = [];
  let margenProductos = 0;
  // products.forEach((product) => {
  //   brands.push(product.brand);
  // });

  const [productos, setProductos] = useState([]);
  const [productosMRelevantes, setProductosMRelevantes] = useState([]);
  const marcas = [];
  let productosRelevantes = [];

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${apiUrl}/productos/todos`);
        const data = await response.json();
        setProductos(data);
        
      } catch (error) {
        console.error('Error al cargar la marca:', error);
      }
    };

    const fetchProductosMarcasRelevantes = async (productoId) => {
      try {
        const response = await fetch(`${apiUrl}/productos/producto`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ producto_id: productoId }),
        });
    
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
    
        const data = await response.json();
        setProductosMRelevantes(data);
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      }
    };
      fetchProductosMarcasRelevantes(101);
      fetchProductos();
  }, []);
  // console.log(productosMRelevantes);

  productos.forEach((product) => {// selección de marcas especificas modificar (***)
    if (margenProductos <= 4) {
      marcas.push(product.marca);
    }
    margenProductos++;
  });

  function combinarDatos(data1, data2) {
    let i = 0;

    const productos1 = data1.map(producto => {
        const resultado = {
            id: producto.producto_id,
            title: producto.producto_nombre,
            referencia: producto.referencia,
            descripcion: producto.descripcion,
            brand: producto.marca,
            cam_product_sale: producto.cantidad_minima,
            cam_product_available: producto.cantidad_actual,
            precio_compra: producto.precio_compra,
            price: producto.precio_venta,
            image: producto.imagen_url,
            review: data2.products[i].review,
            offer_price: data2.products[i].offer_price,
            product_type: data2.products[i].product_type
        };
        i++;
        return resultado;
    });

    return productos1;
}

  productosRelevantes = combinarDatos(productosMRelevantes, datas);
  
  // const [ads, setAds] = useState(false);
  // const adsHandle = () => {
  //   setAds(false);
  // };
  // useEffect(() => gs
  // {
  //   setAds(true);
  // }, []);
  
  return (
    <>
      <Layout>
        {/* {ads && <Ads handler={adsHandle} />} */}
        <div className="btn w-5 h-5 "></div>
        <Banner className="banner-wrapper mb-[60px]" />
        <SectionStyleOne
          products={productosRelevantes}
          brands={marcas}
          categoryTitle="Mobile & Tablet"
          sectionTitle="Marcas relevantes"// selección de marcas especificas modificar (***)
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
          categoryBackground ={`${import.meta.env.VITE_PUBLIC_URL}/assets/images/new-letter.jpg`}
        />
        <BrandSection
          sectionTitle="Shop by Brand"
          className="brand-section-wrapper mb-[60px]"
        />
        <CampaignCountDown
          className="mb-[60px]"
          lastDate="2024-12-31 24:00:00"
        />
        <ViewMoreTitle
          className="top-selling-product mb-[60px]"
          seeMoreUrl="/all-products"
          categoryTitle="Prouctos mas vendidos"
        >
          <SectionStyleTwo products={productosRelevantes} />
        </ViewMoreTitle>
        <ViewMoreTitle
          className="best-sallers-section mb-[60px]"
          seeMoreUrl="/sallers"
          categoryTitle="Best Saller"
        >
          <BestSellers />
        </ViewMoreTitle>
        <ProductsAds
          ads={[
            `${import.meta.env.VITE_PUBLIC_URL}/assets/images/ads-1.png`,
            `${import.meta.env.VITE_PUBLIC_URL}/assets/images/ads-2.png`,
          ]}
          sectionHeight="sm:h-[295px] h-full"
          className="products-ads-section mb-[60px]"
        />
        <SectionStyleOne
          categoryBackground={`${
            import.meta.env.VITE_PUBLIC_URL
          }/assets/images/section-category-2.jpg`}
          products={products.slice(4, products.length)}
          brands={brands}
          categoryTitle="Electronics"
          sectionTitle="Popular Sales"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />
        <ProductsAds
          ads={[`${import.meta.env.VITE_PUBLIC_URL}/assets/images/ads-3.png`]}
          className="products-ads-section mb-[60px]"
        />
        <SectionStyleThree
          products={products}
          sectionTitle="New Arrivals"
          seeMoreUrl="/all-products"
          className="new-products mb-[60px]"
        />
        <ProductsAds
          sectionHeight="164"
          ads={[`${import.meta.env.VITE_PUBLIC_URL}assets/images/ads-4.png`]}
          className="products-ads-section mb-[60px]"
        />
        <SectionStyleFour
          products={products}
          sectionTitle="Popular Sales"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />
      </Layout>
    </>
  );
}
