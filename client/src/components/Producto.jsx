import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './producto.css';

function ObtenerProducto() {
  const [producto, setProducto] = useState();
  const { id } = useParams();

  const productoId = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/producto/${id}`);
      console.log(response.data);
      setProducto(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    productoId();
  }, []);

  return (
    <>
      <div className="producto-card">
        <div className="producto-imagen">
          <img src={producto?.imagen} alt={`Imagen de ${producto?.nombre}`} />
        </div>

        <div className="producto-info">
          <h2>{producto?.nombre}</h2>
          <h3>${producto?.precio}</h3>
          <h3>Cantidad: {producto?.stock} unidades</h3>
        </div>

        <div className="producto-definicion">
          <h2>Descripcion:</h2>
          <p>{producto?.descripcion}</p>
        </div>

        <div className="producto-acciones">
          <button className="btn-comprar">Comprar ahora</button>
          <button className="btn-carrito">Agregar al carro</button>
        </div>
      </div>
    </>
  );
}

export default ObtenerProducto;