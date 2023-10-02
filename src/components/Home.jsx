import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Moneda from "./Moneda.jsx";
import VerEstadisticas from "./VerEstadisticas.jsx";

import {
  getAllQuincena,
  getByIdQuincena,
} from "../redux/actions/registro/registrarQuincena.js";
import Fecha from "./Fecha.jsx";
import date from "./date.js";

const Home = () => {
  const fecha = date();
  // console.log(fecha)
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

  useEffect(() => {
    // Encontrar la quincena que coincide con la fecha actual
    const quincenaActual = quincenas.find((q) => {
      const quincenaInicio = q.inicia;
      const partesFechaInicio = quincenaInicio.split("/");

      // Obtén el día, el mes y el año como números
      const diaInicio = parseInt(partesFechaInicio[0], 10);
      const mesInicio = parseInt(partesFechaInicio[1], 10) - 1; // Restamos 1 al mes ya que en JavaScript los meses van de 0 a 11
      const añoInicio = parseInt(partesFechaInicio[2], 10);

      // Crea un objeto de fecha
      const fechaInicio = new Date(añoInicio, mesInicio, diaInicio);
      console.log(fechaInicio);
      // console.log(q)
      const quincenaFinal = q.final;
      const partesFechaFinal = quincenaFinal.split("/");

      // Obtén el día, el mes y el año como números
      const diaFinal = parseInt(partesFechaFinal[0], 10);
      const mesFinal = parseInt(partesFechaFinal[1], 10) - 1; // Restamos 1 al mes ya que en JavaScript los meses van de 0 a 11
      const añoFinal = parseInt(partesFechaFinal[2], 10);

      // Crea un objeto de fecha
      const fechaFinal = new Date(añoFinal, mesFinal, diaFinal);
      console.log(fechaFinal);
      const fechaActual = new Date();
      // console.log(fechaActual)
      console.log(fechaActual);

      console.log(fechaActual >= fechaInicio && fechaActual <= fechaFinal);
      return fechaActual >= fechaInicio && fechaActual <= fechaFinal;
    });
    console.log(quincenas);
    if (quincenaActual) {
      setId(quincenaActual.id); // Establecer la quincena actual como valor predeterminado en el selector
    }
  }, [quincenas]);

  const handleQuincena = (event) => {
    setId(event.target.value);
  };

  return (
    <div className="min-h-screen bg-indigo-200 text-xl pt-14 text-center">
      {/* //* quincena, moneda y fecha */}
      <div>
        <Fecha />
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
