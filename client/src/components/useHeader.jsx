import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Rutas del backend: si cambian, se tocan solo acá.
const USER_DATA_URL = "../FuncionesPHP/Home/getUserData.php";
const LOGOUT_URL = "../FuncionesPHP/Logout.php";

// Misma lógica que Header.js, pasada a un hook de React.
export default function useHeader() {
  const navigate = useNavigate();
  // --- Datos del usuario ---
  const [cargando, setCargando] = useState(true); // evita el parpadeo botones -> avatar
  const [logueado, setLogueado] = useState(false);
  const [nombre, setNombre] = useState("");
  const [foto, setFoto] = useState("");
  const [esAdmin, setEsAdmin] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch(USER_DATA_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          console.warn(data.error); // sin sesión: quedan los botones de registro/login
          return;
        }
        setLogueado(true);
        setNombre(data.Nombre || "");
        setFoto(data.foto || "");
        setEsAdmin(data.rol === "ADMINISTRADOR");
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error("Error al obtener usuario:", err);
      })
      .finally(() => {
        if (!controller.signal.aborted) setCargando(false);
      });

    return () => controller.abort();
  }, []);

  // --- Menú lateral ---
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const toggleDrawer = (open) => setDrawerOpen(open);

  // Cerrado: sus enlaces no deben poder enfocarse con Tab
  useEffect(() => {
    if (drawerRef.current) drawerRef.current.inert = !drawerOpen;
  }, [drawerOpen]);

  // --- Buscador (en móvil la lupa despliega el campo) ---
  const [searchOpen, setSearchOpen] = useState(false);
  const [texto, setTexto] = useState("");
  const searchInputRef = useRef(null);

  const handleSearchToggle = () => setSearchOpen((v) => !v);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = texto.trim().toLowerCase();
    if (!q) return;

    const encoded = encodeURIComponent(q);
    navigate(`/productos/${encoded}?_q=${encoded}`);
    setSearchOpen(false); // cierra el campo en móvil
  };

  // El foco va después de que el campo ya se mostró
  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  // --- Modal de logout ---
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setDrawerOpen(false);
    setModalOpen(true);
  };

  const handleCancel = () => setModalOpen(false);

  const handleConfirm = () => {
    window.location.href = LOGOUT_URL;
  };

  // Clic en el fondo oscuro (fuera del cuadro) cierra el modal
  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) setModalOpen(false);
  };

  // Escape cierra el drawer y el modal
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        setModalOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Con drawer o modal abiertos, la página de atrás no scrollea
  useEffect(() => {
    if (!drawerOpen && !modalOpen) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previo;
    };
  }, [drawerOpen, modalOpen]);

  return {
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
  };
}
