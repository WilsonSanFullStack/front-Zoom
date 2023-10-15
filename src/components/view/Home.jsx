import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Moneda from "../resource/Moneda.jsx";

import {
  getAllQuincena,
  getByIdQuincena,
} from "../../redux/actions/registro/registerQuincena.js";

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

  useEffect(() => {
    // Encontrar la quincena que coincide con la fecha actual

    const quincenaActual = quincenas?.find((q) => {
      const quincenaInicio = q?.inicia;
      const partesFechaInicio = quincenaInicio?.split("/");

      // Obtén el día, el mes y el año como números
      const diaInicio = parseInt(partesFechaInicio[0], 10);
      const mesInicio = parseInt(partesFechaInicio[1], 10) - 1;
      const añoInicio = parseInt(partesFechaInicio[2], 10);

      // Crea un objeto de fecha
      const fechaInicio = new Date(añoInicio, mesInicio, diaInicio);

      const quincenaFinal = q?.final;
      const partesFechaFinal = quincenaFinal?.split("/");

      // Obtén el día, el mes y el año como números
      const diaFinal = parseInt(partesFechaFinal[0], 10);
      const mesFinal = parseInt(partesFechaFinal[1], 10) - 1;
      const añoFinal = parseInt(partesFechaFinal[2], 10);

      const fechaFinal = new Date(añoFinal, mesFinal, diaFinal);

      const fechaActual = new Date();

      return fechaActual >= fechaInicio && fechaActual <= fechaFinal;
    });

    if (quincenaActual) {
      setId(quincenaActual?.id);
    }
  }, [quincenas]);

  const handleQuincena = (event) => {
    setId(event.target.value);
  };

  return (
    <div className="min-h-screen bg-indigo-200 text-xl pt-14 text-center">
      <div className="mt-2">
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

      {quincena && quincena.nombre ? (
        <Moneda quincena={quincena} />
      ) : (
        <div className="loade1 m-auto my-2"></div>
      )}
    </div>
  );
};
export default Home;
