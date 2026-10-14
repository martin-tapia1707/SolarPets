import "./Header.css";
import useHeader from "./useHeader";
import { Link } from "react-router-dom";
// Carpeta de imágenes: si cambia, se toca solo acá.
import logo from "../assets/SolarPetsIcono.png";
import btnRegistro from "../assets/BotonRegistrarse.png";
import btnLogin from "../assets/BotonIniciarSesion.png";



export default function Header() {
  const {
    cargando,
    logueado,
    nombre,
    foto,
    esAdmin,
    drawerOpen,
    drawerRef,
    toggleDrawer,
    searchOpen,
    searchInputRef,
    handleSearchToggle,
    modalOpen,
    handleLogoutClick,
    handleCancel,
    handleConfirm,
    handleModalBackdropClick,
    texto,
    setTexto,
    handleSearchSubmit,
  } = useHeader();

  return (
    <>
      <header>
        <button
          className="hamburger"
          id="hamburger"
          aria-label="Abrir menú"
          aria-controls="drawer"
          aria-expanded={drawerOpen}
          onClick={() => toggleDrawer(true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* <a href="Home.php" className="center-logo" aria-label="Solar Pets, perros y gatos"> */}
          <Link to="/" className="center-logo" aria-label="Solar Pets, perros y gatos">
          <img src={logo} alt="Icono de la empresa" className="logo" />
          <span className="brand">
            <span className="brand-name">Solar Pets</span>
            <span className="brand-sub">PERROS Y GATOS</span>
          </span>
          </Link>
        {/* </a> */}

        <form
          className={`search${searchOpen ? " open" : ""}`}
          id="search"
          role="search"
          onSubmit={handleSearchSubmit}
        >
          <button
            type="button"
            className="search-toggle"
            id="searchToggle"
            aria-label="Buscar"
            onSubmit={handleSearchToggle}
          >
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="10.5" cy="10.5" r="6.5"></circle>
              <line x1="15.5" y1="15.5" x2="21" y2="21"></line>
            </svg>
          </button>
          <input
            type="search"
            className="search-input"
            id="searchInput"
            placeholder="Buscar un producto.."
            ref={searchInputRef}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </form>

        <nav className="right-links">
          {esAdmin && (
            <a className="admin-btn" href="CRUD.php">
              ADMIN
            </a>
          )}
          <a className="Link" href="Servicios.php">Servicios</a>
          <a className="Link" href="Turnos.php">Sacar turnos</a>
          <a className="Link" href="Adopcion.php">Adopción</a>
          <a className="Link" href="Delivery.php">Delivery</a>

          {logueado ? (
            <a
              className="ProfileLink"
              id="profileLink"
              href="../Views/Profile.php"
              title={nombre || undefined}
            >
              {foto ? (
                <img src={foto} alt="Foto de perfil" className="ImgProfile" />
              ) : (
                <span className="ImgProfile avatar-fallback" aria-label="Perfil">
                  {(nombre || "?").charAt(0).toUpperCase()}
                </span>
              )}
            </a>
          ) : (
            // Mientras carga se reserva el espacio (invisible) para que no salte el layout
            <div
              className={`auth-buttons${cargando ? " auth-loading" : ""}`}
              id="authButtons"
              aria-hidden={cargando}
            >
              {/* <a href="Registro.php" className="auth-link" tabIndex={cargando ? -1 : undefined}> */}
                <Link to="/register" className="auth-link" tabIndex={cargando ? -1 : undefined}>
                  <img src={btnRegistro} alt="Imagen de Registrarse" />
                </Link>
              {/* </a> */}
              {/* <a href="Login.php" className="auth-link" tabIndex={cargando ? -1 : undefined}> */}
                <Link to="/login" className="auth-link" tabIndex={cargando ? -1 : undefined}>
                  <img src={btnLogin} alt="Imagen de Iniciar sesión" />
                </Link>
              {/* </a> */}
            </div>
          )}
        </nav>
      </header>

      {/* Menú lateral */}
      <div
        className={`drawer-backdrop${drawerOpen ? " active" : ""}`}
        id="drawerBackdrop"
        onClick={() => toggleDrawer(false)}
      ></div>
      <aside
        className={`drawer${drawerOpen ? " active" : ""}`}
        id="drawer"
        ref={drawerRef}
        aria-hidden={!drawerOpen}
      >
        <button
          className="drawer-close"
          id="drawerClose"
          aria-label="Cerrar menú"
          onClick={() => toggleDrawer(false)}
        >
          &times;
        </button>
        <a className="Link" href="../Views/PrincipalPage.php">Página principal</a>
        <a className="Link" href="Servicios.php">Servicios</a>
        <a className="Link" href="Turnos.php">Sacar turnos</a>
        <a className="Link" href="Adopcion.php">Adopción</a>
        <a className="Link" href="Delivery.php">Delivery</a>
        {esAdmin && (
          <a className="Link admin-drawer" href="CRUD.php">
            Administración
          </a>
        )}
        {logueado && (
          <button className="Link logout-btn" onClick={handleLogoutClick}>
            Cerrar sesión
          </button>
        )}
      </aside>

      {/* Modal de confirmación */}
      <div
        id="logoutModal"
        className={`logout-modal${modalOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logoutTitle"
        aria-hidden={!modalOpen}
        onClick={handleModalBackdropClick}
      >
        <div className="logout-content">
          <h3 id="logoutTitle">¿Seguro que quieres cerrar tu sesión actual?</h3>
          <div className="logout-buttons">
            <button id="confirmLogout" className="confirm" onClick={handleConfirm}>
              Sí, cerrar sesión
            </button>
            <button id="cancelLogout" className="cancel" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
