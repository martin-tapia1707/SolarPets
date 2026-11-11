import { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

import admin from "../assets/admin.jfif";

import "./CRUD.css";

function CRUD() {

    //crear
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [salario, setSalario] = useState('');
    const [telefono, setTelefono] = useState('');
    const [turno, setTurno] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [fechaAlta, setFechaAlta] = useState('');
    const [fechaBaja, setFechaBaja] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    //leer
    const [empleados, setEmpleados] = useState([]);
    // actualizar
    const [idActualizar, setIdActualizar] = useState('');
    const [nombreActualizar, setNombreActualizar] = useState('');
    const [apellidoActualizar, setApellidoActualizar] = useState('');
    const [salarioActualizar, setSalarioActualizar] = useState('');
    const [telefonoActualizar, setTelefonoActualizar] = useState('');
    const [turnoActualizar, setTurnoActualizar] = useState('');
    const [localidadActualizar, setLocalidadActualizar] = useState('');
    const [fechaAltaActualizar, setFechaAltaActualizar] = useState('');
    const [fechaBajaActualizar, setFechaBajaActualizar] = useState('');
    const [especialidadActualizar, setEspecialidadActualizar] = useState('');

    const crearEmpleado = async () => {

        if (!nombre || !apellido || !salario || !telefono || !turno || !localidad || !fechaAlta) {
        return alert("Complete todos los campos");
    }

        try{
            const token = localStorage.getItem('token');

            const response = await axios.post('http://localhost:3000/empleado', {
                nombre,
                apellido,
                establecimiento: "Lavalle 3571",
                salario,
                telefono,
                turno,
                localidad,
                fechaAlta,
                fechaBaja: fechaBaja || null,
                especialidad,
                idRol: 2
            },
            {
                headers: 
                {
                    authorization: 'Bearer ' + token
                }
            }
        );

            alert("Empleado registrado correctamente en el sistema")
            listaEmpleados();
            console.log(response.data); // entra?
        } catch(error) {
            console.error(error);
            alert("Error al registrar empleado");
        }
    }

    const listaEmpleados = async () => {
        try{

            const token = localStorage.getItem('token');

            const response = await axios.get("http://localhost:3000/empleado", 
                {
                    headers: 
                    {
                        authorization: "Bearer " + token
                    }
                })
            setEmpleados(response.data.empleados);

        } catch(error) {
            console.error(error);
            alert("Error al mostrar lista de empleados");
        }
    }

    useEffect(() => {
        listaEmpleados();
    }, []);

    const borrarEmpleados = async (id) => {
        
        const confirmar = window.confirm("¿Está seguro de eliminar este empleado?");

        if (!confirmar) {
            return;
        }
        
        try{
            const token = localStorage.getItem('token');

            const response = await axios.delete("http://localhost:3000/empleado/" + id, 
                {
                    headers: 
                    {
                        authorization: "Bearer " + token
                    }
                })
            alert("Empleado eliminado con exito");
            listaEmpleados();
        } catch(error) {
            console.error(error);
            alert("Error al eliminar empleado");
        }
    }

    const actualizarEmpleados = async(id) => {

    if (!id) {
        return alert("Ingrese el ID del empleado");
    }

        try{
            const token = localStorage.getItem('token');
            console.log("TOKEN:", token);

            const response = await axios.patch("http://localhost:3000/empleado/" + id, 
                {
                    nombre: nombreActualizar,
                    apellido: apellidoActualizar,
                    salario: salarioActualizar,
                    telefono: telefonoActualizar,
                    turno: turnoActualizar,
                    localidad: localidadActualizar,
                    fechaAlta: fechaAltaActualizar,
                    fechaBaja: fechaBajaActualizar || null,
                    especialidad: especialidadActualizar
                },
                {
                    headers: 
                    {
                        authorization: "Bearer " + token
                    }
                })


                alert("Empleado actualizado correctamente")
                console.log(response.data);
                listaEmpleados();
        } catch (error) 
            {
            console.error(error);

            alert("Ocurrió un error al actualizar al empleado");
            }
        }

    return (
        <div className="crud-page" style={{ backgroundImage: `url(${admin})` }}>

            {/* ---------- AÑADIR EMPLEADO ---------- */}
            <div className="crud-card">

                <h1 className="crud-title">Empleado</h1>
                <h2 className="crud-subtitle">Añadir</h2>

                <form className="crud-form">
                    <input className="crud-field" type="text" placeholder="Nombre(s)" value={nombre} onChange={(event) => setNombre(event.target.value)}/>
                    <input className="crud-field" type="text" placeholder="Apellido(s)" value={apellido} onChange={(event) => setApellido(event.target.value)} />

                    <input className="crud-field" type="text" placeholder="Salario" value={salario} onChange={(event) => setSalario(event.target.value)} />
                    <input className="crud-field" type="text" placeholder="Teléfono" value={telefono} onChange={(event) => setTelefono(event.target.value)} />

                    <select className="crud-field crud-select" value={turno} onChange={(event) => setTurno(event.target.value)} required>
                        <option value="" disabled hidden>Turno</option>
                        <option value="mañana">Mañana</option>
                        <option value="tarde">Tarde</option>
                        <option value="noche">Noche</option>
                    </select>
                    <input className="crud-field" type="text" placeholder="Localidad" value={localidad} onChange={(event) => setLocalidad(event.target.value)} />

                    <div className="crud-date-group">
                        <label className="crud-label" htmlFor="fechaAlta">Fecha Alta</label>
                        <input id="fechaAlta" className="crud-field" type="date" value={fechaAlta} onChange={(event) => setFechaAlta(event.target.value)} />
                    </div>

                    <div className="crud-date-group">
                        <label className="crud-label" htmlFor="fechaBaja">Fecha Baja</label>
                        <input id="fechaBaja" className="crud-field" type="date" value={fechaBaja} onChange={(event) => setFechaBaja(event.target.value)} />
                    </div>

                    <select className="crud-field crud-select crud-field--full" value={especialidad} onChange={(event) => setEspecialidad(event.target.value)} required>
                        <option value="" disabled hidden>Especialidad...</option>
                        <option value="veterinario">Veterinario</option>
                        <option value="peluquero">Peluquero</option>
                        <option value="recepcionista">Recepcionista</option>
                    </select>

                    <button className="crud-button" type="button" onClick={crearEmpleado}>Añadir Empleado</button>
                </form>

            </div>





            {/* ---------- ACTUALIZAR EMPLEADO ---------- */}
            <div className="crud-card crud-card--update">

                <div className="crud-card-header">
                    <h2 className="crud-header-title">Actualizar Empleado</h2>
                </div>

                <form className="crud-form">
                    <input className="crud-field crud-field--full" type="number" placeholder="ID" value={idActualizar} onChange={(event) => setIdActualizar(event.target.value)}/>

                    <input className="crud-field" type="text" placeholder="Nombre(s)" value={nombreActualizar} onChange={(event) => setNombreActualizar(event.target.value)}/>
                    <input className="crud-field"type="text" placeholder="Apellido(s)" value={apellidoActualizar} onChange={(event) => setApellidoActualizar(event.target.value)}/>

                    <input className="crud-field" type="text" placeholder="Salario" value={salarioActualizar} onChange={(event) => setSalarioActualizar(event.target.value)}/>

                    <input className="crud-field" type="text" placeholder="Teléfono" value={telefonoActualizar} onChange={(event) => setTelefonoActualizar(event.target.value)}/>

                    <select className="crud-field crud-select" value={turnoActualizar} onChange={(event) => setTurnoActualizar(event.target.value)}>
                        <option value="" disabled hidden>Turno</option>
                        <option value="mañana">Mañana</option>
                        <option value="tarde">Tarde</option>
                        <option value="noche">Noche</option>
                    </select>

                    <input className="crud-field" type="text" placeholder="Localidad" value={localidadActualizar} onChange={(event) => setLocalidadActualizar(event.target.value)}/>

                    <input id="fechaAltaActualizar" className="crud-field" type="date" value={fechaAltaActualizar} onChange={(event) => setFechaAltaActualizar(event.target.value)}/>

                    <input id="fechaBajaActualizar" className="crud-field" type="date" value={fechaBajaActualizar} onChange={(event) => setFechaBajaActualizar(event.target.value)}/>

                    <select className="crud-field crud-select crud-field--full" value={especialidadActualizar} onChange={(event) => setEspecialidadActualizar(event.target.value)}>
                        <option value="" disabled hidden>Especialidad...</option>
                        <option value="veterinario">Veterinario</option>
                        <option value="peluquero">Peluquero</option>
                        <option value="recepcionista">Recepcionista</option>
                    </select>

                    <button className="crud-button" type="button" onClick={() => actualizarEmpleados(idActualizar)}>Actualizar Empleado</button>
                </form>

            </div>






            {/* ---------- LISTA DE EMPLEADOS ---------- */}
            <div className="lista-card">

                <div className="lista-header">
                    <h2 className="lista-title">Lista de Empleados</h2>
                </div>

                <table className="lista-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Salario</th>
                            <th>Teléfono</th>
                            <th>Turno</th>
                            <th>Localidad</th>
                            <th>Especialidad</th>
                            <th>Fecha Alta</th>
                            <th>Fecha Baja</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.length > 0 ? (
                            empleados.map((empleado) => (
                                <tr key={empleado.id}>
                                    <td>{empleado.id}</td>
                                    <td>{empleado.nombre}</td>
                                    <td>{empleado.apellido}</td>
                                    <td>${empleado.salario}</td>
                                    <td>{empleado.telefono}</td>
                                    <td>{empleado.turno}</td>
                                    <td>{empleado.localidad}</td>
                                    <td>{empleado.especialidad}</td>
                                    <td>{empleado.fechaAlta}</td>
                                    <td>{empleado.fechaBaja}</td>
                                    <td>
                                        <button
                                            className="btn-eliminar"
                                            type="button"
                                            onClick={() => borrarEmpleados(empleado.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No hay empleados</td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default CRUD;