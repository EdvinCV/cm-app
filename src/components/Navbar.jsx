import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { userLogout } from './Redux/actions/loginActions';
import { useHistory } from 'react-router-dom';
import { obtenerUsuario } from './Redux/actions/usersActions';

const Navbar = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        // Obtener info del usuario logueado.
        dispatch(obtenerUsuario());
    }, [dispatch])

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(userLogout());
        history.push("/login");
    }

    return (
        <nav className="navbar navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <span 
                    className="navbar-brand mb-0 h1"
                    onClick={() => history.push("/home")}
                >
                    <img src="icons/chat.png" width="60px" alt="ChatMovil" />
                </span>
                <span
                    className="navbar-text"
                    onClick={handleLogout}
                    href="#"
                >
                    Cerrar Sesión
                </span>
            </div>
            
        </nav>
    );
}

export default Navbar;