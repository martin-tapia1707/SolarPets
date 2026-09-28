import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Mainsite from './components/Mainsite';
import ObtenerProducto from './components/Producto.jsx';
import Buscador from './components/Buscador.jsx';
import { useState } from 'react';

function App() {
  const navigate = useNavigate();
  const [texto, setTexto] = useState("");

  const buscar = ()=>{
    navigate(`/productos/${texto.toLowerCase()}`);
  }

  const token = localStorage.getItem('token');

  return (

  <>


  

  <Routes>


    <Route path="/" element={
      <div>
        {token ? 
        ( <div>
            <Link to="/profile">Ir a tu Perfil</Link>
          </div> ) : ( 
              <>
                <div>
                <Link to="/login">Iniciar Sesión</Link>
                </div>
        
                <div>
                <Link to="/register">Registrarse</Link>
                </div> 
              </>
        )}
        
        <Mainsite />

        <br/><br/>
        <div>
          <input type="text" placeholder='Buscar producto' onChange={(event) => setTexto(event.target.value)}/><button onClick={buscar}>Buscar</button>
        </div>
      </div>} />
      
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<Profile />} />    
    <Route path='/producto/:id' element={<ObtenerProducto />}/>
    <Route path="/productos/:texto" element={<Buscador />}/>


    

  </Routes>
  </>

  )
}

export default App
