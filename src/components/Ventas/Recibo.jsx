import React, {Component} from 'react';

class Recibo extends Component {

    render(){
        const data = this.props.infoRecibo ? this.props.infoRecibo : {};
        const prods = this.props.productos ? this.props.productos : [];
        return (
            // COMPROBANTE GENERAL
            <div
                style={{width:"8cm", padding:"0.3cm", fontFamily:"Arial"}}
            >
                {/* ENCABEZADO COMPROBANTE */}
                <div>
                    <center> <img src="icons/recibo.png" alt="ChatMovil" width="200px"/> </center>
                </div>
                <div>
                    <h5>Comprobante</h5>
                    <h6>No. {data.correlativo}</h6>
                </div>
                {/* INFO DEL COMPROBANTE */}
                <div>
                    <h6>FECHA: {new Date(data.createdAt).toLocaleDateString()}</h6>
                    <h6>NOMBRE: {data.nombreCliente}</h6>
                    <h6>NIT: {data.nit ? data.nit : 'CF'}</h6>
                    <h6>DIRECCIÓN: {data.direccion}</h6>
                </div>                
                {/* DESCRIPCION DEL ENCABEZADO */}
                <div
                    style={{display:"flex", justifyContent:"space-between"}}
                >
                    <div
                        style={{marginRight: "2px"}}
                    >
                        <p>
                            DESCRIPCIÓN:
                        </p>
                        {
                            prods.map((p) => (
                                <div
                                    key={p.id}
                                >
                                    <div style={{display:"flex", justifyContent:"space-between"}}>
                                        <h6>{p.Producto.name}-{p.Producto.color}-{p.Producto.Categorium.name} - </h6>
                                        <h6>Q.{p.precioFinal}</h6>
                                    </div>
                                    {/* AGREGAR TOTAL DE VENTA */}
                                    <div>
                                        {
                                            p.Producto.Categorium.name.includes("Kit") && 
                                            <>
                                                <h6>IMEI: {p.imei ? p.imei : '--------------------'}</h6>
                                                <h6>ICC: {p.icc ? p.icc : '--------------------'}</h6>
                                                <h6>No. {p.numero ? p.numero : '--------------------'}</h6>
                                                <h6>DPI: {data.dpi ? data.dpi : '--------------------'}</h6>
                                            </>
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {/* CONDICIONES DE GARANTÍA */}
                <div
                    style={{fontSize:"13px"}}
                >
                    <h6><b>GARANTÍA</b></h6>
                    <p>
                        <b>Dispositivos Tigo/Claro:</b>
                        Cuentan con 1 año de garantia por desperfectos de fábrica.
                    </p>
                    <p>
                        <b>Dispositivos Liberados:</b>
                        Cuentan con 6 meses de garantia por desperfectos de fábrica.
                    </p>
                    <h6><b>CONDICIONES DE GARANTÍA</b></h6>
                    <p>
                        1.El dispositivo no carga y/o dura poco tiempo con carga........................
				.............................
                        2.La pantalla no funciona...............................
                        3.El micrófono y bocina presentan problemas.
                        4.La cámara presenta inconvenientes.
                    </p>
                    <p>
                        <b>Accesorios:</b>
                        No cuentan con ningun tipo de garantia
                        todos los accesorios se entregan probados.
                    </p>
                    <p>
                        EL TIEMPO ESTIMADO DE ENTREGA PARA CUBRIR GARANTIA (Tigo, Claro, Liberado) ES DE 15 DIAS HABILES.
                    </p>
                    <p>
                        El cliente acepta las condiciones de garantía descritas en este documento.
                    </p>
                <p>
                        Los dispositivos pierden garantia si presentan rastros de humedad o golpes</p>
                </div>
                <p><b>GRACIAS POR SU COMPRA</b></p>
                <div
                    style={{height:"4cm", marginTop:"2 cm"}}
                >
                    <p>-------------------------------------</p>
                </div>
            </div>
        );
    }
}


export default Recibo;