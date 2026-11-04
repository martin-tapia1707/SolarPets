import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useParams, Link, useNavigate } from "react-router-dom";
import './Buscador.css';

function Buscador() {
    // solucionar o mejor dicho hacer que no se muestre la parte de producto no encontrado cuando si hay resultados
    
    const [productos, setProductos] = useState([]);
    const [productosV, setProductosV] = useState([]);

    const [searchParams] = useSearchParams();
    const query = searchParams.get('_q');
    const page = parseInt(searchParams.get('page')) || 1;
    const productosPag = 6;
    

    const navigate = useNavigate();

    const mostrar = async () => {
        try {
            console.log(query);
            const response = await axios.get(`http://localhost:3000/producto/busqueda/query?_q=${query}`);
            const datos = response.data;
            setProductos(datos);

            //Verifico que el page no sea "ilogico"
            const paginasT = Math.ceil(datos.length / productosPag);
            if(page > paginasT){
                navigate(`/productos/${query}?_q=${query}&page=${paginasT}`);
                return;
            }else if(page < 1){
                navigate(`/productos/${query}?_q=${query}&page=1`);
                return;
            }

            //Productos que vera el usuario en la pagina actual
            const productosPagina = [];
            for(let i = (productosPag * page) - productosPag; i < (productosPag * page); i++){
                if(datos[i]){
                    productosPagina.push(datos[i]);
                }
            }
            setProductosV(productosPagina);

            
            
        } catch (error) {
            if (error.response?.status === 404) {
                setProductos([]);
            }
        }

    }

    useEffect(() => {
        mostrar();
    }, [query, page]);

    const totalPaginas = Math.ceil(productos.length / productosPag);
    const urlPagina = (n) => `/productos/${query}?_q=${query}&page=${n}`;

    // Muestra: 1 ... (actual-1) actual (actual+1) ... última
    const numerosPaginas = () => {
        const items = [];
        for (let i = 1; i <= totalPaginas; i++) {
            if (i === 1 || i === totalPaginas || Math.abs(i - page) <= 1) {
                items.push(i);
            } else if (items[items.length - 1] !== "…") {
                items.push("…");
            }
        }
        return items;
    };

    return (
        <>
            {productos.length !== 0 ? (
                <div className="buscador">
                    <h2 className="buscador__titulo">{productos.length} productos</h2>

                    <div className="grilla">
                        {productosV.map((producto) => (
                            <div className="tarjeta" key={producto.id}>
                                <Link to={`/producto/${producto.id}`} className="tarjeta__link">
                                    <img
                                        className="tarjeta__imagen"
                                        src={producto.imagen}
                                        alt={`Imagen de ${producto.nombre}`}
                                    />
                                    <div className="tarjeta__info">
                                        <p className="tarjeta__nombre">{producto.nombre}</p>
                                        <p className="tarjeta__precio">{producto.precio}$</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                        {totalPaginas > 1 && (
                        <nav className="paginador" aria-label="Paginación de resultados">
                            {page > 1 ? (
                                <Link className="paginador__flecha" to={urlPagina(page - 1)} aria-label="Página anterior">‹</Link>
                            ) : (
                                <span className="paginador__flecha paginador__flecha--off" aria-hidden="true">‹</span>
                            )}

                            {numerosPaginas().map((n, i) =>
                                n === "…" ? (
                                    <span key={`gap-${i}`} className="paginador__puntos">…</span>
                                ) : (
                                    <Link
                                        key={n}
                                        to={urlPagina(n)}
                                        className={`paginador__item ${n === page ? "paginador__item--activo" : ""}`}
                                        aria-current={n === page ? "page" : undefined}
                                    >
                                        {n}
                                    </Link>
                                )
                            )}

                            {page < totalPaginas ? (
                                <Link className="paginador__flecha" to={urlPagina(page + 1)} aria-label="Página siguiente">›</Link>
                            ) : (
                                <span className="paginador__flecha paginador__flecha--off" aria-hidden="true">›</span>
                            )}
                        </nav>
                    )}
                </div>
            ) : (
                <div className="error-busqueda">
                    <div className="error-busqueda__contenido">
                        <h1 className="error-busqueda__titulo">¡Upps!</h1>
                        <p className="error-busqueda__resultados">HEMOS ENCONTRADO 0 RESULTADOS</p>

                        <h3 className="error-busqueda__subtitulo">Sugerencias de búsqueda</h3>
                        <ul className="error-busqueda__lista">
                            <li>Comprueba que hayas escrito todo correctamente. O bien, intenta cambiar la ortografía de alguna de las palabras.</li>
                            <li>Limita tu búsqueda a 1 o 2 términos.</li>
                            <li>No seas tan específico. Usa más términos generales de búsqueda para poder encontrar productos similares.</li>
                        </ul>

                        <p className="error-busqueda__texto">Intenta cambiar las opciones de búsqueda.</p>

                        <button
                            className="error-busqueda__boton"
                            onClick={() => { navigate("/"); }}
                        >
                            VOLVER AL INICIO
                        </button>
                    </div>

                    <div className="error-busqueda__imagen-wrapper">
                        <img
                            className="error-busqueda__imagen"
                            src="https://puppis.vtexassets.com/assets/vtex/assets-builder/puppis.store-theme/2.34.57/images/search-not-found___49182e7ef9dd2c35bd9c6edc2746fb3c.png"
                            alt="Imagen de mascota diciendo ups"
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Buscador;

