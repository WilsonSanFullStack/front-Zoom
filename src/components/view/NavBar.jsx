import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserButton, useAuth } from "@clerk/clerk-react";

import Login from "./Login.jsx";
import Protected from "../resource/Protected.jsx";

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useSelector((state) => state.user);
  const [showButton, setShowButton] = useState(false);
  const isUserOrModelRoute = /^\/(user|modelo)\/\d+$/i.test(pathname);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return <Login />;
  }

  useEffect(() => {
    if (!isUserOrModelRoute && !user.admin) {
      navigate(`user/${user.id}`);
    }
    if (user.admin) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [user]);
  return (
    <nav className="w-full bg-indigo-300 dark:bg-slate-700 p-1 px-6 text-lg flex justify-between h-12 items-center font-bold fixed top-0 z-10 ">
      {showButton && (
        <NavLink to="/home">
          <button className="btn-n">Home</button>
        </NavLink>
      )}
      {showButton && (
        <NavLink to="/editar">
          <button className="btn-n">Editar</button>
        </NavLink>
      )}
      {showButton && (
        <NavLink to={"/crear"}>
          <button className="btn-n">Registros</button>
        </NavLink>
      )}
      {showButton && (
        <NavLink to={"/ventas"}>
          <button className="btn-n">Ventas</button>
        </NavLink>
      )}
      {!showButton && (
        <NavLink to={`/user/${user.id}`}>
          <button className="btn-n">Estadisticas</button>
        </NavLink>
      )}
      {!showButton && (
        <NavLink to={`/modelo/${user.id}`}>
          <button className="btn-n">Detalles</button>
        </NavLink>
      )}
      {showButton && (
        <NavLink to={"/modelo"}>
          <button className="btn-n">Modelos</button>
        </NavLink>
      )}

      <UserButton />
    </nav>
  );
};

export default NavBar;
