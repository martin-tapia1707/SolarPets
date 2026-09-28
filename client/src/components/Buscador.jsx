import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './producto.css';

function Buscador(){

    const { texto } = useParams();
    const mostrar = async()=>{
        try {
            const response = await axios.get();
                
        } catch (error) {
            
        }
        
    }

    useEffect(()=>{
        mostrar();
    },[]);

    return(
        <>
            <h1>Hola</h1>
        </>
    );
}

export default Buscador;