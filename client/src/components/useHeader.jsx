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

    fetch(USER_DATA_URL, { signal: controller.signal })
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

  const [drawerAbierto, setDrawerAbierto] = useState(false);

  const [buscadorAbierto, setBuscadorAbierto] = useState(false);
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

  const [modalAbierto, setModalAbierto] = useState(false);

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