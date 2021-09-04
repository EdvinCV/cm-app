import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { obtenerVentasCanceladas } from '../Redux/actions/ventasActions';
import Loader from 'react-loader-spinner';
import {Col, Container, Modal, Row} from 'react-bootstrap';
import VentasCanceladasTable from './VentasCanceladasTable';

const ListadoVentasCanceladas = () => {
    const dispatch = useDispatch();
    const [ventasSeleccionadas, setVentasSeleccionadas] = useState([]);
    const [buscador, setBuscador] = useState("");
    const [showDetail, setShowDetail] = useState(false);

    // Obtener ventas
    useEffect(() => {
        dispatch(obtenerVentasCanceladas());
    }, [dispatch])

    const ventasCanceladas = useSelector((state) => state.ventas.ventasCanceladas);
    const ventaCanceladaSeleccionada = useSelector((state) => state.ventas.ventaCanceladaSeleccionada);

    useEffect(() => {
        setVentasSeleccionadas(ventasCanceladas);
    }, [ventasCanceladas, setVentasSeleccionadas])

    const handleChangeBuscador = (e) => {
        setBuscador(e.target.value);
    }

    useEffect(() => {
        if(buscador !== ""){
            const nuevasVentas = ventasCanceladas.filter(
                (venta) => 
                    (venta.Producto.name.search(buscador) !== -1) || (venta.tipoVenta.search(buscador) !== -1));
            setVentasSeleccionadas(nuevasVentas);
        } else {
            setVentasSeleccionadas(ventasCanceladas);
        }
    }, [buscador, ventasCanceladas])

    return (
        <div className="contenedor-ventas">
            <h1>Listado Ventas Canceladas</h1>
            <div
                style={{display: "flex", justifyContent: "space-between"}}
            >
                {/* <input
                        style={{maxWidth: "20%"}}
                        className="form-control md-4"
                        type="text"
                        value={buscador}
                        onChange={handleChangeBuscador}
                        placeholder="Buscar..."
                /> */}
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