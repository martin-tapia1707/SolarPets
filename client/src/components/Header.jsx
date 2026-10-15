import "./Header.css";
import { Link } from "react-router-dom";
import useHeader from "./useHeader";
import logo from "../assets/SolarPetsIcono.png";
import btnRegistro from "../assets/BotonRegistrarse.png";
import btnLogin from "../assets/BotonIniciarSesion.png";

const LINKS = [
  { href: "Servicios.php", texto: "Servicios" },
  { href: "Turnos.php", texto: "Sacar turnos" },
  { href: "Adopcion.php", texto: "Adopción" },
  { href: "Delivery.php", texto: "Delivery" },
];

const BOTONES_AUTH = [
  { to: "/register", img: btnRegistro, alt: "Registrarse" },
  { to: "/login", img: btnLogin, alt: "Iniciar sesión" },
];

function Logo() {
  return (
    <Link to="/" className="center-logo" aria-label="Solar Pets, perros y gatos">
      <img src={logo} alt="Icono de la empresa" className="logo" />
      <span className="brand">
        <span className="brand-name">Solar Pets</span>
        <span className="brand-sub">PERROS Y GATOS</span>
      </span>
    </Link>
  );
}

function Buscador({ buscador }) {
  return (
    <form
      className={`search${buscador.abierto ? " open" : ""}`}
      role="search"
      onSubmit={buscador.buscar}
    >
      <button
        type="button"
        className="search-toggle"
        aria-label="Buscar"
        onClick={buscador.alternar}
      >
        <svg
          className="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="10.5" cy="10.5" r="6.5" />
          <line x1="15.5" y1="15.5" x2="21" y2="21" />
        </svg>
      </button>
      <input
        type="search"
        className="search-input"
        placeholder="Buscar un producto.."
        ref={buscador.inputRef}
        value={buscador.texto}
        onChange={(e) => buscador.setTexto(e.target.value)}
      />
    </form>
  );
}

function Perfil({ usuario }) {
  const { nombre, foto } = usuario;
  return (
    <a className="ProfileLink" href="../Views/Profile.php" title={nombre || undefined}>
      {foto ? (
        <img src={foto} alt="Foto de perfil" className="ImgProfile" />
      ) : (
        <span className="ImgProfile avatar-fallback" aria-label="Perfil">
          {(nombre || "?").charAt(0).toUpperCase()}
        </span>
      )}
    </a>
  );
}

function BotonesAuth({ cargando }) {
  return (
    <div className={`auth-buttons${cargando ? " auth-loading" : ""}`} aria-hidden={cargando}>
      {BOTONES_AUTH.map(({ to, img, alt }) => (
        <Link key={to} to={to} className="auth-link" tabIndex={cargando ? -1 : undefined}>
          <img src={img} alt={alt} />
        </Link>
      ))}
    </div>
  );
}

function Drawer({ drawer, usuario, logout }) {
  const cerrar = () => drawer.setAbierto(false);
  const clase = drawer.abierto ? " active" : "";

  return (
    <>
      <div className={`drawer-backdrop${clase}`} onClick={cerrar} />
      <aside className={`drawer${clase}`} id="drawer" inert={!drawer.abierto} aria-hidden={!drawer.abierto}>
        <button className="drawer-close" aria-label="Cerrar menú" onClick={cerrar}>
          &times;
        </button>

        <a className="Link" href="../Views/PrincipalPage.php">Página principal</a>
        {LINKS.map(({ href, texto }) => (
          <a key={href} className="Link" href={href}>{texto}</a>
        ))}

        {usuario?.esAdmin && (
          <a className="Link admin-drawer" href="CRUD.php">Administración</a>
        )}
        {usuario && (
          <button className="Link logout-btn" onClick={logout.pedir}>
            Cerrar sesión
          </button>
        )}
      </aside>
    </>
  );
}

function ModalLogout({ logout }) {
  return (
    <div
      className={`logout-modal${logout.abierto ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logoutTitle"
      aria-hidden={!logout.abierto}
      onClick={logout.clicFondo}
    >
      <div className="logout-content">
        <h3 id="logoutTitle">¿Seguro que quieres cerrar tu sesión actual?</h3>
        <div className="logout-buttons">
          <button className="confirm" onClick={logout.confirmar}>Sí, cerrar sesión</button>
          <button className="cancel" onClick={logout.cancelar}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const { usuario, cargando, drawer, buscador, logout } = useHeader();

  return (
    <>
      <header>
        <button
          className="hamburger"
          aria-label="Abrir menú"
          aria-controls="drawer"
          aria-expanded={drawer.abierto}
          onClick={() => drawer.setAbierto(true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <Logo />
        <Buscador buscador={buscador} />

        <nav className="right-links">
          {usuario?.esAdmin && <a className="admin-btn" href="CRUD.php">ADMIN</a>}
          {LINKS.map(({ href, texto }) => (
            <a key={href} className="Link" href={href}>{texto}</a>
          ))}
          {usuario ? <Perfil usuario={usuario} /> : <BotonesAuth cargando={cargando} />}
        </nav>
      </header>

      <Drawer drawer={drawer} usuario={usuario} logout={logout} />
      <ModalLogout logout={logout} />
    </>
  );
}