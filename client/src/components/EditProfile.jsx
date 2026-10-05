import { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

import "./EditProfile.css";

function EditProfile() {
    return (
        <>
            <div className="perfil-page">
                <form className="perfil-card">
                    <h2 className="perfil-title">Editar Perfil</h2>

                    <input className="perfil-input" type="text" placeholder="Cambiar Nombre(s)..."/>
                    <input className="perfil-input" type="text" placeholder="Cambiar Apellido(s)..."/>
                    <input className="perfil-input" type="tel" placeholder="Cambiar Telefono"/>
                    <input className="perfil-input" type="password" placeholder="Cambiar Contraseña"/>
                    <input className="perfil-input" type="password" placeholder="Confirmar Contraseña"/>

                    <button className="perfil-btn" type="submit">Guardar Cambios</button>
                </form>
            </div>
        </>
    );
}

export default EditProfile;