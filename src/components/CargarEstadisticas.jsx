import React from "react";
import { Link } from "react-router-dom";

const SeleccionarPagina = () => {
  return (
    <div className="">
      <h3 className="font-bold">Click en el Logo de la pagina que desea cargar</h3>

        <div className="flex font-bold ">
        <section className="w-25 img-e">
      <Link to='/estadisticas/carga/adultregular'>
        <p>Corte</p>
        <img src="/AWLogo_on.png" alt="logo AdultWork" />
      </Link>
        </section>
        <section className="w-25 img-e">
      <Link to='/estadisticas/carga/adultparcial'>
        <p>Parcial</p>
        <img src="/AWLogo_on.png" alt="logo AdultWork" />
      </Link>
        </section>
        <section className="w-48 img-e">
      <Link to='/estadisticas/carga/chaturbate'>
        <p>Chaturbate</p>
        <img src="/Chaturbate_logo.svg" alt="logo Chaturbate" />
      </Link>
        </section>
        </div>
    </div>
  );
};
export default SeleccionarPagina;
