import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state => state.user);

  
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div className="min-h-screen bg-indigo-200 text-xl pt-14">
        <section className=" bg-indigo-200 w-44">
        <span className="">
          📆 {formattedDate}
        </span>
        </section>
      <div className="flex-wrap max-w-xs text-center flex justify-center items-center ">
        <NavLink to="/estadisticas">
          <button className="btn-w">Estadisticas</button>
        </NavLink>
        <NavLink to='/modelo'>
          <button className="btn-w">Modelos</button>
        </NavLink>
        <NavLink to='/crear'>
          <button className="btn-w">Crear</button>
        </NavLink>
      </div>
    </div>
  );
};
export default Home;
