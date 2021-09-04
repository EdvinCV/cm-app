import React from 'react';
import { useDispatch } from 'react-redux';
import {eliminarProductoCarrito, cambiarCantidadEpin} from '../Redux/actions/ventasActions';

const CardItem = ({producto}) => {
    
    const dispatch = useDispatch();

    // const handleAddCantidad = () => {
    //     dispatch(agregarCantidadProducto(producto.id));
    // }

    // const handleSubtractCantidad = () => {
    //     dispatch(restarCantidadProducto(producto.id));
    // }

    const handleDeleteProduct = () => {
        dispatch(eliminarProductoCarrito());
    }

    const handleTotal = (e) => {
        dispatch(cambiarCantidadEpin(e.target.value));
    }

    return(
        <div className="CardItem">
            <h5><b>{producto.name}</b></h5>
            <p>{producto.producto}</p>
            {
                (producto.name).includes("Epin") ? (
                    <input
                        className="form-control"
                        type="number"
                        placeholder="Ingrese cantidad"
                        onChange={handleTotal}
                    />
                ) : (
                    <>
                        <p>Color: {producto.color ? producto.color: "-"}</p>
                        <p>Precio: {producto.precioVenta ? producto.precioVenta : "-"}</p>
                    </>
                )
            }
            <br/>
            <div>
                <button
                    className="btn btn-danger"
                    onClick={handleDeleteProduct}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}

export default CardItem;