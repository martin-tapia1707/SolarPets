import { useState, useEffect } from 'react';
import axios from 'axios';
import './Carrito.css';

const PRECIO_ENVIO = 7000;

// Axios apuntando a tu backend (ajustá la URL a tus rutas)
//const api = axios.create({ baseURL: 'http://localhost:3000/api/carrito' });

// Envía el token en cada petición para que el backend conozca a req.user
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

const formatear = (numero) => '$ ' + Number(numero).toLocaleString('es-AR', { maximumFractionDigits: 0 });

function Carrito() {
  const [items, setItems] = useState([]);
  const [entrega, setEntrega] = useState('envio'); // 'envio' o 'retiro'
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState('');

  // ----- Conexión con el backend -----
  const cargarCarrito = async () => {
    try {
        const token = localStorage.getItem('token');
      //await api.post('/asignar'); // crea el carrito si el cliente no tiene uno activo
      const response = await axios.get('http://localhost:3000/carrito/obtenerProductos',{
        headers: 
            {
                token:  token
            }
      });
      // Si hay productos, el backend los devuelve dentro de "message"
      setItems(response.data.itemsCarrito || []);
      console.log(response.data.itemsCarrito );
    } catch (error) {
      setMensaje('No se pudo cargar el carrito');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  const cambiarCantidad = async (item, cambio) => {
    const stock = item.Producto.stock;
    const nueva = Math.min(stock, Math.max(1, item.cantidad + cambio));
    if (nueva === item.cantidad) return;

    try {
        const token = localStorage.getItem('token');
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
      setMensaje('No se pudo actualizar la cantidad');
    }
  };

  const eliminarProducto = async (item) => {
    try {
      // En DELETE, axios envía el body dentro de "data"
      const token = localStorage.getItem('token');
      const response = await axios.delete('http://localhost:3000/carrito/eliminarProducto', { data: { productoId: item.productoId }, headers: {token:  token} });
      setItems(items.filter((i) => i.id !== item.id));
    } catch (error) {
      setMensaje('No se pudo eliminar el producto');
    }
  };

  const comprar = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.patch('http://localhost:3000/carrito/comprar', { entrega }, {
            headers: 
            {
                token:  token
            }
        });
        setMensaje(response.data.message);
        alert(response.data.message);
        setItems([]);
        setMensaje('');
        await axios.post('http://localhost:3000/carrito/asignar', {}, { headers: { token: token } });
        await cargarCarrito();
    } catch (error) {
      setMensaje('No se pudo realizar la compra');
      console.log(error.message);
      return;
    }

//     try {
//     const token = localStorage.getItem('token');
//     await axios.post('http://localhost:3000/carrito/asignar', {}, { headers: { token: token } });
//     await cargarCarrito();
//   } catch (error) {
//     console.log(error.message);
//   }
  };

  // ----- Cálculos -----
  const cantidadTotal = items.reduce((suma, i) => suma + i.cantidad, 0);
  const subtotal = items.reduce((suma, i) => suma + i.precioUnitario * i.cantidad, 0);
  const costoEnvio = entrega === 'envio' && items.length > 0 ? PRECIO_ENVIO : 0;
  const total = subtotal + costoEnvio;

  if (cargando) return <div className="carrito"><p className="carrito-vacio">Cargando...</p></div>;

  return (
    <div className="carrito">
      <div className="carrito-contenido">
        {/* ===== Columna izquierda: productos ===== */}
        <section className="carrito-productos">
          <div className="carrito-caja carrito-todos">Mi carrito ({cantidadTotal})</div>

          <div className="carrito-caja">
            <h2 className="carrito-titulo">Productos</h2>

            {mensaje && <p className="carrito-vacio">{mensaje}</p>}
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
                  <strong>{formatear(item.precioUnitario * item.cantidad)}</strong>
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
              <span>{formatear(subtotal)}</span>
            </div>
            <div className="carrito-fila">
              <span>Envío</span>
              <span>{entrega === 'envio' ? formatear(costoEnvio) : 'Retiro sin costo'}</span>
            </div>

            <div className="carrito-fila carrito-total">
              <span>Total</span>
              <span>{formatear(total)}</span>
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
                Envío a domicilio (+ {formatear(PRECIO_ENVIO)})
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