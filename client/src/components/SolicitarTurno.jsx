import { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

import "./SolicitarTurno.css";
import sacarturno from "../assets/sacarturno.png";

function SolicitarTurno() {

    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [cita, setCita] = useState('');
    const [hora, setHora] = useState('');
    const [motivo, setMotivo] = useState('');
    const [animal, setAnimal] = useState('');
    const [raza, setRaza] = useState('');
    const [servicio, setServicio] = useState('');

    const agregarTurno = async () => {

    if (!nombre || !cita || !hora || !motivo || !animal || !raza || !servicio) {
        return alert("Complete todos los campos");
    }

    const citaCompleta = cita + ' ' + hora; // combino fecha y hora en una variable, por lo que vi no hay input date/hour asi que solo queda esto po

    if (new Date(citaCompleta) <= new Date()) {
    return alert("La fecha u hora deben ser posteriores a la actual");
    }

        try{
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3000/turno', {
                nombre,
                cita: citaCompleta,
                motivo,
                animal,
                raza,
                servicio
            },
            {
                headers: 
                {
                    authorization: 'Bearer ' + token
                }
            }
        );

            alert("Turno solicitado correctamente")
            console.log(response.data); // entra?
            navigate('/profile'); // por ahora un navigate al perfil, despues lo cambio a lista de turnos (cuando tenga el apartado)

        } catch(error) {
            console.error(error);
            alert("Error al solicitar turno");
        }
    }

    return (
        <div className="turno">
        <section className="turno__form">
            <h1 className="turno__titulo">Tramite de solicitud de Turno</h1>

            <input className="turno__campo" type="text" placeholder="Nombre de la Mascota" value={nombre} onChange={(event) => setNombre(event.target.value)}/>

            <select className="turno__campo turno__select" value={animal} onChange={(event) => setAnimal(event.target.value)} required>
                <option value="" disabled hidden>Tipo de Animal...</option>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
            </select>

            <input className="turno__campo" type="text" placeholder="Raza de la Mascota" value={raza} onChange={(event) => setRaza(event.target.value)}/>

            <select className="turno__campo turno__select" value={servicio} onChange={(event) => setServicio(event.target.value)} required>
                <option value="" disabled hidden>Tipo de Servicio...</option>
                <option value="veterinaria">Veterinaria</option>
                <option value="peluqueria">Peluquería</option>
            </select>

            <input className="turno__campo turno__select" type="date" placeholder="Fecha del Turno.." value={cita} onChange={(event) => setCita(event.target.value)} required />
            
            <input className="turno__campo" type="time" value={hora} onChange={(event) => setHora(event.target.value)} required />

            <textarea className="turno__motivo" placeholder="Motivo de la consulta..." value={motivo} onChange={(event) => setMotivo(event.target.value)}/>

            <button className="turno__boton" type="button" onClick={agregarTurno}>Solicitar Turno</button>
        </section>

        <section className="turno__imagen">
            <img src={sacarturno} alt="Perro y gato descansando juntos" />
        </section>
        </div>
    );
}
export default SolicitarTurno;