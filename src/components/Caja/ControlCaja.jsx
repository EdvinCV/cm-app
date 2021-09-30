import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerCaja, abrirCaja, cerrarCaja } from '../Redux/actions/cajaActions';
import {useHistory} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Swal from 'sweetalert2';
import {Tab, Tabs} from 'react-bootstrap';
import { getReporteEncabezadosHoy, getReporteVentasCategoriaHoy, obtenerVentasHoy } from '../Redux/actions/ventasActions';
import VentasTable from '../Ventas/VentasTable';
import {Col, Container, Modal, Row} from 'react-bootstrap';
import {RiPrinterLine} from 'react-icons/ri';
import Recibo from '../Ventas/Recibo';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import VentasCaja from '../Ventas/VentasCaja';
import ReporteCategorias from '../Ventas/ReporteCategorias';
import VentasEncabezosTable from '../Ventas/VentasEncabezadosTable';

const ControlCaja = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const caja = useSelector((state) => state.caja.cajaActual);
    // Verificar si usuario logueado es admin
    const [admin, setAdmin] = useState(false);
    const ventasHoy = useSelector((state) => state.ventas.encabezadosHoy);
    const usuario = useSelector((state) => state.usuarios);
    const ventaSeleccionada = useSelector((state) => state.ventas.ventaSeleccionada);
    const reporteVentasCategoria = useSelector((state) => state.ventas.reporteVentasCategoria);
    const [valorCaja, setValorCaja] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [closeButtonLoader, setCloseButtonLoader] = useState(false);
    const componentRef = useRef();

    useEffect(() => {
        dispatch(obtenerCaja());
        dispatch(getReporteEncabezadosHoy());
        dispatch(getReporteVentasCategoriaHoy());
    }, [dispatch]);

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

    const handleInputChange = (e) => {
        setValorCaja(e.target.value);
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleAbrirCaja = () => {
        if(valorCaja === '' || valorCaja < 0){
            Swal.fire(
                'Debe ingresar una cantidad válida.',
                'ChatMóvil.',
                'error'
            );
        } else {
            dispatch(abrirCaja(valorCaja));
            setButtonLoader(true); 
            setCloseButtonLoader(false);
        }
    }
    
    const handleCerrarCaja = () => {
        setValorCaja(0);
        dispatch(cerrarCaja());
        setButtonLoader(false); 
        setCloseButtonLoader(true);
    }

    return ( 
        <div className="contenedor-ventas">
        <div
            style={{display: "flex", flexWrap: "wrap"}}
        >
            <h1>Control de Caja</h1>
            {
                admin &&
                <button
                    className="btn btn-primary ml-5"
                    onClick={() => {history.push('/cajas')}}
                >
                    Historial Caja
                </button>
            }
        </div>
        <hr/>
        {
            caja ? (
                caja.status === "CERRADO" ? (
                    <div>
                        <label htmlFor="valorCaja">CANTIDAD EFECTIVO ACTUAL</label>
                        <input
                            name="apertura"
                            className="form-control md-6"
                            type="number"
                            defaultValue={valorCaja}
                            onChange={handleInputChange}
                        />
                        <br/>
                        <br/>
                        <button
                            className={`btn btn-primary btn-block ${buttonLoader && 'disabled'}`}
                            onClick={handleAbrirCaja}
                        >
                            {
                                buttonLoader ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                    'ABRIR CAJA'
                                )
                            }
                        </button>
                        <div className="mt-5" style={{overflowX:"auto"}}>
                            {
                                ventasHoy &&
                                    <VentasCaja
                                        data={ventasHoy}
                                        setShowForm={setShowForm}
                                    />
                            }
                            {
                                reporteVentasCategoria &&
                                    <ReporteCategorias
                                        data={reporteVentasCategoria}
                                    />
                            }
                        </div>
                    </div>
                ) : (
                    <div
                        style={{color: "black"}}
                    >
                        <button
                            className={`btn btn-primary btn-block ${closeButtonLoader && 'disabled'}`}
                            onClick={handleCerrarCaja}
                        >
                            {
                                closeButtonLoader ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                    'CERRAR CAJA'
                                )
                            }
                        </button>
                        <br/>
                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="home" title="Movimiento del día">
                                <div className="card text-center">
                                    <div className="card-header">
                                        <h3>Información de caja</h3>
                                    </div>
                                    <div className="card-body">
                                        <h5>Actual Caja: Q.{caja.cantidadEfectivo}</h5>
                                        <h6>EFECTIVO: Q.{caja.cantidadEfectivoDia}</h6>
                                        <h6>TARJETA: Q.{caja.cantidadTarjeta}</h6>
                                        <br/>
                                        <h4>VENTAS HOY: Q.{parseInt(caja.cantidadEfectivoDia)+parseInt(caja.cantidadTarjeta)}</h4>
                                    </div>
                                    <div className="card-footer text-muted">
                                        ChatMóvil
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="profile" title="Listado Ventas">
                                <div style={{overflowX:"auto"}}>
                                    {
                                        ventasHoy &&
                                            <VentasEncabezosTable
                                                data={ventasHoy}
                                                setShowForm={setShowForm}
                                            />
                                    }
                                </div>
                            </Tab>
                        </Tabs>
                        
                    
                    </div>
                )
            ) : (
                <div
                    style={{display: "flex", justifyContent:"center", alignItems:"center"}}
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
        <br/>
        <Modal 
                aria-labelledby="contained-modal-title-vcenter"
                show={showForm}
                onHide={setShowForm}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Información de venta
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    {
                        ventaSeleccionada ? (
                            <Container>
                                <div
                                    style={{display:"none"}}
                                >
                                    <Recibo 
                                        ref={componentRef}
                                        infoRecibo={ventaSeleccionada}
                                    />
                                </div>
                                <Row>
                                    <Col xs={12} md={7}>
                                    <p><b>Correlativo: </b>{ventaSeleccionada.encabezado.correlativo}</p>
                                    </Col>
                                    <Col xs={6} md={5}>
                                    <p><b>Fecha: </b>{new Date(ventaSeleccionada.encabezado.createdAt).toLocaleDateString()}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={8}>
                                    <p><b>Cliente: </b> {ventaSeleccionada.encabezado.nombreCliente}</p>
                                    </Col>
                                    <Col xs={6} md={4}>
                                    <p><b>DPI: </b> {ventaSeleccionada.encabezado.dpi ? ventaSeleccionada.encabezado.dpi : "---"}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={8}>
                                    <p><b>Dirección</b> {ventaSeleccionada.encabezado.direccion ? ventaSeleccionada.encabezado.direccion : " ---"}</p>
                                    </Col>
                                    <Col xs={6} md={4}>
                                    <p><b>Teléfono:</b> {ventaSeleccionada.encabezado.numero ? ventaSeleccionada.encabezado.numero : " ---"}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <h5>Información de productos</h5>
                                    {
                                        ventaSeleccionada.productosVendidos.map((prod) => (
                                            <>
                                                <hr></hr>
                                                <Col xs={6} md={4}>
                                                <p>{prod.Producto.Categorium.name}</p>
                                                </Col>
                                                <Col xs={6} md={4}>
                                                <p>{prod.Producto.name} - {prod.Producto.color}</p>
                                                </Col>
                                                <Col xs={6} md={4}>
                                                <p>Q.{prod.Producto.precioVenta}</p>
                                                </Col>
                                                <Row>
                                                    <Col xs={6} md={6}>
                                                    <p>IMEI:{prod.imei ? prod.imei : '-----'}</p>
                                                    </Col>
                                                    <Col xs={6} md={6}>
                                                    <p>ICC: {prod.icc ? prod.icc : '-----'}</p>
                                                    </Col>
                                                </Row>
                                            </>
                                        ))
                                    }
                                </Row>
                                <Row>
                                    <Col xs={12} md={12}>
                                        <button
                                            className="btn btn-secondary btn-block"
                                            onClick={handlePrint}
                                        >
                                            <RiPrinterLine 
                                                size="20px"
                                            />
                                            RECIBO
                                        </button>
                                    </Col>
                                </Row>
                            </Container>
                        ) : (
                            <div
                                style={{display:"flex", justifyContent:"center"}}
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
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-primary btn-block"
                        onClick={() => {setShowForm(false)}}
                    >
                        Cerrar
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ControlCaja;