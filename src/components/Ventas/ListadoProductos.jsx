import React, { useEffect, useState, useRef } from 'react';
import {obtenerProductosVenta} from '../Redux/actions/productosActions';
import { useSelector, useDispatch } from 'react-redux';
import ProductoCard from './ProductoCard';
import CardItem from './CardItem';
import { obtenerCaja } from '../Redux/actions/cajaActions';
import VentaForm from './VentaForm';
import Loader from 'react-loader-spinner';
import { useReactToPrint } from 'react-to-print';
import Recibo from './Recibo';


const ListadoProductos = () => {
    // DISPATCH
    const dispatch = useDispatch();
    const componentRef = useRef();
    // STATE
    const [loading, setLoading] = useState(true);
    const [buscador, setBuscador] = useState("");
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    // STORE
    const productos = useSelector((state) => state.productos.productosVenta); 
    const productoSeleccionado = useSelector((state) => state.ventas.productoSeleccionado);
    const cajaAbierta = useSelector((state) => state.caja.cajaAbierta);
    const infoRecibo = useSelector((state) => state.ventas.recibo);

    // EFFECTS
    useEffect(() => {
        dispatch(obtenerProductosVenta());
        dispatch(obtenerCaja());
    }, [dispatch]);
    // Cuando cambia caja
    useEffect(() => {
        if(cajaAbierta === true){
            setLoading(false);
        }else if(cajaAbierta === false){
            setLoading(false);
        }
    }, [cajaAbierta])
    // Buscador de productos
    useEffect(() => {
        setProductosSeleccionados(productos);
    }, [productos])
    useEffect(() => {
        if(buscador !== ""){
            const nuevosProductos = productos.filter(
                (prod) => 
                    (prod.name.search(buscador) !== -1) ||  (prod.producto.search(buscador) !== -1));
            setProductosSeleccionados(nuevosProductos);

        } else {
            setProductosSeleccionados(productos);
        }
    }, [buscador, productos])

    // FUNCTIONS
    const handleChangeBuscador = (e) => {
        setBuscador(e.target.value);
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        if(infoRecibo){
            handlePrint();
        }
    }, [infoRecibo, handlePrint]);

    if(loading){
        return(
            <div
                style={{display:"flex", alignItems:"center", justifyContent:"center"}}
            >
                <Loader
                    type="ThreeDots"
                    color="#ff4b9a"
                    height={100}
                    width={100}
                />
            </div>
        )
    }
    else if(cajaAbierta){
    return (
        <div className="contenedorVentas">
            {
                infoRecibo &&
                    <div style={{display: "none"}}>
                        <Recibo 
                            ref={componentRef}
                            infoRecibo={infoRecibo}
                        />
                    </div>
            }
            <div className="contenedorProductosVentas">
                <input
                    style={{maxWidth: "20%"}}
                    className="form-control md-4"
                    type="text"
                    value={buscador}
                    onChange={handleChangeBuscador}
                    placeholder="Buscar..."
                />
                <div className="productosCategoria">
                {
                        productosSeleccionados.map((prod) => (
                            <ProductoCard
                                key={prod.id}
                                {...prod}
                            />
                        ))
                }
                </div>
            </div>
            <div className="contenedorFormVenta">
                <h5>Información Venta</h5>
                <hr/>
                {
                    productoSeleccionado ? (
                        <>
                        <CardItem 
                            producto={productoSeleccionado}
                        />
                        <hr/>
                        <VentaForm />
                        <div
                            style={{display:"none"}}
                        >
                        </div>
                        </>
                    ) : (
                        <h4>No ha seleccionado ningún elemento.</h4>
                    )
                }
            </div>
        </div>
    );
    }else {
        return (
            <div className="divCaja">
                <h1>DEBE ABRIR CAJA PARA CONTINUAR.</h1>
            </div>
        )
    }
}

export default ListadoProductos;