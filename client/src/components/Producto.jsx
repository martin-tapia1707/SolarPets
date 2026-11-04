import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import './Producto.css';

function ObtenerProducto() {
  const [producto, setProducto] = useState();
  const [cantidadC, setCantidadC] = useState(1);
  const { id } = useParams();

  const navigate = useNavigate();

  const productoId = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/producto/${id}`);
      console.log(response.data);
      setProducto(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const comprar = async()=>{
    try {
      const token = localStorage.getItem('token');
    if(!token){
      alert("necesitas loguearte");
    }else{
      await axios.post("http://localhost:3000/carrito/agregarProducto", {
        productoId: producto.id,
        cantidad: cantidadC,
        precioUnitario: producto.precio
      }, {
        headers: 
            {
                token:  token
            }
      });
      navigate(`/carrito`);
    }  
    } catch (error) {
      console.log(error.message);
    }
  }

  const agregar = async()=>{
    try {
      const token = localStorage.getItem('token');
    if(!token){
      alert("necesitas loguearte");
    }else{
      await axios.post("http://localhost:3000/carrito/agregarProducto", {
        productoId: producto.id,
        cantidad: cantidadC,
        precioUnitario: producto.precio
      }, {
        headers: 
            {
                token:  token
            }
      });
      alert("producto agregado");
    }  
    } catch (error) {
      console.log(error.message);
    }
  }

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
          <h3>Cantidad a comprar:</h3>
          <div className="cantidad-selector">
            <button className="cantidad-btn" onClick={() => setCantidadC(Math.max(1, cantidadC - 1))}>-</button>
            <h3 className="cantidad-valor">{cantidadC}</h3>
            <button className="cantidad-btn" onClick={() => setCantidadC(Math.min(producto?.stock, cantidadC + 1))}>+</button>
          </div>
        </div>

        <div className="producto-definicion">
          <h2>Descripcion:</h2>
          <p>{producto?.descripcion}</p>
        </div>

        <div className="producto-acciones">
          <button className="btn-comprar" onClick={comprar}>Comprar ahora</button>
          <button className="btn-carrito" onClick={agregar}>Agregar al carro</button>
        </div>
      </div>
    </>
  );
}

export default ObtenerProducto;