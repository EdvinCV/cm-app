import React from 'react';

const ListadoStock = ({stocks}) => {
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
                    </li>
                ))
            }
        </ul>
    )
}

export default ListadoStock;