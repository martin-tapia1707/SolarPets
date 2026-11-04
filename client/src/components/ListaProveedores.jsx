import { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

import "./ListaProveedores.css";

    function ListaProveedores() {

        const [proveedores, setProveedores] = useState([]);

        const listaProveedores = async () => {
            try {
                const token = localStorage.getItem('token');

                console.log("TOKEN:", token);

                const response = await axios.get("http://localhost:3000/proveedor", 
                    {
                        headers: 
                        {
                            authorization: "Bearer " + token
                        }
                    })

                setProveedores(response.data || []);
                
            } catch(error) {
                console.error(error);
                alert("Error al obtener proveedores");
                
            }
            
        }

    useEffect(() => {
        listaProveedores();
    }, []);

    return (

    <section className="proveedores">

        {proveedores.length === 0 ? (

            <p>No hay proveedores registrados.</p>

        ) : (

            proveedores.map((proveedor) => (
                <article className="proveedores__tarjeta" key={proveedor.id}>

                    <h3 className="proveedores__nombre">{proveedor.nombre}</h3>
                    <p className="proveedores__dato">Telefono: {proveedor.telefono}</p>
                    <p className="proveedores__dato">Dirección: {proveedor.direccion}</p>
                    <p className="proveedores__dato proveedores__dato--id">ID: {proveedor.id}</p>
                    <button onClick={() => window.open(proveedor.enlace, '_blank')} className="proveedores__boton" type="button">
                        Encargar
                    </button>

                </article>
            ))

        )}

    </section>

    );

}

export default ListaProveedores;