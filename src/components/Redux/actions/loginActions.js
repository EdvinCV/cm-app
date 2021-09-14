// Actions types
import {
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    LOGOUT,
    CLEAR_STORE,
    CLEAR_AUTENTICACION,
    CLEAR_CAJAS,
    CLEAR_USUARIOS,
    CLEAR_PRODUCTOS,
    CLEAR_CATEGORIAS,
    CLEAR_VENTAS
} from '../actionTypes';
// ACTIONS DE AUTENTICACION
import {client} from '../../../config/axios';
import Swal from 'sweetalert2';

// Login Usuario
export const loginUser = (user) => {
    return async (dispatch) => {
        try {
            const resp = await client.post('api/users/login', user);
            dispatch({
                type: LOGIN_EXITOSO,
                user: resp.data.user,
                token: resp.data.access_token
            });
            Swal.fire({
                imageUrl: "icons/chat.png",
                imageWidth: 200,
                title: `Bienvenido ${resp.data.user.name}`,
                html:'Chat-Móvil',
                icon:'success',
                confirmButtonText: 'Continuar'
            });
        } catch(error) {
            dispatch({
                type: LOGIN_ERROR
            });
            Swal.fire(
                'Credenciales incorrectas.',
                'El usuario o contraseña son incorrectos.',
                'error'
            );
        }
    }
}

export const userLogout = () => {
    return async(dispatch) => {
        dispatch({type: LOGOUT});
        Swal.fire({
            imageUrl: "icons/chat.png",
            imageWidth: 200,
            title: `Ha finalizado sesión correctamente.`,
            html:'Chat-Móvil',
            icon:'success',
            confirmButtonText: 'Cerrar'
        });
    }
}