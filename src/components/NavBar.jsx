import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import { setSingOut } from '../redux/actionRegistroUser.js';
import { persistor } from '../redux/store.js';

const NavBar = () => {
  const userVacio = {};
  const { signOut } = useClerk();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    if (user.id) {
      console.log('tengo datos')
    }
  }, [user.id])
  
  console.log(user)

  const handleProfileClick = () => {
    setShowLogout(!showLogout);
  };

  

  const handleSignOut = async () => {
    dispatch(setSingOut(userVacio));
    signOut();
    await persistor.purge();
      navigate("/");
  };

  return (
    <nav className="w-full bg-fuchsia-500 p-1 text-lg flex justify-between items-center font-bold fixed top-0 z-10 ">
      <NavLink to="/home">
        <button className="btn-n">Home</button>
      </NavLink>
      <NavLink to="/estadisticas">
        <button className="btn-n">Estadisticas</button>
      </NavLink>
      <NavLink to={"/register"}>
        <button className="btn-n">Registro</button>
      </NavLink>
      
      <div className="grid grid-cols-2">
      <div className=" w-10 ">
        <img
          src={user.image}
          alt="{user.nombre}"
          className=" rounded-full"
          onClick={handleProfileClick}
          />
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
