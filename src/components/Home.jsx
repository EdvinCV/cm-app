import React, {useEffect} from 'react';
import './style.css';
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { obtenerUsuario } from './Redux/actions/usersActions';
import Loader from 'react-loader-spinner';

const Home = () => {
    // HOOKS
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        // Obtener info del usuario logueado.
        dispatch(obtenerUsuario());
    }, [dispatch])

    // STORE
    const usuario = useSelector((state) => state.usuarios);

    if(usuario.me !== null){
        return (
            <>
            <div className="contenedor p-5">
                {/* VENTAS */}
                <div 
                    className="contenedor1"
                    id="uno"
                    onClick={() => history.push("/venta")}
                >
                    <img  className="icon" src="icons/ventas.png" width="50px" alt="VENTAS"></img>
                    <p className="texto">VENTAS</p>
                </div>
                < div className="contenedor0" id="cero" /> 
                {/* PRODUCTOS */}
                < div 
                    className="contenedor1"
                    id="dos"
                    onClick={() => history.push("/productos")}
                >
                    <img  className="icon" src="icons/productos.png" width="50px" alt="PRODUCTOS"></img>
                    <p className="texto">PRODUCTOS</p>
                </div>
                < div className="contenedor0" id="cero" /> 
                {/* USUARIOS Y REPORTES */}
                {
                    usuario.me !== null && usuario.me.rol === "ADMIN" &&
                        <>
                        < div 
                            className="contenedor1"
                            id="tres"
                            onClick={() => history.push("/usuarios")}
                        >
                            <img  className="icon" src="icons/usuarios.png" width="50px" alt="USUARIOS"></img>
                            <p className="texto">USUARIOS</p>
                        </div>
                        < div className="contenedor0" id="cero" /> 
                        < div 
                            className="contenedor1"
                            id="cuatro"
                            onClick={() => history.push("/ventas")}
                        >
                            <img  className="icon" src="icons/reportes.png" width="50px" alt="REPORTES"></img>
                            <p className="texto">REPORTES</p>
                        </div>
                        < div className="contenedor0" id="cero" /> 
                        </>
                }
                < div 
                    className="contenedor1"
                    id="cinco"
                    onClick={() => history.push("/caja")}
                >
                    <img  className="icon" src="icons/caja.png" width="50px" alt="CAJA"></img>
                    <p className="texto">CAJA</p>
                </div>
                < div className="contenedor0" id="cero" /> 
                < div 
                    className="contenedor1"
                    id="cinco"
                    onClick={() => history.push("/canceladas")}
                >
                    <img  className="icon" src="icons/cancelaciones.png" width="50px" alt="CANCELACIONES"></img>
                    <p className="texto">CANCELACIONES</p>
                </div>
                < div className="contenedor0" id="cero" /> 
            </div>
            </>
        );
    }else {
        return(
            <div
                style={{display:"flex", alignItems:"center", justifyContent:"center"}}
            >
                <Loader
                    type="ThreeDots"
                    color="#ff4b9a"
                    height={100}
                    width={100}
                />
            </div>
        )
    }
}

export default Home;