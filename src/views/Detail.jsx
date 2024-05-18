import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../redux/actions";

const DetailOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.orderDetail);

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  return (
    <div className="container mx-auto bg-white rounded-xl">
      <div className="m-5">
        <p>PEDIDO: {id}</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div>
          <div className="relative flex h-64 w-96 cursor-pointer flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md transition-opacity hover:opacity-90 m-5">
            <img className="h-full w-full object-cover object-center" src={orderDetail?.product_image} alt="name" />
          </div>
        </div>
        <div className="m-5">
          <div>
          <h5> DATOS DEL USUARIO </h5>
          <p>Nombre y apellido: {orderDetail?.name_claimant}</p>
          <p>Documento: {orderDetail?.cedula_claimant}</p>
          <p>Teléfono: {orderDetail?.cellphone_claimant}</p>
          </div>
          <div>
          <h5> DATOS DEL REMITENTE </h5>
          <p>Nombre remitente: {orderDetail?.name_transmiter}</p>
          <p>Teléfono remitente: {orderDetail?.celphone_transmiter}</p>
          <p>Ciudad de origen: {orderDetail?.city_transmiter}</p>
          <p>Dirección de origen: {orderDetail?.address_transmiter}</p>
          </div>
          </div>
          <div className="m-5">
          <div>
          <h5> DATOS DEL PAQUETE </h5>
          <p>Peso paquete: {orderDetail?.weight}</p>
          <p>Valor declarado: {orderDetail?.declared_value}</p>
          <p>Método de pago: {orderDetail?.pay_method}</p>
          </div>
            <div>
          <h5> DATOS DEL DESTINATARIO </h5>
          <p>Nombre destinatario: {orderDetail?.name_receiver}</p>
          <p>Teléfono destinatario: {orderDetail?.celphone_receiver}</p>
          <p>Ciudad de destino: {orderDetail?.city_receiver}</p>
          <p>Dirección de destino: {orderDetail?.address_receiver}</p>
          </div>

        </div>
      </div>
    </div>


  );
};

export default DetailOrder;
