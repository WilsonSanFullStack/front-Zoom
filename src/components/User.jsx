import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../redux/actions/registro/registroUser.js";
import Moneda from "./Moneda.jsx";
import {
  getAllQuincena,
  getByIdQuincena,
} from "../redux/actions/registro/registrarQuincena.js";

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const quincenas = useSelector((state) => state.quincenas);
  const quincena = useSelector((state) => state.quincena);
  const [id, setId] = useState("");

  const dolar = quincena?.monedas?.map((x) => {
    return x.edolar;
  });
  const euro = quincena?.monedas?.map((x) => {
    return x.eeuro;
  });
  const libra = quincena?.monedas?.map((x) => {
    return x.elibra;
  });

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
  console.log(user);
  console.log(quincena);

  const handleUser = () => {
    quincena.q_a.map((x) => {});
  };
  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <div>
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

        {quincena && quincena?.nombre ? (
          <Moneda quincena={quincena} />
        ) : (
          <div className="loader m-auto my-2"></div>
        )}
        <div className="grid grid-cols-2">
          {quincena &&
            quincena?.q_a?.map((corte, x) => {
              const mostrarcreditos = user.useres.find(
                (apodo) => apodo.UserName === corte.UserName
              );
              if (mostrarcreditos) {
                return (
                  <div key={corte.id} className=" bg-indigo-300 m-2 p-2 w-max">
                    {/* <section className="bg-indigo-100 w-max"> */}
                    <p className=" font-bold">Corte N°{x + 1} Adult </p>
                    <p className=" ">Fecha Adult: {corte.fecha} </p>
                    <p className=" font-bold">Libras: {corte.creditos} </p>
                    <p>
                      Pesos: $
                      {Intl.NumberFormat("es-CP").format(
                        corte.creditos * libra
                      )}
                    </p>

                    {/* </section> */}
                  </div>
                );
              }
              return null;
            })}
        </div>
          <div>
            <h1 className=" font-bold text-2xl">{user && user?.nombre.split(' ')[0]} {user && user?.apellido.split(' ')[0]}</h1>
          </div>
      </div>
    </div>
  );
};

export default User;
