import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiSend } from "react-icons/bi";

import Moneda from "../resource/Moneda.jsx";

import {
  getAllQuincena,
  getByIdQuincena,
} from "../../redux/actions/registro/registerQuincena.js";

const RegisterRojos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user);
  const quincenas = useSelector((state) => state.quincenas);
  const quincena = useSelector((state) => state.quincena);
  const [id, setId] = useState("");
  console.log(id);
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
      const mesInicio = parseInt(partesFechaInicio[1], 10) - 1;
      const yearInit = parseInt(partesFechaInicio[2], 10);

      // Crea un objeto de fecha
      const fechaInicio = new Date(yearInit, mesInicio, diaInicio);

      const quincenaFinal = q.final;
      const partesFechaFinal = quincenaFinal.split("/");

      // Obtén el día, el mes y el año como números
      const diaFinal = parseInt(partesFechaFinal[0], 10);
      const mesFinal = parseInt(partesFechaFinal[1], 10) - 1;
      const yearEnd = parseInt(partesFechaFinal[2], 10);

      const fechaFinal = new Date(yearEnd, mesFinal, diaFinal, 23, 59, 59);

      const fechaActual = new Date();

      return fechaActual >= fechaInicio && fechaActual <= fechaFinal;
    });

    if (quincenaActual) {
      setId(quincenaActual.id);
    }
    console.log(quincenaActual);
  }, [quincena]);

  const handleQuincena = (event) => {
    setId(event.target.value);
  };

  return (
    <div className="min-h-screen bg-indigo-200 text-xl pt-14 text-center">
      <div className="mt-2">
        <div className="divTitulo">
          <h1 className="titulo">Registro Rojos</h1>
        </div>
        {quincena && quincena.nombre ? (
          <Moneda quincena={quincena} />
        ) : (
          <div className="loade1 m-auto my-2"></div>
        )}
        <select onChange={handleQuincena} value={id} className="select">
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

      <section>
        <button className="btn-w" type="submit">
          <BiSend className="BiSend" />
        </button>
      </section>
    </div>
  );
};

export default RegisterRojos;
