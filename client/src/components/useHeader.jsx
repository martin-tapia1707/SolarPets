import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const USER_DATA_URL = "../FuncionesPHP/Home/getUserData.php";
const LOGOUT_URL = "../FuncionesPHP/Logout.php";

export default function useHeader() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch(USER_DATA_URL, { signal: controller.signal }) //  Supuestamente aca llama al usuario en php(cosa que no existe xd) y lo guarda en variables este bloque hace eso y no soy un iavoid
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.error) return console.warn(data.error);
        setUsuario({
          nombre: data.Nombre || "",
          foto: data.foto || "",
          esAdmin: data.rol === "ADMINISTRADOR",
        });
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error("Error al obtener usuario:", err);
      })
      .finally(() => {
        if (!controller.signal.aborted) setCargando(false);
      });

    return () => controller.abort();
  }, []);

  const [drawerAbierto, setDrawerAbierto] = useState(false);  // para saber si la barra de sida esta abierta o now

  // aca el buscador 
  const [buscadorAbierto, setBuscadorAbierto] = useState(false);  // esto seria por lo que entendi para saber si el buscador esta abierto o no pero no noto cambio supongo que seria para celulares.
  const [texto, setTexto] = useState("");
  const inputRef = useRef(null);

  const alternarBuscador = () => setBuscadorAbierto((v) => !v);

  const buscar = (e) => {
    e.preventDefault();
    const q = encodeURIComponent(texto.trim().toLowerCase());
    if (!q) return;
    navigate(`/productos/${q}?_q=${q}`);
    setBuscadorAbierto(false);
  };

  useEffect(() => {
    if (buscadorAbierto) inputRef.current?.focus();
  }, [buscadorAbierto]);

  // ni puta idea xdddddddddddddddddddddddddddddddddd
  const [modalAbierto, setModalAbierto] = useState(false);

  // ni puta idea x2 xdddddddddddddddddddddddddddddddddd

  // Algo de cerrar la sesion aunque como aun no funcione el inicio de sesion asi que ni modo
  const pedirLogout = () => {
    setDrawerAbierto(false);
    setModalAbierto(true);
  };
  const cancelarLogout = () => setModalAbierto(false);
  const confirmarLogout = () => {
    window.location.href = LOGOUT_URL;
  };
  const clicFondoModal = (e) => {
    if (e.target === e.currentTarget) setModalAbierto(false);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setDrawerAbierto(false);
        setModalAbierto(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);


  // sepa la bola
  useEffect(() => {
    if (!drawerAbierto && !modalAbierto) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previo;
    };
  }, [drawerAbierto, modalAbierto]);

  return {
    usuario,
    cargando,
    drawer: { abierto: drawerAbierto, setAbierto: setDrawerAbierto },
    buscador: { abierto: buscadorAbierto, texto, setTexto, inputRef, alternar: alternarBuscador, buscar },
    logout: { abierto: modalAbierto, pedir: pedirLogout, cancelar: cancelarLogout, confirmar: confirmarLogout, clicFondo: clicFondoModal },
  };
}