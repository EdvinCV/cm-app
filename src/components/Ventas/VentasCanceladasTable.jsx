import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {FaRegEye} from 'react-icons/fa';
import {seleccionarVentaCancelada} from '../Redux/actions/ventasActions';

const VentasCanceladasTable = ({data, setShowDetail}) => {
    // HOOKS
    const dispatch = useDispatch();
    // STATE
    const [actualPage, setActualPage] = useState(1);
    let totalPages = Math.ceil(1/10);


    useEffect(() => {
        
    }, [actualPage])

    const paginacion = () => {
        let pags = [];
        for(let i=1; i <= totalPages; i++){
            if(i===actualPage){
                pags.push(<li key={i} className="page-item active"><a className="page-link" href="/#">{i}</a></li>);
            } else {
                pags.push(<li key={i} className="page-item"><a className="page-link" href="/#">{i}</a></li>);
            }
        }
        return pags;
    }

    const nextPage = () => {
        if((actualPage+1) <= totalPages){
            setActualPage(actualPage+1);
        }
    }

    const previousPage = () => {
        if((actualPage-1) > 0){
            setActualPage(actualPage-1);
        }
    }

    const handleSelectVenta = (venta) => {
        setShowDetail(true);
        dispatch(seleccionarVentaCancelada(venta));
    }

    return (
        <>
        <table className="table table-hover table-secondary">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Correlativo</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Total</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Fecha de Venta</th>
                    <th scope="col">Detalles</th>
                </tr>
            </thead>
            <tbody>
            {
                data.map((venta, index) => (
                    <tr
                        key={venta.id}
                    >
                    <th scope="row">{index+1}</th>
                    <td>{venta.correlativo}</td>
                    <td>{venta.Producto.name} - {venta.Producto.color}</td>
                    <td>Q.{venta.total}</td>
                    <td>{venta.nombreCliente}</td>
                    <td>{new Date(venta.createdAt).toLocaleDateString()}</td>
                    <td style={{display: "flex", justifyContent: "center"}}>
                        <div style={{marginLeft: "2px"}}>
                            <button className="btn btn-warning" onClick={() => {handleSelectVenta(venta)}}>
                                Ver
                                <FaRegEye
                                size="20px"
                                />
                            </button>
                        </div>
                    </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        <div
            style={{display:"flex", justifyContent:"center", overflowX:"auto"}}
        >
            <ul className="pagination pagination-sm">
                <li 
                    className="page-item"
                    onClick={previousPage}  
                >
                    <a className="page-link" href="/#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {
                    paginacion()
                }
                <li 
                    className="page-item"
                    onClick={nextPage}
                >
                    <a className="page-link" href="/#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </div>
        </>
    )
}

export default VentasCanceladasTable;