import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import { setSingOut } from "../../redux/actions/registro/registerUser.js";
import { persistor } from "../../redux/store.js";
import { cerrarSession } from "../../redux/actions/cerrarSession.js";

const NavBar = () => {
  const userVacio = {};
  const { signOut } = useClerk();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [showLogout, setShowLogout] = useState(false);
  const [showPhoto, setShowPhto] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (user.admin) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [user]);

  useEffect(() => {
    if (user.id) {
    }
  }, [user.id]);

  const handleProfileClick = () => {
    setShowLogout(!showLogout);
    setShowPhto(false);
  };

  const handleSignOut = async () => {
    dispatch(setSingOut(userVacio));
    dispatch(cerrarSession());
    signOut();
    await persistor.purge();
    navigate("/");
  };

  return (
    <nav className="w-full bg-indigo-300 p-1 px-6 text-lg flex justify-between h-12 items-center font-bold fixed top-0 z-10 ">
      {showButton && (<NavLink to="/home">
        <button className="btn-n">Home</button>
      </NavLink>)}
      {showButton && (<NavLink to="/editar">
        <button className="btn-n">Editar</button>
      </NavLink>)}
     {showButton && ( <NavLink to={"/crear"}>
        <button className="btn-n">Registros</button>
      </NavLink>)}
      {showButton && (<NavLink to={"/ventas"}>
        <button className="btn-n">Ventas</button>
      </NavLink>)}
      {!showButton && (<NavLink to={`/user/${user.id}`}>
        <button className="btn-n">Estadisticas</button>
      </NavLink>)}
      {!showButton && (<NavLink to={`/modelo/${user.id}`}>
        <button className="btn-n">Detalles</button>
      </NavLink>)}
      {showButton && (<NavLink to={"/modelo"}>
        <button className="btn-n">Modelos</button>
      </NavLink>)}

      {showPhoto && (
        <div className="w-11 rounded-full border-2 border-black ">
          <img
            key={user.image}
            src={user.image}
            alt={user.nombre}
            className="rounded-full"
            onClick={handleProfileClick}
          />
        </div>
      )}
      {showLogout && (
        <button className="btn-n" onClick={() => handleSignOut()}>
          Salir
        </button>
      )}
    </nav>
  );
};

export default NavBar;
