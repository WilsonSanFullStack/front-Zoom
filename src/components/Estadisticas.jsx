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
    <div>
      <h2>Seleccione una de las opciones</h2>
      <div>
        <h3>Cargar Estadisticas</h3>
        <button onClick={() => handleSeleccion("cargar")}>Seleccionar Cargar</button>
      </div>
      <div>
        <h3>Ver Estadisticas</h3>
        <button onClick={() => handleSeleccion("ver")}>Seleccionar Ver</button>
      </div>
      <div>
        {opcion.cargar && <CargarEstadisticas />}
        {opcion.ver && <VerEstadisticas />}
      </div>
    </div>
  );
};

export default Estadisticas;
