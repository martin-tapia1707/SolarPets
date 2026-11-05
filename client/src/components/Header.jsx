import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
 
import './Header.css';
import logo from '../../logo.png';
 
function Header() {

    const token = localStorage.getItem('token');
 
    const navigate = useNavigate();
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    useEffect(() => {
        if (!menuAbierto) return;
 
        const cerrarConEscape = (event) => {
            if (event.key === 'Escape') setMenuAbierto(false);
        };
 
        window.addEventListener('keydown', cerrarConEscape);
    });
 
    const buscarProducto = (event) => {
        event.preventDefault();
        const q = encodeURIComponent(busqueda.trim().toLowerCase());
        if (!q) return;
        navigate('/productos/' + q + '?_q=' + q);
    };
 
    const cerrarMenu = () => setMenuAbierto(false);
 
    return (
        <>
            <header className="header">
 
                <button
                    type="button"
                    className="header-hamburguesa"
                    aria-label="Abrir menú"
                    aria-expanded={menuAbierto}
                    onClick={() => setMenuAbierto(true)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
 
                <Link to="/" className="header-logo">
                    <img src={logo} alt="Solar Pets" />
                    <div className="header-wordmark">
                        <strong>Solar Pets</strong>
                        <span>PERROS Y GATOS</span>
                    </div>
                </Link>
 
                <form className="header-buscador" onSubmit={buscarProducto}>
                    <button type="submit" className="header-buscador-btn" aria-label="Buscar">
                        <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <circle cx="10" cy="10" r="7" />
                            <line x1="15.5" y1="15.5" x2="22" y2="22" />
                        </svg>
                    </button>
                    <input
                        type="text"
                        placeholder="Buscar un producto.."
                        value={busqueda}
                        onChange={(event) => setBusqueda(event.target.value)}
                    />
                </form>
 
                <nav className="header-nav">
                    <Link to="sacarturno">Sacar Turno</Link>
                </nav>
 
                <div className="header-sesion">
                    {token ? (
                        <Link to="/profile" className="header-btn">
                            Ir a tu Perfil
                        </Link>
                    ) : (
                        <>
                            <Link to="/register" className="header-btn">
                                Registrarse
                            </Link>

                            <Link to="/login" className="header-btn">
                                Iniciar sesión
                            </Link>
                        </>
                    )}
                </div>
 
            </header>
 
            <div
                className={`sidebar-overlay ${menuAbierto ? 'sidebar-overlay--abierto' : ''}`}
                onClick={cerrarMenu}
            ></div>
 
            <aside className={`sidebar ${menuAbierto ? 'sidebar--abierta' : ''}`} aria-hidden={!menuAbierto}>
 
                <div className="sidebar-top">
                    <div className="header-wordmark">
                        <strong>SolarPets</strong>
                        <span>PERROS Y GATOS</span>
                    </div>
                    <button type="button" className="sidebar-cerrar" aria-label="Cerrar menú" onClick={cerrarMenu}>
                        ✕
                    </button>
                </div>
 
                <nav className="sidebar-links">
                    <Link to="" onClick={cerrarMenu}>Servicios</Link>
                    <Link to="" onClick={cerrarMenu}>Adopción</Link>
                    <Link to="" onClick={cerrarMenu}>Delivery</Link>
                    <Link to="/sacarturno" className="sidebar-turno" onClick={cerrarMenu}>Solicitar turno</Link>
                </nav>
 
            </aside>
        </>
    );
}
 
export default Header;