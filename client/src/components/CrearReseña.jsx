import { useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';


import "./CrearReseña.css";

function CrearReseña() {

    const [descripcion, setDescripcion] = useState('');
    const [valoracion, setValoracion] = useState('');
    const { id } = useParams();


    const agregarReseña = async () => {
        if (!descripcion || !valoracion) {
            return alert("Complete todos los campos");
        }


        try {

            const token = localStorage.getItem('token')

            const response = await axios.post('http://localhost:3000/resena', {

                descripcion,
                valoracion,
                idProducto: id
            },
                {
                    headers:
                    {
                        Authorization: 'Bearer ' + token
                    }
                }

            );

            alert("Comentario agregado exitosamente");
            console.log(response.data);

        } catch (error) {
            console.error(error);
            alert("Error al agregar comentario");
        }
    }


    return (
        <section className="crear-resena">
            <h3 className="crear-resena__titulo">Dejá tu reseña</h3>

            <textarea
                className="crear-resena__campo crear-resena__texto"
                placeholder="Contanos qué te pareció el producto..."
                value={descripcion}
                onChange={(event) => setDescripcion(event.target.value)}
            />

            <select
                className="crear-resena__campo"
                value={valoracion}
                onChange={(event) => setValoracion(event.target.value)}
            >
                <option value="" disabled hidden>Valoración del 1 al 5...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <button className="crear-resena__boton" type="button" onClick={agregarReseña}>
                Compartir reseña
            </button>
        </section>
    )

}


export default CrearReseña;