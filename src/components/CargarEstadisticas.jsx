import React from "react";
import { Link } from "react-router-dom";

const SeleccionarPagina = () => {
  return (
    <div>
      <h3>aqui se cargan las Estadisticas</h3>

        <>
      <Link to='/estadisticas/carga/adultregular'>
        <p>Corte</p>
        <img src="/AWLogo_on.png" alt="logo AdultWork" />
      </Link>
        </>
        <>
      <Link to='/estadisticas/carga/adultparcial'>
        <p>Parcial</p>
        <img src="/AWLogo_on.png" alt="logo AdultWork" />
      </Link>
        </>
        <>
      <Link to='/estadisticas/carga/chaturbate'>
        <p>Parcial</p>
        <img src="/Chaturbate_logo.svg" alt="logo Chaturbate" />
      </Link>
        </>
    </div>
  );
};
export default SeleccionarPagina;
