import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../redux/actions/registro/registroUser.js";
import Moneda from "./Moneda.jsx";
import {
  getAllQuincena,
  getByIdQuincena,
} from "../redux/actions/registro/registrarQuincena.js";
import Fecha from "./Fecha.jsx";

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const quincenas = useSelector((state) => state.quincenas);
  const quincena = useSelector((state) => state.quincena);
  const [id, setId] = useState("");

  useEffect(() => {
    dispatch(getAllQuincena());
  }, [dispatch]);

  useEffect(() => {
    id || id !== ''? dispatch(getByIdQuincena(id)): '';
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
    <div className="contenedor1">
      <div className="contenedor2">
      <Fecha/>
        <div>
          <h1>{user && user?.nombre}</h1>
        </div>
        <div>
          <select onChange={handleQuincena} value={id}>
            <option value="" hidden>
              Seleccione Una Quincena
            </option>
            {quincenas && quincenas?.map((x) => {
              return (
                <option value={x.id} key={x.id}>
                  {x.nombre}
                </option>
              );
            })}
          </select>
        </div>

          {quincena && quincena.nombre ? (<Moneda quincena={quincena} />) : (
            <div className="loader m-auto my-2"></div>
            )}
        <h1 className="m-5">xxx</h1>
        <p>baneada en pagina x la fecha xxx/xx/xxxx por taly tal cosa </p>
      </div>
    </div>
  );
};

export default User;
