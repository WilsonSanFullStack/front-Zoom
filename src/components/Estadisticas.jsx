import React, { useState } from "react";

import CargarEstadisticas from "./CargarEstadisticas.jsx";
import VerEstadisticas from './VerEstadisticas.jsx'

const Estadisticas = () => {
  const [opcion, setOpcion] = useState({
    cargar: false,
    ver: false,
  });

  const handleSeleccion = (opcionSeleccionada) => {
    if (opcionSeleccionada === "cargar") {
      setOpcion({ cargar: true, ver: false });
    } else if (opcionSeleccionada === "ver") {
      setOpcion({ cargar: false, ver: true });
    }
  };

  return (
    <div className="bg-blue-300 min-h-screen top-0">
      <div className="pt-14">
      <h2 className="p-2 text-center font-bold text-2xl">Seleccione una de las opciones</h2>
      <div className="justify-center items-center  ">
        <h3>Cargar Estadisticas</h3>
        <button onClick={() => handleSeleccion("cargar")} className="btn-w">Seleccionar Cargar</button>
      </div>
      <div>
        <h3>Ver Estadisticas</h3>
        <button onClick={() => handleSeleccion("ver")} className="btn-w">Seleccionar Ver</button>
      </div>
      <div>
        {opcion.cargar && <CargarEstadisticas />}
        {opcion.ver && <VerEstadisticas />}
      </div>
      </div>
    </div>
  );
};

export default Estadisticas;
