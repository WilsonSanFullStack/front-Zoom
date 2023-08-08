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
    <div className="min-h-screen bg-fuchsia-400 top-0">
      <div className="pt-14 text-center">
      <h2 className="p-2 text-center font-bold text-2xl">Seleccione una de las opciones</h2>
      <div className="">
        <button onClick={() => handleSeleccion("cargar")} className="btn-w">Cargar</button>
      </div>
      <div className="">
        <button onClick={() => handleSeleccion("ver")} className="btn-w">Ver</button>
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
