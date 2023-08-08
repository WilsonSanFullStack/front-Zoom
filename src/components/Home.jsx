import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-fuchsia-400 text-xl flex justify-center items-center">
      <div className="flex-wrap max-w-xs text-center ">
        <NavLink to="/estadisticas">
          <button className="btn-w">Estadisticas</button>
        </NavLink>
        <NavLink>
          <button className="btn-w">Modelos</button>
        </NavLink>
        <NavLink>
          <button className="btn-w">Registro</button>
        </NavLink>
      </div>
    </div>
  );
};
export default Home;
