import React from "react";
import { NavLink } from "react-router-dom";

const Editar = () => {
  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <h1 className="font-bold text-4xl m-2">Que Desea Editar Hoy</h1>
        <section className=" grid grid-cols-3">
          <NavLink to="/editar/pagina">
            <button className="btn-w h-20 w-48">Editar Pagina</button>
          </NavLink>

          <NavLink to="/editar/producto">
            <button className="btn-w h-20 w-48">Editar Producto</button>
          </NavLink>

          <NavLink to="/editar/username">
            <button className="btn-w h-20 w-48">Editar UserName</button>
          </NavLink>

          <NavLink to="/editar/quincena">
            <button className="btn-w h-20 w-48">Editar Quincena</button>
          </NavLink>
          <NavLink to="/editar/moneda">
            <button className="btn-w h-20 w-48">Editar Moneda</button>
          </NavLink>

          <NavLink to="/editar/porcnetaje">
            <button className="btn-w h-20 w-48">Editar Porcentaje</button>
          </NavLink>
        </section>
      </div>
    </div>
  );
};

export default Editar;
