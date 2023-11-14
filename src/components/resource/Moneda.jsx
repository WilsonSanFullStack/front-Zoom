import React from "react";
import Fecha from "./Fecha.jsx";
import { Link } from "react-router-dom";

import { TiCogOutline } from "react-icons/ti";

const Moneda = ( {quincena} ) => {
  const monedas = quincena && quincena?.monedas;

// Obtener la moneda para estadísticas
const monedaEstadisticas = monedas?.find((x) => x.descripcion === "estadisticas");
// Obtener la moneda para pago
const monedaPago = monedas?.find((x) => x.descripcion === "pago");
// Utilizar la moneda para pago si existe, de lo contrario, utilizar la moneda para estadísticas
const monedaSeleccionada = monedaPago || monedaEstadisticas;
  return (
    <div className="flex-col text-center font-bold bg-indigo-300 rounded-2xl mx-20 my-5">
      <section className="flex justify-end m-1 p-1">
        <Link to="/editar">
          <div className="flex items-center justify-center">
            <TiCogOutline className=" text-5xl btn-n" />
          </div>
        </Link>
      </section>
      <div className="-mt-16 m-2 p-2">
        <Fecha />
        <p>Quincena Actual: {quincena && quincena?.nombre}</p>
      </div>

      <div className="flex grid-cols-2 mx-8 justify-center">
        <div className=" text-center">
          <p className="text-4xl ">
            {monedaSeleccionada && monedaSeleccionada?.descripcion.toUpperCase()}{" "}
          </p>
          <section className="grid grid-cols-3 px-2 border-2 border-indigo-900 text-4xl text-black">
            <section className="mx-2 px-2 grid grid-cols-1  border-r-2 border-indigo-900 text-center">
              <h1>DOLAR: </h1>
              <h1>
                $ {Intl.NumberFormat("es-CP").format(monedaSeleccionada && monedaSeleccionada?.dolar)}
              </h1>
            </section>
            <section className="mx-2 px-2 grid grid-cols-1  border-r-2 border-indigo-900 text-center">
              <h1>EUROS: </h1>
              <h1>
                $ {Intl.NumberFormat("es-CP").format(monedaSeleccionada && monedaSeleccionada?.euro)}
              </h1>
            </section>
            <section className="mx-2 px-2 grid grid-cols-1 text-center">
              <h1>LIBRA: </h1>
              <h1>
                $ {Intl.NumberFormat("es-CP").format(monedaSeleccionada && monedaSeleccionada?.libra)}
              </h1>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Moneda;
