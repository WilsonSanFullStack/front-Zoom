import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Moneda from "./Moneda.jsx";
import VerEstadisticas from './VerEstadisticas.jsx'

import {
  getAllQuincena,
  getByIdQuincena,
} from "../redux/actions/registro/registrarQuincena.js";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user);
  const quincenas = useSelector((state) => state.quincenas);
  const quincena = useSelector((state) => state.quincena);
  const [id, setId] = useState("");

  useEffect(() => {
    dispatch(getAllQuincena());
  }, [dispatch]);

  useEffect(() => {
    id || id !== "" ? dispatch(getByIdQuincena(id)) : "";
  }, [dispatch, id]);

  const handleQuincena = (event) => {
    setId(event.target.value);
  };

  return (
    <div className="min-h-screen bg-indigo-200 text-xl pt-14 text-center">
      {/* //* quincena, moneda y fecha */}
      <div>
        <select onChange={handleQuincena} value={id}>
          <option value="" hidden>
            Seleccione Una Quincena
          </option>
          {quincenas &&
            quincenas?.map((x) => {
              return (
                <option value={x.id} key={x.id}>
                  {x.nombre}
                </option>
              );
            })}
        </select>
      </div>

      {quincena && quincena.nombre ? (
        <Moneda quincena={quincena} />
      ) : (
        <div className="loader m-auto my-2"></div>
      )}
{/*//* funcionalidad */}
      {/* <div className="text-center flex justify-center items-center ">
        <NavLink to="/estadisticas">
          <button className="btn-w">Estadisticas</button>
        </NavLink>
        <NavLink to="/modelo">
          <button className="btn-w">Modelos</button>
        </NavLink>
        <NavLink to="/crear">
          <button className="btn-w">Crear</button>
        </NavLink>
      </div> */}
      {/* //! ver estadisticas */}
      <VerEstadisticas />
    </div>
  );
};
export default Home;
