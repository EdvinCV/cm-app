import React from 'react';

const ReporteGanancias = ({data}) => {
    return (
        <>
        <table className="table table-hover table-secondary">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Color</th>
                    <th scope="col">Ganancia</th>
                </tr>
            </thead>
            <tbody>
            {
                data.map((venta, index) => (
                    <tr
                        key={venta.id}
                    >
                        <th scope="row">{index+1}</th>
                        <td>{venta.categoria}</td>
                        <td>{venta.producto}</td>
                        <td>{venta.color}</td>
                        <td>Q.{venta.ganancia}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        </>
    )
}

export default ReporteGanancias;