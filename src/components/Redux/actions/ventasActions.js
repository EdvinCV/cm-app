// Actions types
import {
    SELECCIONAR_VENTA, AGREGAR_PRODUCTO_CARRITO, CAMBIO_TOTAL_VENTA, ELIMINAR_PRODUCTO_CARRITO, OBTENER_TOTAL_VENTAS, OBTENER_VENTAS, OBTENER_VENTAS_ERROR, VENTA_REALIZADA, OBTENER_VENTAS_CANCELADAS, SELECCIONAR_VENTA_CANCELADA, OBTENER_REPORTE_VENTAS, ELIMINAR_REPORTE_VENTAS, OBTENER_VENTAS_HOY, OBTENER_VENTAS_USUARIOS, OBTENER_LISTADO_VENTAS_HOY, OBTENER_REPORTE_VENTAS_CATEGORIA, OBTENER_VENTAS_GANANCIAS, AGREGAR_PRODUCTOS_CARRITO, OBTENER_VENTAS_ENCABEZADO_HOY
} from '../actionTypes';
// ACTIONS DE AUTENTICACION
import {clientToken} from '../../../config/axios';
import Swal from 'sweetalert2';

/* OBTENER EL TOTAL DE VENTAS REALIZADAS */
export const obtenerTotalVentas = () => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/venta/total');
            dispatch({
                type: OBTENER_TOTAL_VENTAS,
                totalVentas: data.total
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR
            });
        }
    }
}

/* OBTENER TODAS LAS VENTAS GENERADAS EN EL SISTEMA */
export const obtenerVentas = (formFechas) => {
    return async (dispatch) => {
        try {
            const ventas = await clientToken.get('api/venta', {params: {inicio: formFechas.fechaInicio, fin: formFechas.fechaFin}});
            dispatch({
                type: OBTENER_VENTAS,
                ventas: ventas.data.ventas
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR
            });
        }
    }
}

export const obtenerListadoVentasHoy = () => {
    return async (dispatch) => {
        try {
            const ventas = await clientToken.get('api/venta/hoy');
            dispatch({
                type: OBTENER_LISTADO_VENTAS_HOY,
                ventas: ventas.data.ventas
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR
            });
        }
    }
}

/* OBTENER REPORTE DE VENTAS DE USUARIOS */
export const obtenerVentasUsuarios = (formFechas) => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/venta/usuarios', {params: {inicio: formFechas.fechaInicio, fin: formFechas.fechaFin}});
            dispatch({
                type: OBTENER_VENTAS_USUARIOS,
                ventas:data.results
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR
            });
        }
    }
}

/* OBTENER TODAS LAS VENTAS HOY */
export const obtenerVentasHoy = () => {
    return async (dispatch) => {
        try {
            const ventas = await clientToken.get('api/venta/hoy');
            dispatch({
                type: OBTENER_VENTAS_HOY,
                ventas: ventas.data.ventas
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR
            });
        }
    }
}

/* OBTENER TODAS LAS VENTAS CANCELADAS EN EL SISTEMA */
export const obtenerVentasCanceladas = ({fechaInicio, fechaFin}) => {
    return async (dispatch) => {
        try {
            const ventas = await clientToken.get('api/venta/canceladas', {params: {fechaInicio, fechaFin}});
            dispatch({
                type: OBTENER_VENTAS_CANCELADAS,
                ventas: ventas.data.ventas
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR
            });
        }
    }
}

export const seleccionarVenta = (venta) => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/venta/recibo', {params: {id:venta}});
            console.log(data);
            dispatch({
                type: SELECCIONAR_VENTA,
                venta: data
            });
        } catch(error) {
            console.log(error);
        }
    }
}

export const seleccionarVentaCancelada = (venta) => {
    return async (dispatch) => {
        try {
            console.log(venta);
            const {data} = await clientToken.get('api/venta/cancelada', {params: {id:venta.id}});
            dispatch({
                type: SELECCIONAR_VENTA_CANCELADA,
                venta: data
            });
        } catch(error) {
            console.log(error);
        }
    }
}

/* GENERAR UNA NUEVA VENTA */
export const generarVenta = (formValues) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const venta = {
                venta: formValues,
                total: parseInt(state.ventas.total),
                usuario: state.usuarios.me
            }
            const productos = state.ventas.productosSeleccionados;
            const {data} = await clientToken.post('api/venta', {venta, productos});
            console.log("VENDIDOS:::",data.productosVendidos);
            await dispatch({
                type: VENTA_REALIZADA,
                recibo: data.recibo,
                productosVendidos: data.productosVendidos
            });
            await dispatch({
                type: "ELIMINAR_RECIBO"
            })
            Swal.fire(
                'Venta realizada correctamente.',
                'ChatMóvil.',
                'success'
            );
        }catch(error){
            console.log(error);
            Swal.fire(
                'Ha ocurrido un error.',
                'ChatMóvil.',
                'error'
            );
        }
    }
}

export const cancelarVenta = (venta) => {
    return async (dispatch) => {
        try {
            
            await clientToken.post('api/venta/delete', {venta});
            const ventas = await clientToken.get('api/venta');
            const ventasHoy = await clientToken.get('api/venta');
            dispatch({
                type: OBTENER_VENTAS,
                ventas: ventas.data.ventas
            });
            dispatch({
                type: OBTENER_VENTAS_HOY,
                ventas: ventasHoy.data.ventas
            });
            Swal.fire(
                'Venta cancelada correctamente.',
                'ChatMóvil.',
                'success'
            );
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR
            });
        }
    }
}

export const cancelarVentaCaja = (venta) => {
    return async (dispatch) => {
        try {
            await clientToken.post('api/venta/delete', venta);
            const ventas = await clientToken.get('api/venta');
            const ventasHoy = await clientToken.get('api/venta/hoy');
            const ventasCanceladas = await clientToken.get('api/venta/hoyEncabezado');
            dispatch({
                type: OBTENER_VENTAS_ENCABEZADO_HOY,
                ventas: ventasCanceladas.data.ventas
            });
            dispatch({
                type: OBTENER_VENTAS,
                ventas: ventas.data.ventas
            });
            dispatch({
                type: OBTENER_VENTAS_HOY,
                ventas: ventasHoy.data.ventas
            });
            Swal.fire(
                'Venta cancelada correctamente.',
                'ChatMóvil.',
                'success'
            );
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR
            });
        }
    }
}

/* AGREGAR PRODUCTO PARA VENDER */
export const agregarProductoCarrito = (producto) => {
    return async (dispatch, getState) => {
        try {
            // Generar la estructura del objeto producto.
            const state = getState();
            const productosCarrito = state.ventas.productosSeleccionados;
            let productoExistente = false;
            if((producto.name).includes("Kit") || (producto.name).includes("Accesorios") || (producto.name).includes("SIM")){
                producto = {
                    ...producto,
                    precioVenta: parseInt(producto.precioVenta),
                    stock: parseInt(producto.stock),
                    idProducto: producto.id,
                    precioFinal: parseInt(producto.precioVenta)
                }
            } else {
                producto = {
                    ...producto,
                    precioVenta: 0,
                    stock: parseInt(producto.stock),
                    idProducto: producto.id,
                    precioFinal: 0
                }
            }
            if(productosCarrito){
                
                for(let p of productosCarrito){
                    if(p.id===producto.id){
                        productoExistente=true;
                        break;
                    }
                }
            }
            if(productoExistente===true){
                Swal.fire(
                    'Producto ya existente.',
                    'ChatMóvil.',
                    'error'
                );   
            } else {
                const total = (producto.name).includes("Kit") || (producto.name).includes("Accesorios") || (producto.name).includes("SIM") ? producto.precioVenta : 0;
                dispatch({
                    type: AGREGAR_PRODUCTO_CARRITO,
                    producto: producto,
                    total
                });
            }
        } catch(error){
            console.log(error);
        }
    }
}

export const cambiarCantidadPrecio = (producto) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const listadoProductosSeleccionados = state.ventas.productosSeleccionados;
            var total = 0;
            listadoProductosSeleccionados.map((prod) => {
                if(prod.id===producto.id){
                    prod.precioFinal = parseInt(producto.cantidad);
                }
                total = total + prod.precioFinal;
                return prod;
            });
            dispatch({
                type: AGREGAR_PRODUCTOS_CARRITO,
                productos: listadoProductosSeleccionados,
                total
            })
        } catch(error){
            console.log(error);
        }
    }
}

export const cambiarCantidadEpin = (cantidad) => {
    return async (dispatch) => {
        dispatch({
            type: CAMBIO_TOTAL_VENTA,
            total: cantidad
        });
    }
}

export const eliminarProductoCarrito = (id) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const prods = state.ventas.productosSeleccionados;
            var total = 0;
            const nuevosProductosSeleccionados = prods.length > 1 ? [] : null;
            prods.forEach((p) => {
                if(p.id !== id){
                    total = total + p.precioFinal;
                    nuevosProductosSeleccionados.push(p);
                }
            });
            dispatch({
                type: AGREGAR_PRODUCTOS_CARRITO,
                productos: nuevosProductosSeleccionados,
                total
            });
        } catch(error) {
            console.log(error);
        }
    }
}

// GET REPORTE VENTAS
export const getReporteVentas = ({fechaInicio, fechaFin}) => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/venta/reporte', {params: {fechaInicio,fechaFin}});
            console.log(data);
            dispatch({
                type: OBTENER_REPORTE_VENTAS,
                ventas: data
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR
            });
        }
    }
}
// GET REPORTE GANANCIAS
export const getReporteVentasGanancias = ({fechaInicio, fechaFin}) => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/venta/ganancias', {params: {fechaInicio,fechaFin}});
            console.log("GANANCIAS",data);
            dispatch({
                type: OBTENER_VENTAS_GANANCIAS,
                ventas: data.results
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR
            });
        }
    }
}

// GET REPORTE VENTAS DEL DIA POR CATEGORÍA
export const getReporteVentasCategoriaHoy = () => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/venta/categoria');
            console.log(data);
            dispatch({
                type: OBTENER_REPORTE_VENTAS_CATEGORIA,
                ventas: data.results
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR
            });
        }
    }
}

export const deleteReporteVentas = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ELIMINAR_REPORTE_VENTAS
            })
        } catch(error){

        }
    }
}

/* OBTENER TODAS LAS VENTAS HOY */
export const getReporteEncabezadosHoy = () => {
    return async (dispatch) => {
        try {
            const ventas = await clientToken.get('api/venta/hoyEncabezado');
            dispatch({
                type: OBTENER_VENTAS_ENCABEZADO_HOY,
                ventas: ventas.data.ventas
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR
            });
        }
    }
}

export const getReporteEncabezados = ({fechaInicio, fechaFin}) => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/venta/reporteEncabezados', {params: {fechaInicio,fechaFin}});
            console.log(data);
            dispatch({
                type: OBTENER_VENTAS_ENCABEZADO_HOY,
                ventas: data.ventas
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR
            });
        }
    }
}
// export const agregarCantidadProducto = (id) => {
//     return async (dispatch, getState) => {
//         try {
//             const state = getState();
//             const productosCarrito = state.ventas.carrito;

//             const prods = productosCarrito.map((prod) => {
//                 if(prod.id === id){
//                     return {
//                         ...prod,
//                         cantidad: prod.cantidad+1,
//                         subtotal: (prod.cantidad+1) * prod.precio
//                     }
//                 } else {
//                     return prod
//                 }
//             });

//             const total = Object.values(prods).reduce((t, {subtotal}) => t+subtotal, 0);

//             dispatch({
//                 type: AGREGAR_PRODUCTO_CANTIDAD,
//                 carrito: prods,
//                 total
//             });
//         } catch(error) {
//             console.log(error);
//         }
//     }
// }

// export const restarCantidadProducto = (id) => {
//     return async (dispatch, getState) => {
//         try {
//             const state = getState();
//             const productosCarrito = state.ventas.carrito;
//             const prods = productosCarrito.map((prod) => {
//                 if(prod.id === id){
//                     return {
//                         ...prod,
//                         cantidad: (prod.cantidad-1 <= 0 ? 0 : prod.cantidad-1),
//                         subtotal: (prod.cantidad-1 <= 0 ? 0 : prod.cantidad-1) * prod.precio
//                     }
//                 } else {
//                     return prod
//                 }
//             });
//             const total = Object.values(prods).reduce((t, {subtotal}) => t+subtotal, 0);
//             dispatch({
//                 type: RESTAR_PRODUCTO_CANTIDAD,
//                 carrito: prods,
//                 total
//             });
//         } catch(error) {
//             console.log(error);
//         }
//     }
// }