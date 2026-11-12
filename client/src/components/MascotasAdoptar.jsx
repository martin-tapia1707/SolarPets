import { useState, useEffect } from 'react';
import axios from 'axios';
 
import './MascotasAdoptar.css';

function Adoptar() {
 
    const [mascotas, setMascotas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [abierta, setAbierta] = useState(null);
    const obtenerMascotas = async () => {
        try {
            const response = await axios.get('http://localhost:3000/mascota/ma');
            setMascotas(response.data.mascotas);
        } catch (error) {
            if (error.response?.status === 404) {
                setMascotas([]);
            } else {
                console.error(error);
                setError('No pudimos cargar las mascotas. Intentá de nuevo más tarde.');
            }
        } finally {
            setCargando(false);
        }
    };
 
    useEffect(() => {
        obtenerMascotas();
    }, []);
 
    const iconoAnimal = (animal) => {
        const tipo = animal?.toLowerCase();
        if (tipo === 'perro') return '🐶';
        if (tipo === 'gato') return '🐱';
        return '🐾';
    };
 
    const alternarDetalle = (id) => {
        setAbierta(abierta === id ? null : id);
    };
 
    return (
        <div className="adoptar-page">
 
            <div className="adoptar-encabezado">
                <h2 className="adoptar-title">Adoptar mascotas</h2>
                <p className="adoptar-intro">
                    Conocé a las mascotas que están esperando un hogar. Si alguna te convence,
                    acercate a nuestro local y adoptala ahí.
                </p>
            </div>
 
            {cargando && <p className="adoptar-mensaje">Cargando mascotas..</p>}
 
            {error && <p className="adoptar-mensaje adoptar-mensaje--error">{error}</p>}
 
            {!cargando && !error && mascotas.length === 0 && (
                <p className="adoptar-mensaje">No hay mascotas para adoptar por el momento.</p>
            )}
 
            <div className="adoptar-grid">
                {mascotas.map((mascota) => (
                    <article className="adoptar-card" key={mascota.id}>
 
                        <div className="adoptar-imagen" aria-hidden="true">
                            {iconoAnimal(mascota.animal)}
                        </div>
 
                        <div className="adoptar-info">
                            <h3>{mascota.nombre}</h3>
                            <p className="adoptar-datos">
                                {mascota.animal} · {mascota.raza} · {mascota.edad} {mascota.edad === 1 ? 'año' : 'años'}
                            </p>
 
                            {abierta === mascota.id && (
                                <div className="adoptar-detalle">
                                    {mascota.estado && (
                                        <p><strong>Estado:</strong> {mascota.estado}</p>
                                    )}
                                    {mascota.antecedentes && (
                                        <p><strong>Antecedentes:</strong> {mascota.antecedentes}</p>
                                    )}
                                    {mascota.historialMedico && (
                                        <p><strong>Historial médico:</strong> {mascota.historialMedico}</p>
                                    )}
                                </div>
                            )}
 
                            <button
                                type="button"
                                className="adoptar-btn"
                                aria-expanded={abierta === mascota.id}
                                onClick={() => alternarDetalle(mascota.id)}
                            >
                                {abierta === mascota.id ? 'Ver menos' : 'Ver más'}
                            </button>
                        </div>
 
                    </article>
                ))}
            </div>
 
        </div>
    );
}
 
export default Adoptar;