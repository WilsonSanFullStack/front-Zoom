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

  useEffect(() => {
    if (user.id) {
    }
  }, [user.id]);

  const handleProfileClick = () => {
    setShowLogout(!showLogout);
  };

  const handleSignOut = async () => {
    dispatch(setSingOut(userVacio));
    dispatch(cerrarSession());
    signOut();
    await persistor.purge();
    navigate("/");
  };
  const [loadingProfileImage, setLoadingProfileImage] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingProfileImage(false);
    }, 20000);
  }, []);

  return (
    <nav className="w-full bg-indigo-300 p-1 text-lg flex justify-between items-center font-bold fixed top-0 z-10 ">
      <NavLink to="/home">
        <button className="btn-n">Home</button>
      </NavLink>
      <NavLink to="/editar">
        <button className="btn-n">Editar</button>
      </NavLink>
      <NavLink to={"/crear"}>
        <button className="btn-n">Registros</button>
      </NavLink>
      <NavLink to={"/ventas"}>
        <button className="btn-n">Ventas</button>
      </NavLink>
      <NavLink to={"/user"}>
        <button className="btn-n">User</button>
      </NavLink>
      <NavLink to={"/modelo"}>
        <button className="btn-n">Modelos</button>
      </NavLink>

      <div className="grid grid-cols-2">
        <div className=" w-10 mr-5 -my-2 ">
          {loadingProfileImage ? (
            <div className="cintaAjedrez"></div>
          ) : (
            <img
              key={user.image}
              src={user.image}
              alt={user.nombre}
              className="rounded-full"
              onClick={handleProfileClick}
            />
          )}
        </div>
        {showLogout && (
          <button className="btn-n" onClick={() => handleSignOut()}>
            Salir
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
