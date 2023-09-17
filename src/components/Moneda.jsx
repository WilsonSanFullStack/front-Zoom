import React from 'react'

const Moneda = ({quincena}) => {

  return (
    <div className="flex-col text-center font-bold bg-indigo-300 rounded-2xl mx-20 my-5">
        <p>Quincena Actual: {quincena.nombre}</p>
        <p>Monedas</p>
        <div className="flex grid-cols-2 mx-8 justify-between">
          <div className="text-center">
            <p>Estadisticas</p>
            <section className="grid grid-cols-3">
              <p className="mx-4">Dolar: {quincena.monedas[0].edolar} </p>
              <p className="mx-4">Euro: {quincena.monedas[0].eeuro} </p>
              <p className="mx-4">Libra: {quincena.monedas[0].elibra} </p>
            </section>
          </div>
          <div className=" text-center">
            <p>Pago</p>
            <section className="grid grid-cols-3 px-2">
              <p className="mx-4">Dolar: {quincena.monedas[0].pdolar} </p>
              <p className="mx-4">Euro: {quincena.monedas[0].peuro} </p>
              <p className="mx-4">Libra: {quincena.monedas[0].plibra} </p>
            </section>
          </div>
        </div>
      </div>
  )
}

export default Moneda;
