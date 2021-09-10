import React from 'react';

const ReporteStock = ({data}) => {
    return (
        <>
        <table className="table table-hover table-secondary">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio Compra</th>
                    <th scope="col">Invertido</th>
                    <th scope="col">Fecha Compra</th>
                </tr>
            </thead>
            <tbody>
            {
                data.map((producto, index) => (
                    <tr
                        key={index}
                    >
                        <th scope="row">{index+1}</th>
                        <td>{producto.name}-{producto.color}</td>
                        <td>{producto.cantidadComprada}</td>
                        <td>{producto.precioCompra}</td>
                        <td>{producto.precioCompra * producto.cantidadComprada}</td>
                        <td>{new Date(producto.createdAt).toLocaleDateString()}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        </>
    )
}

export default ReporteStock;