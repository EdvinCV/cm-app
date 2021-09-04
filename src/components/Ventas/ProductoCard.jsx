import React from 'react';
import { useDispatch } from 'react-redux';
import { agregarProductoCarrito } from '../Redux/actions/ventasActions';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const ProductoCard = ({id, name, producto, precioVenta, color, stock}) => {
    const dispatch = useDispatch();

    const productoSeleccionado = useSelector((state) => state.ventas.productoSeleccionado);

    const handleAddCarrito = () => {
        if(productoSeleccionado){
            Swal.fire(
                'Ya existe un elemento seleccionado.',
                'ChatMóvil.',
                'error'
            );
        }else {
            dispatch(agregarProductoCarrito({id,name,producto,precioVenta, color}))
        }
    }

    return (
        <div className="productCard">
            <h6><strong>{name}</strong></h6>
            <h6><strong>{producto}</strong></h6>
            {
                color ?
                <p>{color}</p> :
                <p>---</p>
            }
            <p>Stock: {stock}</p>
            {
                precioVenta ?
                <p>Q.{precioVenta}</p> :
                <p>---</p>
            }
            <button
                className="btn btn-primary btn-block mb-0"
                onClick={handleAddCarrito}
            >
                Agregar
            </button>
        </div>
    );
}

export default ProductoCard;