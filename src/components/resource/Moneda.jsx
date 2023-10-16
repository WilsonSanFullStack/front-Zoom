import React from "react";
import Fecha from "./Fecha.jsx";
import { Link } from "react-router-dom";

import { TiCogOutline } from "react-icons/ti";

const Moneda = ({ quincena }) => {
  const monedas = quincena && quincena?.monedas[0];

  return (
    <div className="flex-col text-center font-bold bg-indigo-300 rounded-2xl mx-20 my-5">
        <section className="flex justify-end m-1 p-1">
          <Link to="/editar">
            <div className="flex items-center justify-center">
              <TiCogOutline className=" text-5xl btn-n" />
            </div>
          </Link>
        </section>
      <div className="-mt-16 m-2 p-2"><Fecha />
      <p>Quincena Actual: {quincena && quincena?.nombre}</p></div>

      <div className="flex grid-cols-2 mx-8 justify-center m-2 p-2">
        <div className=" text-center">
          <p className=" text-red-500 text-2xl">
            {monedas && monedas?.descripcion.toUpperCase()}{" "}
          </p>
          <section className="grid grid-cols-3 px-2">
            <p className="mx-4">Dolar: {monedas && monedas?.dolar} </p>
            <p className="mx-4">Euro: {monedas && monedas?.euro} </p>
            <p className="mx-4">Libra: {monedas && monedas?.libra} </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Moneda;
