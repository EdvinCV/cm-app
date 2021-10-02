import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getReporteEncabezados, getReporteEncabezadosHoy, getReporteVentasGanancias, obtenerListadoVentasHoy, obtenerVentas, obtenerVentasUsuarios} from '../Redux/actions/ventasActions';
import VentasTable from './VentasTable';
import Swal from 'sweetalert2';
import Loader from 'react-loader-spinner';
import {Col, Container, Modal, Row, Tabs} from 'react-bootstrap';
import {RiPrinterLine} from 'react-icons/ri';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import Recibo from './Recibo';
import { Tab } from 'bootstrap';
import ReporteUsuarios from './ReporteUsuarios';
import ReporteGanancias from './ReporteGanancias';
import { obtenerUsuario } from '../Redux/actions/usersActions';
import { Redirect } from 'react-router-dom';
import VentasEncabezosTable from './VentasEncabezadosTable';

const ControlVentas = () => {
    const dispatch = useDispatch();
    const [formFechas, setFormFechas] = useState({
        fechaInicio: null,
        fechaFin: null
    });
    const [formFechasReporte, setFormFechasReporte] = useState({
        fechaInicio: null,
        fechaFin: null
    });
    const [formFechasGanancia, setFormFechasGanancia] = useState({
        fechaInicio: null,
        fechaFin: null
    });
    const [formFechasEncabezado, setFormFechasEncabezado] = useState({
        fechaInicio: null,
        fechaFin: null
    });
    const [showForm, setShowForm] = useState(false);
    const componentRef = useRef();

    // Obtener ventas
    useEffect(() => {
        dispatch(obtenerUsuario());
    }, [dispatch])

    const usuarioVerificacion = useSelector((state) => state.usuarios);

    const ventas = useSelector((state) => state.ventas.ventas);
    const reporteVentasUsuarios = useSelector((state) => state.ventas.reporteVentasUsuarios);
    const reporteGanancias = useSelector((state) => state.ventas.reporteGanancias);
    const ventaSeleccionada = useSelector((state) => state.ventas.ventaSeleccionada);
    const reporteEncabezados = useSelector((state) => state.ventas.encabezadosHoy);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleInputChange = (e) => {
        setFormFechas({...formFechas,[e.target.name] : e.target.value});
    }

    const handleInputChangeReporte = (e) => {
        setFormFechasReporte({...formFechasReporte,[e.target.name] : e.target.value});
    }

    const handleInputChangeGanancia = (e) => {
        setFormFechasGanancia({...formFechasGanancia,[e.target.name] : e.target.value});
    }

    const handleInputChangeEncabezado = (e) => {
        setFormFechasEncabezado({...formFechasEncabezado,[e.target.name] : e.target.value});
    }

    const handleObtenerVentas = () => {
        const {fechaInicio, fechaFin} = formFechas;
        if(!fechaInicio || !fechaFin){
            Swal.fire(
                'Debe seleccionar dos fechas.',
                'ChatMóvil.',
                'error'
            );
        } else {
            dispatch(obtenerVentas(formFechas));
        }
    }

    const handleObtenerVentasHoy = () => {
        dispatch(obtenerListadoVentasHoy());
    }

    const handleObtenerVentasUsuarios = () => {
        const {fechaInicio, fechaFin} = formFechasReporte;
        if(!fechaInicio || !fechaFin){
            Swal.fire(
                'Debe seleccionar dos fechas.',
                'ChatMóvil.',
                'error'
            );
        } else {
            dispatch(obtenerVentasUsuarios(formFechasReporte));
        }
    }

    const handleObtenerVentasGanancias = () => {
        const {fechaInicio, fechaFin} = formFechasGanancia;
        if(!fechaInicio || !fechaFin){
            Swal.fire(
                'Debe seleccionar dos fechas.',
                'ChatMóvil.',
                'error'
            );
        } else {
            dispatch(getReporteVentasGanancias(formFechasGanancia));
        }
    }

    const handleObtenerEncabezados = () => {
        const {fechaInicio, fechaFin} = formFechasEncabezado;
        if(!fechaInicio || !fechaFin){
            Swal.fire(
                'Debe seleccionar dos fechas.',
                'ChatMóvil.',
                'error'
            );
        } else {
            dispatch(getReporteEncabezados(formFechasEncabezado));
        }
    }

    const handleObtenerEncabezadosHoy = () => {
        dispatch(getReporteEncabezadosHoy());
    }

    const handleObtenerVentaRecibo = () => {
        
    }

    if(usuarioVerificacion){
        if(usuarioVerificacion.me){
            console.log("USUARIO VER",usuarioVerificacion.me.rol);
            if(usuarioVerificacion.me.rol !== "ADMIN"){
                return (
                    <Redirect to="/home" />
                )
            }
        }
    }
    return (
        <div className="contenedor-ventasGeneral">
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="home" title="Reporte Ventas">
            <div className="contenedor-ventas">
            <h1>Listado de Ventas</h1>
            <div
                style={{display: "flex", justifyContent:"space-around", flexWrap:"wrap"}}
            >
                <div>
                    <label htmlFor="">Fecha Inicio</label>
                    <input
                            name="fechaInicio"
                            className="form-control md-4"
                            type="date"
                            value={formFechas.formInicio}
                            onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="">Fecha Fin</label>
                    <input
                            name="fechaFin"
                            className="form-control md-4"
                            type="date"
                            value={formFechas.formFin}
                            onChange={handleInputChange}
                    />
                </div>
                <button
                    className="btn btn-primary mt-2"
                    onClick={handleObtenerVentas}
                >
                    Buscar Ventas
                </button>
                <button
                    className="btn btn-primary mt-2"
                    onClick={handleObtenerVentasHoy}
                >
                    Ventas Hoy
                </button>
            </div>
            <hr/>
            <div
                style={{overflowY: "scroll", maxHeight: "400px"}}
            >
                {
                    ventas ? (
                        <VentasTable
                            data={ventas}
                            setShowForm={setShowForm}
                        />
                    ) : (
                        <p>...</p>
                    )
                }
            </div>
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
                                        infoRecibo={ventaSeleccionada.encabezado}
                                        productos={ventaSeleccionada.productosVendidos}
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
                                                <p>Q.{prod.precioFinal}</p>
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
            </Tab>
            <Tab eventKey="profile" title="Reporte Usuario">
            <div className="contenedor-ventas">
                <h1>Reporte de Usuario</h1>
                <div
                    style={{display: "flex", justifyContent:"space-around", flexWrap:"wrap"}}
                >
                    <div>
                        <label htmlFor="">Fecha Inicio</label>
                        <input
                                name="fechaInicio"
                                className="form-control md-4"
                                type="date"
                                value={formFechasReporte.formInicio}
                                onChange={handleInputChangeReporte}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Fecha Fin</label>
                        <input
                                name="fechaFin"
                                className="form-control md-4"
                                type="date"
                                value={formFechasReporte.formFin}
                                onChange={handleInputChangeReporte}
                        />
                    </div>
                    <button
                        className="btn btn-primary mt-2"
                        onClick={handleObtenerVentasUsuarios}
                    >
                        Buscar Ventas
                    </button>
                </div>
                <hr />
                <div
                    style={{overflowY: "scroll", maxHeight: "400px"}}
                >
                {
                    reporteVentasUsuarios ? (
                        <ReporteUsuarios
                            data={reporteVentasUsuarios}
                        />
                    ) : (
                        <p>...</p>
                    )
                }
            </div>
            </div>
            </Tab>
            <Tab eventKey="ganancias" title="Reporte Ganancias">
            <div className="contenedor-ventas">
                <h1>Reporte de Ganancias</h1>
                <div
                    style={{display: "flex", justifyContent:"space-around", flexWrap:"wrap"}}
                >
                    <div>
                        <label htmlFor="">Fecha Inicio</label>
                        <input
                                name="fechaInicio"
                                className="form-control md-4"
                                type="date"
                                value={formFechasGanancia.formInicio}
                                onChange={handleInputChangeGanancia}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Fecha Fin</label>
                        <input
                                name="fechaFin"
                                className="form-control md-4"
                                type="date"
                                value={formFechasGanancia.formFin}
                                onChange={handleInputChangeGanancia}
                        />
                    </div>
                    <button
                        className="btn btn-primary mt-2"
                        onClick={handleObtenerVentasGanancias}
                    >
                        Generar Reporte
                    </button>
                </div>
                <hr />
                <div
                    style={{overflowY: "scroll", maxHeight: "400px"}}
                >
                {
                    reporteGanancias ? (
                        <ReporteGanancias
                            data={reporteGanancias}
                        />
                    ) : (
                        <p>...</p>
                    )
                }
            </div>
            </div>
            </Tab>
            <Tab eventKey="canceladas" title="Cancelar Venta">
            <div className="contenedor-ventas">
                <h1>Cancelación de Venta</h1>
                <div
                    style={{display: "flex", justifyContent:"space-around", flexWrap:"wrap"}}
                >
                    <div>
                        <label htmlFor="">Fecha Inicio</label>
                        <input
                                name="fechaInicio"
                                className="form-control md-4"
                                type="date"
                                value={formFechasEncabezado.fechaInicio}
                                onChange={handleInputChangeEncabezado}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Fecha Fin</label>
                        <input
                                name="fechaFin"
                                className="form-control md-4"
                                type="date"
                                value={formFechasEncabezado.fechaFin}
                                onChange={handleInputChangeEncabezado}
                        />
                    </div>
                    <button
                        className="btn btn-primary mt-2"
                        onClick={handleObtenerEncabezados}
                    >
                        Generar Reporte
                    </button>
                    <button
                        className="btn btn-primary mt-2"
                        onClick={handleObtenerEncabezadosHoy}
                    >
                        Ventas Hoy
                    </button>
                </div>
                <hr />
                <div
                    style={{overflowY: "scroll", maxHeight: "400px"}}
                >
                {
                    reporteEncabezados ? (
                        <VentasEncabezosTable
                            data={reporteEncabezados}
                            setShowForm={setShowForm}
                        />
                    ) : (
                        <p>...</p>
                    )
                }
            </div>
            </div>
            </Tab>
        </Tabs>
        </div>
    )
}

export default ControlVentas;