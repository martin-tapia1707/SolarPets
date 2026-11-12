import { useState, useEffect } from 'react';
import axios from 'axios';

import './MascotasAdoptar.css';

import luna from '../assets/Luna.jpg';
import simon from '../assets/Simon.jpg';
import toby from '../assets/Toby.jpg';
import mora from '../assets/Mora.jpg';
import rocky from '../assets/Rocky.jpg';
import canela from '../assets/Canela.jpg';

const fotos = {
    'Luna': luna,
    'Simón': simon,
    'Toby': toby,
    'Mora': mora,
    'Rocky': rocky,
    'Canela': canela,
};

function Adoptar() {

    const [mascotas, setMascotas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [abierta, setAbierta] = useState(null);

    const obtenerMascotas = async () => {
        try {
            const response = await axios.get('http://localhost:3000/mascota/ma');
            if(response.data.mascotas.length === 0) {
                setError('No hay mascotas para adoptar por el momento.');
            }
            setMascotas(response.data.mascotas);
        } catch (error) {
            if (error.status === 404) {
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
                {mascotas.map((mascota) => {
                    const foto = fotos[mascota.nombre];

                    return (
                        <article className="adoptar-card" key={mascota.id}>

                            <div className="adoptar-imagen">
                                {foto ? (
                                    <img src={foto} alt={`Foto de ${mascota.nombre}`} />
                                ) : (
                                    <div className="adoptar-imagen-placeholder">
                                        <p>Foto no disponible</p>
                                    </div>
                                )}
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
                    );
                })}
            </div>

        </div>
    );
}

export default Adoptar;