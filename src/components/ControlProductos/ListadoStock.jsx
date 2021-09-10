import React from 'react';
import {TiDeleteOutline} from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { deleteStock } from '../Redux/actions/productosActions';

const ListadoStock = ({stocks,setShowListadoStock}) => {

    const dispatch = useDispatch();

    const handleDeleteStock = (id) => {
        dispatch(deleteStock(id));
        setShowListadoStock(false);
    }

    return (
        stocks && stocks.length > 0 &&
        <ul className="list-group">
            {
                stocks.map((stock) => (
                    <li 
                        key={stock.id} 
                        className="list-group-item list-group-item-action"
                    >
                        Precio Compra: Q.{stock.precioCompra} --
                        Cantidad Comprada: {stock.cantidadComprada} --
                        Cantidad Restante: {stock.cantidadRestante}
                        <button
                            className="btn btn-danger m-2"
                            onClick={() => handleDeleteStock(stock.id)}
                        >
                            Eliminar
                            <TiDeleteOutline
                                size="20px"
                            />
                        </button>
                    </li>
                ))
            }
        </ul>
    )
}

export default ListadoStock;