import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Banner({ className }) {
  const [portada, setPortada] = useState([]);
  const [indexPortada, setIndexPortada] = useState(0);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(`${apiUrl}/categorias/todas`);
        const data = await response.json();
        setPortada(data);
        
      } catch (error) {
        console.error('Error al cargar la portada:', error);
      }
    };
    
    fetchCategorias();
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndexPortada((prevIndex) => (prevIndex + 1) % portada.length);
    }, 3000); 

    return () => clearInterval(interval); 
  }, [portada]);

  if (!portada.length) {
    return null;
  }

  return (
    <>
      <div className={`w-full ${className || ""}`}>
        <div className="container-x mx-auto">
          <div className="main-wrapper w-full">
            <div className="banner-card xl:flex xl:space-x-[30px] xl:h-[600px] mb-[30px]">
              <div data-aos="fade-right" className="xl:w-[740px] w-full h-full">
                <Link to="/single-product">
                  <picture>
                    <source
                      srcSet={`${apiUrl}/categorias/imagen/${portada[indexPortada].portada}`}
                      alt="alt de prueba picture"
                    />
                    <img
                      src={`${import.meta.env.VITE_PUBLIC_URL}/assets/images/product-img-3.jpg`}
                      alt="alt de prueba img"
                      className="w-full max-w-full h-auto object-cover"
                    />
                  </picture>
                </Link>
              </div>
              <div
                data-aos="fade-left"
                className="flex-1 flex xl:flex-col flex-row xl:space-y-[30px] h-full"
              >
                <div className="w-full xl:h-1/2">
                  <Link to="/single-product">
                    <img
                      src={`${apiUrl}/categorias/imagen/${portada[(indexPortada + 1) % portada.length].portada}`}
                      alt=""
                      className="w-full h-full"
                    />
                  </Link>
                </div>
                <div className="w-full xl:h-1/2">
                  <Link to="/single-product">
                    <img
                      src={`${apiUrl}/categorias/imagen/${portada[(indexPortada + 2) % portada.length].portada}`}
                      alt=""
                      className="w-full h-full"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Banner.propTypes = {
  className: PropTypes.string
};