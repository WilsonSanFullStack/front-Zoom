import React from "react";

const Moneda = ({ quincena }) => {
  const monedas = quincena && quincena?.monedas[0];

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div className="flex-col text-center font-bold bg-indigo-300 rounded-2xl mx-20 my-5">
      <section>
        <span>Fecha Hoy: 📆{formattedDate}</span>
      </section>
      <p>Quincena Actual: {quincena && quincena?.nombre}</p>
      <p>Monedas</p>
      <div className="flex grid-cols-2 mx-8 justify-between">
        <div className="text-center">
          <p>Estadisticas</p>
          <section className="grid grid-cols-3">
            <p className="mx-4">Dolar: {monedas && monedas?.edolar} </p>
            <p className="mx-4">Euro: {monedas && monedas?.eeuro} </p>
            <p className="mx-4">Libra: {monedas && monedas?.elibra} </p>
          </section>
        </div>
        <div className=" text-center">
          <p>Pago</p>
          <section className="grid grid-cols-3 px-2">
            <p className="mx-4">Dolar: {monedas && monedas?.pdolar} </p>
            <p className="mx-4">Euro: {monedas && monedas?.peuro} </p>
            <p className="mx-4">Libra: {monedas && monedas?.plibra} </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Moneda;
