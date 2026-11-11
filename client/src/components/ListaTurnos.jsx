import { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

import './ListaTurnos.css';

function ListaTurnos() {

    const [turnos, setTurnos] = useState([]);

    const listaTurnos = async () => {
        try{

            const token = localStorage.getItem('token');

            const response = await axios.get("http://localhost:3000/turno/lista", 
                {
                    headers: 
                    {
                        authorization: "Bearer " + token
                    }
                })
            setTurnos(response.data.turnosCliente);

        } catch(error) {
            console.error(error);
            alert("Error al cargar turnos");
        }
    }

    useEffect(() => {
        listaTurnos();
    }, []);

return (
        <section className="turnos">
        <h2 className="turnos__titulo">Turnos Pendientes</h2>

        <table className="turnos__tabla">
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Cita</th>
                <th>Animal</th>
                <th>Raza</th>
                <th>Servicio</th>
                <th>Motivo</th>
                
            </tr>
            </thead>
            <tbody>
                {turnos.length > 0 ? (

                    turnos.map((turno) => (
                        <tr key={turno.id}>
                            <td>{turno.nombre}</td>
                            <td>
                                {new Date(turno.cita).toLocaleString('es-AR', {   // crea una fecha q contiene la fecha del turno  
                                    timeZone: 'America/Argentina/Buenos_Aires' // con toLocaleString la convierte a texto legible
                                })} 
                            </td>
                            <td>{turno.animal}</td>
                            <td>{turno.raza}</td>
                            <td>{turno.servicio}</td>
                            <td>{turno.motivo}</td>
                        </tr>
                    ))

                ) : (

                    <tr>
                        <td colSpan="6">No hay turnos pendientes</td>
                    </tr>

                )}

            </tbody>
        </table>
        </section>
    );
}

export default ListaTurnos;