import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import './ListaReseña.css'

function ListaReseña() {
    const [reseña, setReseña] = useState([]);
    const { id } = useParams();

    const listaComentario = async () => {
        try {


            const response = await axios.get(`http://localhost:3000/resena/producto/${id}`);

            setReseña(response.data.ListadoReseña || []);
        } catch (error) {
            console.error(error);
            alert("Error al cargar comentarios")
        }
    };
    useEffect(() => {
        listaComentario();
    }, [id]);

    return (
        <section className="lista-resenas">
            <h3 className="lista-resenas__titulo">Reseñas de clientes</h3>
            {reseña.length === 0 ? (
                <p className="lista-resenas__vacio">No hay reseñas sobre este producto</p>
            ) : (
                <div className="lista-resenas__items">
                {reseña.map((comentario) => (

                    <article key={comentario.id} className="resena-item">
                        <h4 className="resena-item__autor">{comentario.Cliente?.nombre} {comentario.Cliente?.apellido}</h4>
                        <p className="resena-item__valoracion">Valoración: {comentario.valoracion}/5</p>
                        <p className="resena-item__texto">{comentario.descripcion}</p>
                    </article>

                ))}
                </div>
            )}
        </section>
    );
}

export default ListaReseña
