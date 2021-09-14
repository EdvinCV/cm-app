import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { obtenerVentasCanceladas } from '../Redux/actions/ventasActions';
import Loader from 'react-loader-spinner';
import {Col, Container, Modal, Row} from 'react-bootstrap';
import VentasCanceladasTable from './VentasCanceladasTable';
import Swal from 'sweetalert2';

const ListadoVentasCanceladas = () => {
    const dispatch = useDispatch();
    const [showDetail, setShowDetail] = useState(false);

    const ventasCanceladas = useSelector((state) => state.ventas.ventasCanceladas);
    const ventaCanceladaSeleccionada = useSelector((state) => state.ventas.ventaCanceladaSeleccionada);

    const [formFechasReporte, setFormFechasReporte] = useState({
        fechaInicio: null,
        fechaFin: null
    });

    const handleInputChangeReporte = (e) => {
        setFormFechasReporte({...formFechasReporte,[e.target.name] : e.target.value});
    }

    const handleObtenerVentasCanceladas = () => {
        const {fechaInicio, fechaFin} = formFechasReporte;
        if(!fechaInicio || !fechaFin){
            Swal.fire(
                'Debe seleccionar dos fechas.',
                'ChatMóvil.',
                'error'
            );
        } else {
            dispatch(obtenerVentasCanceladas(formFechasReporte));
        }
    }
    return (
        <div className="contenedor-ventas">
            <h1>Listado Ventas Canceladas</h1>
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
                        onClick={handleObtenerVentasCanceladas}
                    >
                        Buscar Ventas
                    </button>
                </div>
            <hr/>
            <div
                style={{overflowY: "scroll", maxHeight: "400px"}}
            >
                {
                    ventasCanceladas ? (
                        <VentasCanceladasTable
                            data={ventasCanceladas}
                            setShowDetail={setShowDetail}
                        />
                    ) : (
                        <p>Cargando...</p>
                    )
                }
            </div>

            <Modal 
                aria-labelledby="contained-modal-title-vcenter"
                show={showDetail}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Información de venta
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    {
                        ventaCanceladaSeleccionada ? (
                            <Container>
                                <Row>
                                    <Col xs={12} md={7}>
                                    <p><b>Correlativo: </b>{ventaCanceladaSeleccionada.correlativo}</p>
                                    </Col>
                                    <Col xs={6} md={5}>
                                    <p><b>Fecha: </b>{new Date(ventaCanceladaSeleccionada.createdAt).toLocaleDateString()}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={8}>
                                    <p><b>Cliente: </b> {ventaCanceladaSeleccionada.nombreCliente}</p>
                                    </Col>
                                    <Col xs={6} md={4}>
                                    <p><b>DPI: </b> {ventaCanceladaSeleccionada.dpi ? ventaCanceladaSeleccionada.dpi : "---"}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={8}>
                                    <p><b>Dirección</b> {ventaCanceladaSeleccionada.direccion ? ventaCanceladaSeleccionada.direccion : " ---"}</p>
                                    </Col>
                                    <Col xs={6} md={4}>
                                    <p><b>Teléfono:</b> {ventaCanceladaSeleccionada.numero ? ventaCanceladaSeleccionada.numero : " ---"}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <h5>Información de producto</h5>
                                    <Col xs={6} md={4}>
                                    <p>{ventaCanceladaSeleccionada.Producto.Categorium.name}</p>
                                    </Col>
                                    <Col xs={6} md={4}>
                                    <p>{ventaCanceladaSeleccionada.Producto.name} - {ventaCanceladaSeleccionada.Producto.color}</p>
                                    </Col>
                                    <Col xs={6} md={4}>
                                    <p>Q.{ventaCanceladaSeleccionada.Producto.precioVenta}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6} md={6}>
                                    <p>IMEI:{ventaCanceladaSeleccionada.imei}</p>
                                    </Col>
                                    <Col xs={6} md={6}>
                                    <p>ICC: {ventaCanceladaSeleccionada.icc}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={12}>
                                        <p><b>RAZÓN:</b>{ventaCanceladaSeleccionada.razonCancelacion}</p>
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
                        onClick={() => {setShowDetail(false)}}
                    >
                        Cerrar
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ListadoVentasCanceladas;