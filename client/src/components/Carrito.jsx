import { useState, useEffect } from 'react';
import axios from 'axios';
import './Carrito.css';

const PRECIO_ENVIO = 7000;  // se suma esta cantidad si se activa la opcion de envio. 

function Carrito() {
  const [items, setItems] = useState([]);
  const [entrega, setEntrega] = useState('envio'); // 'envio' o 'retiro'

  const token = localStorage.getItem('token');

  const cargarCarrito = async () => {
    try {     
      const response = await axios.get('http://localhost:3000/carrito/obtenerProductos',{
        headers: 
            {
                token:  token
            }
      });
      setItems(response.data.itemsCarrito);
      console.log(response.data.itemsCarrito);
    } catch (error) {
      alert('No se pudo cargar el carrito');
    }
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  const cambiarCantidad = async (item, cambio) => {     // cambio = 1 || -1
    const stock = item.Producto.stock;
    const nueva = Math.min(stock, Math.max(1, item.cantidad + cambio));
    if (nueva === item.cantidad){
      return;
    } 

    try {
        const response = await axios.post('http://localhost:3000/carrito/agregarProducto', {
            productoId: item.productoId,
            cantidad: nueva,
            precioUnitario: item.precioUnitario,
        }, {
            headers: 
            {
                token:  token
            }
        });
      setItems(items.map((i) => (i.id === item.id ? { ...i, cantidad: nueva } : i)));
    } catch (error) {
      alert('No se pudo actualizar la cantidad');
    }
  };

  const eliminarProducto = async (item) => {
    try {
      await axios.delete('http://localhost:3000/carrito/eliminarProducto', { 
        data: { productoId: item.productoId },
        headers: {token:  token} });
      setItems(items.filter((i) => i.id !== item.id));
      alert("Producto eliminado");
    } catch (error) {
      alert("No se pudo eliminar el producto");
    }
  };

  const comprar = async () => {
    try {
        const response = await axios.patch('http://localhost:3000/carrito/comprar', { }, {
            headers: 
            {
                token:  token
            }
        });
        alert(response.data.message);
        setItems([]);
        await axios.post('http://localhost:3000/carrito/asignar', {}, { headers: { token: token } });
        await cargarCarrito();
    } catch (error) {
      setMensaje('No se pudo realizar la compra');
      alert(error.message);
      return;
    }


  };
  
  
  const cantidadTotal = items.reduce((suma, i) => suma + i.cantidad, 0);
  const subtotal = items.reduce((suma, i) => suma + i.precioUnitario * i.cantidad, 0);
  const costoEnvio = entrega === 'envio' && items.length > 0 ? PRECIO_ENVIO : 0;
  const total = subtotal + costoEnvio;

  return (
    <div className="carrito">
      <div className="carrito-contenido">
        {/* ===== Columna izquierda: productos ===== */}
        <section className="carrito-productos">
          <div className="carrito-caja carrito-todos">Mi carrito ({cantidadTotal})</div>

          <div className="carrito-caja">
            <h2 className="carrito-titulo">Productos</h2>

            {items.length === 0 && <p className="carrito-vacio">Tu carrito está vacío</p>}

            {items.map((item) => (
              <article className="carrito-item" key={item.id}>
                <img className="carrito-item-img" src={item.Producto.imagen} alt={item.Producto.nombre} />

                <div className="carrito-item-info">
                  <h3 className="carrito-item-nombre">{item.Producto.nombre}</h3>
                  <div className="carrito-cantidad">
                    <button onClick={() => cambiarCantidad(item, -1)} disabled={item.cantidad === 1}>−</button>
                    <span>{item.cantidad}</span>
                    <button onClick={() => cambiarCantidad(item, 1)} disabled={item.cantidad >= item.Producto.stock}>+</button>
                    <small>{item.Producto.stock > 10 ? '+10 disponibles' : `Quedan ${item.Producto.stock}`}</small>
                  </div>
                </div>

                <div className="carrito-item-precio">
                  <button className="carrito-eliminar" onClick={() => eliminarProducto(item)} aria-label="Eliminar">
                    🗑
                  </button>
                  <strong>$ {(item.precioUnitario * item.cantidad).toLocaleString('es-AR', { maximumFractionDigits: 0 })}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ===== Columna derecha: resumen ===== */}
        <aside className="carrito-resumen">
          <h2 className="carrito-resumen-titulo">Resumen de compra</h2>

          <div className="carrito-resumen-cuerpo">
            <div className="carrito-fila">
              <span>Productos</span>
              <span>$ {(subtotal).toLocaleString('es-AR', { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="carrito-fila">
              <span>Envío</span>
              <span>{entrega === 'envio' ? ("$ " + (costoEnvio).toLocaleString('es-AR', { maximumFractionDigits: 0 })) : 'Retiro sin costo'}</span>
            </div>

            <div className="carrito-fila carrito-total">
              <span>Total</span>
              <span>$ {(total).toLocaleString('es-AR', { maximumFractionDigits: 0 })}</span>
            </div>

            <div className="carrito-entrega">
              <label>
                <input
                  type="radio"
                  name="entrega"
                  value="envio"
                  checked={entrega === 'envio'}
                  onChange={() => setEntrega('envio')}
                />
                Envío a domicilio (+ {(PRECIO_ENVIO).toLocaleString('es-AR', { maximumFractionDigits: 0 })})
              </label>
              <label>
                <input
                  type="radio"
                  name="entrega"
                  value="retiro"
                  checked={entrega === 'retiro'}
                  onChange={() => setEntrega('retiro')}
                />
                Retirar en el local (sin costo)
              </label>
            </div>

            <button className="carrito-continuar" onClick={comprar} disabled={items.length === 0}>
              Comprar ({cantidadTotal})
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Carrito;