import { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

import "./EditProfile.css";

function EditProfile() {

    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [passwordActual, setPasswordActual] = useState('');
    const [passwordNueva, setPasswordNueva] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');

    const editarPerfil = async() => {
        try{
            const token = localStorage.getItem('token');
            console.log("TOKEN:", token);

            const response = await axios.patch("http://localhost:3000/clientes/perfil", 
                {
                    nombre,
                    apellido,
                    telefono,
                    passwordNueva,
                    confirmarPassword
                },
                {
                    headers: 
                    {
                        authorization: "Bearer " + token
                    }
                })


                alert("todu bem")
                console.log(response.data);

                navigate('/profile');
        } catch(error) {
            console.error(error);
            alert("todo mal escobar mi hijito");
        }
    }

    return (
        <>
            <div className="perfil-page">
                <form className="perfil-card">
                    <h2 className="perfil-title">Editar Perfil</h2>



                    <input className="perfil-input" type="text" placeholder="Cambiar Nombre(s)..." value={nombre} onChange={(event) => setNombre(event.target.value)}/>
                    <input className="perfil-input" type="text" placeholder="Cambiar Apellido(s)..." value={apellido} onChange={(event) => setApellido(event.target.value)}/>
                    <input className="perfil-input" type="tel" placeholder="Cambiar Telefono" value={telefono} onChange={(event) => setTelefono(event.target.value)}/>

                    {/* separador separadin */}

                    <input className="perfil-input" type="password" placeholder="Cambiar Contraseña" value={password} onChange={(event) => setPasswordNueva(event.target.value)}/>
                    <input className="perfil-input" type="password" placeholder="Confirmar Contraseña" value={confirmar} onChange={(event) => setConfirmarPassword(event.target.value)}/>

                    <button type="button" className="perfil-btn" onClick={editarPerfil}>Guardar Cambios</button>
                </form>
            </div>
        </>
    );
}

export default EditProfile;