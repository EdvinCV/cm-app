import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {obtenerListadoVentasHoy, obtenerVentas, obtenerVentasUsuarios} from '../Redux/actions/ventasActions';
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
    const [showForm, setShowForm] = useState(false);
    const componentRef = useRef();

    // Obtener ventas
    useEffect(() => {
        // dispatch(obtenerVentas());
    }, [dispatch])

    const ventas = useSelector((state) => state.ventas.ventas);
    const reporteVentasUsuarios = useSelector((state) => state.ventas.reporteVentasUsuarios);
    const ventaSeleccionada = useSelector((state) => state.ventas.ventaSeleccionada);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleInputChange = (e) => {
        setFormFechas({...formFechas,[e.target.name] : e.target.value});
    }

    const handleInputChangeReporte = (e) => {
        setFormFechasReporte({...formFechasReporte,[e.target.name] : e.target.value});
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

    return (
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="home" title="Reporte Ventas">
            <div className="contenedor-ventas">
            <h1>Listado de Ventas</h1>
            <div
                style={{display: "flex", justifyContent:"space-around"}}
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
                    className="btn btn-primary"
                    onClick={handleObtenerVentas}
                >
                    Buscar Ventas
                </button>
                <button
                    className="btn btn-primary"
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
                                        infoRecibo={ventaSeleccionada}
                                    />
                                </div>
                                <Row>
                                    <Col xs={12} md={7}>
                                    <p><b>Correlativo: </b>{ventaSeleccionada.correlativo}</p>
                                    </Col>
                                    <Col xs={6} md={5}>
                                    <p><b>Fecha: </b>{new Date(ventaSeleccionada.createdAt).toLocaleDateString()}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={8}>
                                    <p><b>Cliente: </b> {ventaSeleccionada.nombreCliente}</p>
                                    </Col>
                                    <Col xs={6} md={4}>
                                    <p><b>DPI: </b> {ventaSeleccionada.dpi ? ventaSeleccionada.dpi : "---"}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={8}>
                                    <p><b>Dirección</b> {ventaSeleccionada.direccion ? ventaSeleccionada.direccion : " ---"}</p>
                                    </Col>
                                    <Col xs={6} md={4}>
                                    <p><b>Teléfono:</b> {ventaSeleccionada.numero ? ventaSeleccionada.numero : " ---"}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <h5>Información de producto</h5>
                                    <Col xs={6} md={4}>
                                    <p>{ventaSeleccionada.Producto.Categorium.name}</p>
                                    </Col>
                                    <Col xs={6} md={4}>
                                    <p>{ventaSeleccionada.Producto.name} - {ventaSeleccionada.Producto.color}</p>
                                    </Col>
                                    <Col xs={6} md={4}>
                                    <p>Q.{ventaSeleccionada.Producto.precioVenta}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6} md={6}>
                                    <p>IMEI:{ventaSeleccionada.imei}</p>
                                    </Col>
                                    <Col xs={6} md={6}>
                                    <p>ICC: {ventaSeleccionada.icc}</p>
                                    </Col>
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
                    style={{display: "flex", justifyContent:"space-around"}}
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
                        className="btn btn-primary"
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
        </Tabs>
    )
}

export default ControlVentas;