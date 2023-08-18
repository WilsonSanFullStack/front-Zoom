import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="w-full bg-fuchsia-500 p-1 text-lg flex justify-between items-center font-bold fixed top-0 z-10 ">
      <NavLink to="/">
        <button className="btn-n">Home</button>
      </NavLink>
      <NavLink to="/estadisticas">
        <button className="btn-n">Estadisticas</button>
      </NavLink>
      <NavLink to={'/registro'}>
      <button className="btn-n">Registro</button>
      </NavLink>
    </nav>
  );
};

export default NavBar;
