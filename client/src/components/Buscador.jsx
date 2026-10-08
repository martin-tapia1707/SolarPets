import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import './Buscador.css';

function Buscador() {

    const { texto } = useParams();
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();

    const mostrar = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/producto/busqueda/${texto}`);
            setProductos(response.data);
        } catch (error) {
            if (error.status == "404") {
                setProductos([]);
            }
        }

    }

    useEffect(() => {
        mostrar();
    }, []);

    return (
        <>
            {productos.length !== 0 ? (
                <div className="buscador">
                    <h2 className="buscador__titulo">{productos.length} productos</h2>

                    <div className="grilla">
                        {productos.map((producto) => (
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

// Incersiones de productos:

// INSERT INTO `productos` (`id`, `nombre`, `precio`, `stock`, `imagen`, `descripcion`) VALUES
// (3, 'Alimento Para Perros Adultos Sabor Carne Y Pollo Maintenance Criadores 15kg', 34203.00, 10, 'https://static.cotodigital3.com.ar/sitios/fotos/large/00616400/00616462.jpg', 'Alimento Para Perros Adultos Sabor Carne Y Pollo Maintenance Criadores 15kg'),
// (4, 'Alimento En Sobres WHISKAS 85 Gr Pollo', 1399.00, 25, 'https://static.cotodigital3.com.ar/sitios/fotos/large/00231100/00231118.jpg', 'Whiskas Sobrecitos Pouch Sabor Carne 85 Grs.\r\n\r\nWhiskas en sobrecitos adulto sabor Carne en SALSA, es un alimento húmedo nutricionalmente completo y balanceado. Son trocitos de carne cocidos al vapor en una deliciosa salsa. Su fórmula contiene proteínas de alta calidad proporcionando los nutrientes que ellos necesitan todos los días, manteniéndolos siempre saludables. Desarrollados con un 80% de agua en su composición aportan 1/3 de las necesidades hídricas de un gato al día. Esto ayuda a prevenir las enfermedades de tracto urinario que se originan con el stress y falta de ingesta diaria de agua (algo normal en los gatos debido a su origen desértico)\r\nPara gatos adultos ofrecer hasta tres sobresitos por día. (1 Sobresito = 85 grs.)');
