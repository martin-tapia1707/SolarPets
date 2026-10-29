import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Mainsite from './components/Mainsite';
import ObtenerProducto from './components/Producto.jsx';
import EditProfile from './components/EditProfile.jsx'
import Buscador from './components/Buscador.jsx';
import Header from './components/Header.jsx';
import Recuperar from './components/Recuperar.jsx';
import EstablecerCon from './components/EstablecerCon.jsx';
import { useState } from 'react';

function App() {
  const navigate = useNavigate();
  const [texto, setTexto] = useState("");

  const buscar = (e)=>{
    e.preventDefault(); // Sino utilizo esto no muestra el query
    setTexto(encodeURIComponent(texto.toLowerCase()));
    navigate(`/productos/${texto}?_q=${texto}`);
  }

  const token = localStorage.getItem('token');

  return (

  <>


  
  <Header />
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

    <Route path="/header" element={<Header/>}/>  
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<Profile />} />    
    <Route path='/producto/:id' element={<ObtenerProducto />}/>
    <Route path="/productos/:texto" element={<Buscador />}/>
    <Route path="/edit-profile" element={ <EditProfile/> }/>
    <Route path="/recuperarContraseña" element={<Recuperar/>}/>
    <Route path="/restablecer" element={<EstablecerCon/>}/>


    

  </Routes>
  </>

  )
}

export default App
