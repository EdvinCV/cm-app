// ACTION TYPES

import {
    AGREGAR_PRODUCTO_CARRITO, 
    CAMBIO_TOTAL_VENTA, 
    AGREGAR_PRODUCTO_CANTIDAD, 
    RESTAR_PRODUCTO_CANTIDAD, 
    ELIMINAR_PRODUCTO_CARRITO, 
    OBTENER_VENTAS, 
    VENTA_REALIZADA, 
    SELECCIONAR_VENTA, 
    OBTENER_VENTAS_CANCELADAS, 
    SELECCIONAR_VENTA_CANCELADA,
    OBTENER_REPORTE_VENTAS,
    ELIMINAR_REPORTE_VENTAS,
    OBTENER_VENTAS_HOY,
    OBTENER_VENTAS_USUARIOS,
    OBTENER_LISTADO_VENTAS_HOY,
    OBTENER_REPORTE_VENTAS_CATEGORIA,
    OBTENER_VENTAS_GANANCIAS
} from "../actionTypes";


// INITIAL STATE
const initialState = {
    productoSeleccionado: null,
    ventaSeleccionada: null,
    ventaCanceladaSeleccionada: null,
    tipoVenta: null,
    ventas: null,
    ventasHoy: null,
    ventasCanceladas: null,
    total: 0,
    errorResponse: false,
    informacionVenta: null,
    recibo: null,
    reporteVentas: null,
    reporteVentasUsuarios: null,
    reporteVentasCategoria: null,
    reporteGanancias: null
};

// REDUCER FUNCTION
const ventasReducer = (state = initialState, action) => {
    switch(action.type){
        case SELECCIONAR_VENTA:
            return {
                ...state,
                ventaSeleccionada: action.venta
            }
        case SELECCIONAR_VENTA_CANCELADA:
            return {
                ...state,
                ventaCanceladaSeleccionada: action.venta
            }
        case OBTENER_VENTAS:
            return {
                ...state,
                ventas: action.ventas
            }
        case OBTENER_LISTADO_VENTAS_HOY:
        return {
            ...state,
            ventas: action.ventas
        }
        case OBTENER_VENTAS_HOY:
            return {
                ...state,
                ventasHoy: action.ventas
            }
        case OBTENER_VENTAS_GANANCIAS:
            return {
                ...state,
                reporteGanancias: action.ventas
            }
        case OBTENER_VENTAS_USUARIOS:
            return {
                ...state,
                reporteVentasUsuarios: action.ventas
            }
        case OBTENER_REPORTE_VENTAS:
            return {
                ...state,
                reporteVentas: action.ventas
            }
        case OBTENER_REPORTE_VENTAS_CATEGORIA:
            return {
                ...state,
                reporteVentasCategoria: action.ventas
            }
        case OBTENER_VENTAS_CANCELADAS:
            return {
                ...state,
                ventasCanceladas: action.ventas
            }
        case AGREGAR_PRODUCTO_CARRITO:
            return {
                ...state,
                productoSeleccionado: action.producto,
                total: action.total
            }
        case AGREGAR_PRODUCTO_CANTIDAD:
            return {
                ...state,
                carrito: action.carrito,
            }
        case CAMBIO_TOTAL_VENTA:
            return {
                ...state,
                total: action.total
            }
        case RESTAR_PRODUCTO_CANTIDAD:
            return {
                ...state,
                carrito: action.carrito,
                total: action.total
            }
        case ELIMINAR_PRODUCTO_CARRITO:
            return {
                ...state,
                productoSeleccionado: null,
                total: 0,
                informacionVenta: null
            }
        case ELIMINAR_REPORTE_VENTAS:
            return {
                ...state,
                reporteVentas: null
            }
        case VENTA_REALIZADA:
            return {
                ...state,
                productoSeleccionado: null,
                total: 0,
                tipoVenta: null,
                informacionVenta: null,
                recibo: action.recibo
            }
        case "ELIMINAR_RECIBO":
            return {
                ...state,
                recibo: null
            }
        default:
            return state;
    }
}

export default ventasReducer;