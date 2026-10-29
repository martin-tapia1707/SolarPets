import { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

import "./EditProfile.css";

function EditProfile() {

    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [viejaPassword, setViejaPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarNueva, setConfirmarNueva] = useState('');

    const editarPerfil = async() => {
        try{
            const token = localStorage.getItem('token');
            console.log("TOKEN:", token);

            const response = await axios.patch("http://localhost:3000/clientes/perfil", 
                {
                    nombre,
                    apellido,
                    telefono,
                    password,
                    confirmarNueva,
                    viejaPassword
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
        } catch (error) 
            {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Ocurrió un error al actualizar el perfil"
                );
            }
        }

    return (
        <>
            <div className="perfil-page">
                <form className="perfil-card">


                    <h2 className="perfil-title">Editar Perfil</h2>

                    <h3 className="perfil-subtitle">Datos Personales</h3>

                    <input className="perfil-input" type="text" placeholder="Cambiar Nombre(s)..." value={nombre} onChange={(event) => setNombre(event.target.value)}/>
                    <input className="perfil-input" type="text" placeholder="Cambiar Apellido(s)..." value={apellido} onChange={(event) => setApellido(event.target.value)}/>
                    <input className="perfil-input" type="tel" placeholder="Cambiar Telefono" value={telefono} onChange={(event) => setTelefono(event.target.value)}/>

                    <h3 className="perfil-subtitle perfil-subtitle--sep">Datos Sensibles</h3>

                    <input className="perfil-input" type="password" placeholder="Nueva Contraseña" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    <input className="perfil-input" type="password" placeholder="Confirmar Contraseña Nueva" value={confirmarNueva} onChange={(event) => setConfirmarNueva(event.target.value)}/>

                    <input className="perfil-input perfil-input--actual" type="password" placeholder="Ingresá tu contraseña actual para confirmar tus cambios" value={viejaPassword} onChange={(event) => setViejaPassword(event.target.value)}/>

                    <button type="button" className="perfil-btn" onClick={editarPerfil}>Guardar Cambios</button>


                </form>
            </div>
        </>
    );
}

export default EditProfile;