import React, {useEffect} from 'react';
import {FaEdit} from 'react-icons/fa';
import {AiFillDelete} from 'react-icons/ai';
import {BsListCheck} from 'react-icons/bs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { obtenerProductos } from '../Redux/actions/productosActions';

const ProductsTable = ({data, handleSelectProducto, handleDelete, usuario, totalProductos, handleListStock}) => {
    // HOOKS
    const dispatch = useDispatch();
    // STATE
    const [admin, setAdmin] = useState(false);
    const [actualPage, setActualPage] = useState(1);
    let totalPages = Math.ceil(totalProductos/10);
    
    useEffect(() => {
      if(usuario){
        if(usuario.me){
          if(usuario.me.rol === "ADMIN"){
            setAdmin(true);
          } else if(usuario.me.rol === "VENTAS"){
            setAdmin(false);
          }
        }
      }
    }, [usuario])

    useEffect(() => {
      dispatch(obtenerProductos(actualPage));
    }, [actualPage, dispatch])

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



    return (
      <>
      <table className="table table-hover table-secondary table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Categoria</th>
            {
              admin ? (
                  <>
                  <th scope="col">Precio Venta</th>
                  </>      
                ) : (
                  <th scope="col">Precio</th>
                )
            }
            {
              admin &&
                <>
                <th scope="col">Stock</th>
                <th scope="col">Editar</th>
                <th scope="col">Eliminar</th>
                </>
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map((producto, index) => (
              <tr
                key={producto.id}
              >
              <th scope="row">{index+1}</th>
              <td>{producto.name}</td>
              <td>{producto.Categorium.name}</td>
              {
                admin ? (
                  <>
                  <td>{producto.precioVenta ? producto.precioVenta : "---"}</td>
                  </>
                ) : (
                  <td>{producto.precioVenta ? producto.precioVenta : "---"}</td>
                )
              }
              {
                admin &&
                  <>
                  <td>
                    <div style={{marginLeft: "20px"}}>
                      <button className="btn btn-secondary" onClick={() => {handleListStock(producto.id)}}>
                        Stock
                        <BsListCheck 
                          size="20px"
                        />
                      </button>
                    </div>
                  </td>
                  <td style={{display: "flex", justifyContent: "center"}}>
                    <div style={{marginLeft: "2px"}}>
                      <button className="btn btn-warning" onClick={() => {handleSelectProducto(producto)}}>
                        Editar
                        <FaEdit 
                          size="20px"
                        />
                      </button>
                    </div>
                  </td>
                  <td>
                    <div style={{marginLeft: "20px"}}>
                      <button className="btn btn-danger" onClick={() => {handleDelete(producto.id)}}>
                        Eliminar
                        <AiFillDelete 
                          size="20px"
                        />
                      </button>
                    </div>
                  </td>
                  </>
              }
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

export default ProductsTable;