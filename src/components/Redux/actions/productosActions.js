// Actions types
import {
    OBTENER_PRODUCTOS, OBTENER_PRODUCTOS_ERROR, CREAR_PRODUCTO, SELECTED_PRODUCT, EDITAR_PRODUCTO, OBTENER_TOTAL_PRODUCTOS, OBTENER_REPORTE_PRODUCTOS, OBTENER_LISTADO_STOCK, OBTENER_PRODUCTOS_VENTA, OBTENER_REPORTE_STOCK, ELIMINAR_STOCK, OBTENER_TOTAL_INVERTIDO
} from '../actionTypes';
// ACTIONS DE AUTENTICACION
import {clientToken} from '../../../config/axios';
import Swal from 'sweetalert2';

// Obtener total de productos registrados
export const obtenerTotalProductos = (buscador='') => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/producto/total', {params: {buscador}});
            dispatch({
                type: OBTENER_TOTAL_PRODUCTOS,
                totalProductos: data.total
            });
        } catch(error) {
            dispatch({
                type: OBTENER_PRODUCTOS_ERROR
            });
        }
    }
}

export const obtenerProductos = (page=1,buscador='') => {
    return async (dispatch) => {
        try {
            const productos = await clientToken.get('api/producto', {params: {page, buscador}});
            dispatch({
                type: OBTENER_PRODUCTOS,
                productos: productos.data.productos,
                productosNoDisponibles: productos.data.productosNoDisponibles
            });
        } catch(error) {
            dispatch({
                type: OBTENER_PRODUCTOS_ERROR
            });
        }
    }
}

export const obtenerProductosVenta = (page=1,buscador='') => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/venta/productos');
            dispatch({
                type: OBTENER_PRODUCTOS_VENTA,
                productosVenta: data.results
            });
        } catch(error) {
            dispatch({
                type: OBTENER_PRODUCTOS_ERROR
            });
        }
    }
}

export const obtenerListadoStock = (producto) => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/producto/stock', {params: {id: producto}});
            dispatch({
                type: OBTENER_LISTADO_STOCK,
                listado: data.listado
            });
        } catch(error) {
            dispatch({
                type: OBTENER_PRODUCTOS_ERROR
            });
        }
    }
}

export const crearProducto = (producto, buscador='') => {
    return async (dispatch) => {
        try {
            producto = {
                ...producto,
                precioCompra: parseInt(producto.precioCompra),
                precioVenta: parseInt(producto.precioVenta),
                stock: parseInt(producto.stock)
            }

            await clientToken.post('api/producto', producto);
            const productos = await clientToken.get('api/producto', {params: {page: 1, buscador}});
            Swal.fire(
                'Producto creado correctamente.',
                'ChatMóvil.',
                'success'
            );
            dispatch({
                type: CREAR_PRODUCTO,
                productos: productos.data.productos,
                productosNoDisponibles: productos.data.productosNoDisponibles
            });
        } catch(error){
            console.log(error);
        }
    }
}

export const crearProductoStock = (producto) => {
    return async (dispatch) => {
        try {
            console.log("DIS",producto);

            await clientToken.post('api/producto/stock', producto);
            const productos = await clientToken.get('api/producto', {params: {page: 1,buscador:''}});
            Swal.fire(
                'Stock agregado correctamente.',
                'ChatMóvil.',
                'success'
            );
            dispatch({
                type: CREAR_PRODUCTO,
                productos: productos.data.productos,
                productosNoDisponibles: productos.data.productosNoDisponibles
            });
        } catch(error){
            console.log(error);
        }
    }
}

export const editarProducto = (producto) => {
    return async (dispatch) => {
        try {
            producto = {
                ...producto,
                categoria: parseInt(producto.categoria),
                precioVenta: parseInt(producto.precioVenta),
                precioCompra: parseInt(producto.precioCompra),
                stock: parseInt(producto.stock)
            }
            const resp = await clientToken.put('api/producto', producto);
            if(resp.data.data === 1){
                const productos = await clientToken.get('api/producto', {params: {page: 1, buscador: ''}});
                dispatch({
                    type: EDITAR_PRODUCTO,
                    productos: productos.data.productos
                });
                Swal.fire(
                    'Producto editado correctamente.',
                    'ChatMóvil.',
                    'success'
                );
            } else {
                Swal.fire(
                    'Producto no existente.',
                    'ChatMóvil.',
                    'error'
                );
            }
        } catch(error){
            console.log(error);
        }
    }
}

export const deleteProducto = (id) => {
    return async (dispatch) => {
        try {
            const resp = await clientToken.put('api/producto/delete', {id: id});
            if(resp.data.data === 1){
                const productos = await clientToken.get('api/producto', {params: {page: 1, buscador: ''}});
                dispatch({
                    type: EDITAR_PRODUCTO,
                    productos: productos.data.productos
                });
                Swal.fire(
                    'Producto eliminado correctamente.',
                    'ChatMóvil.',
                    'success'
                );
            } else {
                Swal.fire(
                    'Producto no existente.',
                    'ChatMóvil.',
                    'error'
                );
            }
        } catch(error){
            console.log(error);
        }
    }
}

export const seleccionarProducto = (producto) => {
    return async(dispatch) => {
        try {
            dispatch({
                type: SELECTED_PRODUCT,
                producto
            });
        } catch(error){
            console.log(error);
        }
    }
}

/* REPORTES */
export const getReporteProductos = () => {
    return async(dispatch) => {
        try {
            const productos = await clientToken.get('api/producto/reporte');
            dispatch({
                type: OBTENER_REPORTE_PRODUCTOS,
                productos: productos.data.productos
            });
        } catch(error){
            console.log(error);
        }
    }
}

export const getReporteProductosStock = (formFechas) => {
    return async(dispatch) => {
        try {
            const {data} = await clientToken.get('api/producto/reporteStock', {params: {inicio: formFechas.fechaInicio, fin: formFechas.fechaFin}});
            dispatch({
                type: OBTENER_REPORTE_STOCK,
                productos: data.results
            });
        } catch(error){
            console.log(error);
        }
    }
}

export const deleteStock = (id) => {
    return async (dispatch) => {
        try {
            await clientToken.put('api/producto/stock', {id});
            Swal.fire(
                'Stock eliminado correctamente.',
                'ChatMóvil.',
                'success'
            );
            dispatch({
                type: ELIMINAR_STOCK,
            });
        } catch(error){
            console.log(error);
        }
    }
}

// Obtener listado de usuarios
export const obtenerTotalInvertido = () => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/venta/invertido');
            const totalInvertido = data.results[0].Invertido;
            if(isNaN(totalInvertido)){
                Swal.fire(
                    'Error al obtener total invertido.',
                    'ChatMóvil.',
                    'error'
                );
            }else {
                dispatch({
                    type: OBTENER_TOTAL_INVERTIDO,
                    totalInvertido: parseFloat(totalInvertido)
                });
            }
        } catch(error) {
            console.log(error);
        }
    }
}
