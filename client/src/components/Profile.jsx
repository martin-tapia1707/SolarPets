import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";

import './Profile.css'

function Profile() {

    
    const [user, setUser] = useState(null);
    
    const obtenerPerfil = async () => {
        try {
            const token = localStorage.getItem('token');

            console.log("TOKEN:", token);

            const response = await axios.get("http://localhost:3000/clientes/perfil", 
                {
                    headers: 
                    {
                        authorization: "Bearer " + token
                }
            })
            console.log(response.data);
            setUser(response.data.perfilCliente)
            
        } catch(error) {
            console.error(error);
            alert("error en obtener el perfil");
            
        }
        
    }
    
    useEffect(() => {
         obtenerPerfil();
    }, []);

    return (
        <>
            <h1>Mi perfil perfilado</h1>

            {user && (
                <li>{user.email} - {user.nombre} - {user.apellido} - {user.telefono} - {user.rol}</li>
            )}
        </>
    );
}

export default Profile;