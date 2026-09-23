import { Link, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Mainsite from './components/Mainsite';

function App() {

  return (

  <>
  <Link to="/login">Iniciar Sesión</Link>

  <Routes>

    <Route path="/" element={<Mainsite />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<Profile />} />    

  </Routes>
  </>

  )
}

export default App
