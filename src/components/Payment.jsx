import React from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { useState } from "react";

const products = [
  {
    id: 1,
    type_shipments: "Puerta a Puerta",
    measure: "Pequeño",
    city_receiver: "Córdoba",
    city_transmiter: "Santa Fe",
    price: 2500,
    quantity: 1,
  },
  {
    id: 2,
    type_shipments: "Puerta a Sucursal",
    measure: "Mediano",
    city_receiver: "Buenos Aires",
    city_transmiter: "Corrientes",
    price: 5000,
    quantity: 1,
  },
  {
    id: 3,
    type_shipments: "Sucursal a Puerta",
    measure: "Grande",
    city_receiver: "Córdoba",
    city_transmiter: "Entre Ríos",
    price: 7500,
    quantity: 1,
  },
];

const Payment = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const location = useLocation();
  const { orderData } = location.state;

  initMercadoPago("APP_USR-8441c4d2-2057-46ca-8e1b-9a3328ed76bb", {
    locale: "es-AR",
  });

  const handlePay = async (id, title, quantity, unit_price) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/payments/`,
        {
          id: orderData.typeShipmentId,
          title:
            orderData.typeShipmentId === 1
              ? "Sucursal a puerta"
              : orderData.typeShipmentId === 2
              ? "Sucursal a sucursal"
              : orderData.typeShipmentId === 3
              ? "Puerta a sucursal"
              : orderData.typeShipmentId === 4
              ? "Puerta a Puerta"
              : null,
          quantity: 1,
          unit_price: orderData.cost,
          payer: {
            name: orderData.name_transmiter,
            surname: orderData.surname_transmiter,
            email: orderData.email,
            phone: {
              area_code: "54",
              number: orderData.celphone_transmiter,
            },
            address: {
              street_name: orderData.address_transmiter,
            },
            identification: {
              type: "DNI",
              number: orderData.cedula_claimant,
            },
          },
          pay_method: orderData.pay_method,
          shipments: {
            receiver_address: {
              street_name: orderData.address_receiver,
              city_name: orderData.city_receiver,
            },
          },
        }
      );
      const iDpreference = response.data.id;
      setPreferenceId(iDpreference);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">

      {orderData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div></div>
          <div className="mt-20 mb-5 bg-white rounded-xl shadow-lg p-4 transform hover:scale-105 transition-transform duration-300">

            <h1 className="font-bold text-lg">
              Tipo de envío: {elem.type_shipments}
            </h1>
            <h2 className="text-md">Tamaño: {elem.measure}</h2>
            <label className="block mt-2">Remitente:</label>
            <h4 className="text-sm">{elem.city_transmiter}</h4>
            <label className="block mt-2">Destinatario:</label>

            <h4 className="text-sm">{orderData.city_receiver}</h4>
            <label className="block mt-2">Peso:</label>
            <h4 className="text-sm">{orderData.weight}kg</h4>
            <label className="block mt-2">Declarado:</label>
            <h4 className="text-sm">{orderData.declared_value}$</h4>
            <label className="block mt-2">Método de pago:</label>
            <h4 className="text-sm">{orderData.pay_method}</h4>
            <img
              src={orderData.product_image}
              alt="Producto"
              className="mt-4"
            />
          </div>
          <div></div>
        </div>
      )}
      <div className="p-4">

        <button
          onClick={() => handlePay()}
          className="bg-s300 text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:text-gray-100 transition-colors"
        >
          Pagar
        </button>
      </div>
      
       
      
    </div>
  );
}


export default Payment;
