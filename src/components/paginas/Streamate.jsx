import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pse } from "../../redux/actions/paginas/sender.js";
import { resetError } from "../../redux/actions/paginas/adult.js";
import TextareaForm from "../resource/Textarea.jsx";
import ButtonPage from "../resource/ButtonPage.jsx";

import { getAllQuincena } from "../../redux/actions/registro/registerQuincena.js";

const Streamate = () => {
  const dispatch = useDispatch();
  const reporte = useSelector((state) => state.spg);
  const errors = useSelector((state) => state.error);
  const [input, setInput] = useState([]);
  const [streamate, setStreamate] = useState(input);
  const quincenas = useSelector((state) => state.quincenas);
  const [id, setId] = useState("");
  console.log(streamate);
  useEffect(() => {
    setInput([]);
  }, [id]);
  useEffect(() => {
    dispatch(getAllQuincena());
  }, [dispatch]);

  useEffect(() => {
    // Encontrar la quincena que coincide con la fecha actual
    const quincenaActual = quincenas.find((q) => {
      const quincenaInicio = q.inicia;
      const partesFechaInicio = quincenaInicio.split("/");

      // Obtén el día, el mes y el año como números
      const diaInicio = parseInt(partesFechaInicio[0], 10);
      const mesInicio = parseInt(partesFechaInicio[1], 10) - 1;
      const añoInicio = parseInt(partesFechaInicio[2], 10);

      // Crea un objeto de fecha
      const fechaInicio = new Date(añoInicio, mesInicio, diaInicio);

      const quincenaFinal = q.final;
      const partesFechaFinal = quincenaFinal.split("/");

      // Obtén el día, el mes y el año como números
      const diaFinal = parseInt(partesFechaFinal[0], 10);
      const mesFinal = parseInt(partesFechaFinal[1], 10) - 1;
      const añoFinal = parseInt(partesFechaFinal[2], 10);

      // Crea un objeto de fecha
      const fechaFinal = new Date(añoFinal, mesFinal, diaFinal);

      const fechaActual = new Date();

      return fechaActual >= fechaInicio && fechaActual <= fechaFinal;
    });

    if (quincenaActual) {
      setId(quincenaActual.id);
    }
  }, [quincenas]);

  const handleQuincena = (event) => {
    setId(event.target.value);
  };

  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  const handleTextarea = (event) => {
    setInput(event.target.value);
    setStreamate(() => {
      const regex =
        /\{[\s\S]*?userName: (\w+),[\s\S]*?fecha: (\d{2}\/((0[1-9]|1[0-5])|(1[6-9]|2[0-9]|30|31)\/(0[1-9]|1[0-2])\/23)),[\s\S]*?dolares: (\d+)\}/g;
      const result = [];
      let match;

      while ((match = regex.exec(event.target.value)) !== null) {
        const userName = match[1];
        const fecha = match[2];
        const dolares = parseFloat(match[4]);

        result.push({ userName, fecha, dolares });
      }

      console.log(result);
      return result;
    });
  };

  //! regex aun en creacion
  //   const patron_fechas = /(\w{3}\s\d{2},\s\d{4})/g;
  // const resultado_fechas = [...texto.matchAll(patron_fechas)];
  // const fechas = resultado_fechas.map(match => new Date(match[0]).getTime()); // Convierte las fechas a milisegundos desde 1970-01-01
  // const fechaInicial = new Date(Math.min(...fechas)).toLocaleDateString(); // Encuentra la fecha más antigua y la convierte de nuevo a formato legible
  // const fechaFinal = new Date(Math.max(...fechas)).toLocaleDateString(); // Encuentra la fecha más reciente y la convierte de nuevo a formato legible

  // const patron_totalRevenue = /Total Revenue: \$([0-9.]+)/;
  // const resultado_totalRevenue = texto.match(patron_totalRevenue);
  // const totalRevenue = resultado_totalRevenue ? parseFloat(resultado_totalRevenue[1]) : null;

  // const patron_totalTimeOnline = /Total Time Online: (\d+h \d+m \d+s)/;
  // const resultado_totalTimeOnline = texto.match(patron_totalTimeOnline);
  // const totalTimeOnline = resultado_totalTimeOnline ? resultado_totalTimeOnline[1] : null;

  // const patron_earnings = /Earnings for (.+?) earned \$(\d+\.\d+)/g;
  // const usuarios = [];

  // let match;
  // while ((match = patron_earnings.exec(texto)) !== null) {
  //   let userName = match[1].replace("Studio", ""); // Elimina "Studio" del nombre de usuario
  //   const earnings = parseFloat(match[2]);

  //   // Filtrar los datos solo a partir del día 16 del mes
  //   if (new Date(match[0]).getDate() >= 16) {
  //     usuarios.push({ userName, dolares: earnings, fechaInicial, fechaFinal, totalTimeOnline });
  //   }
  // }

  // usuarios.sort((a, b) => a.userName.localeCompare(b.userName)); // Ordena alfabéticamente por userName

  // console.log(usuarios);
  //!fin del regex en creacion

  const handlerSubmit = () => {
    // dispatch(pse(cose));
    setInput([]);
    setCose([]);
  };

  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <ButtonPage />
        <div>
          <select className="select" onChange={handleQuincena} value={id}>
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
        <TextareaForm
          value={input}
          onChange={handleTextarea}
          onSubmit={handlerSubmit}
          placeholder="Pegue aquí el corte de Sender"
          titulo="Corte De Sender"
        />
        <div className="mt-24">
          {errors && <p className="error">{errors.message}</p>}
        </div>
      </div>

      <div className="contenedor3">
        <div className="cotenedor4">
          <h2 className="titulo">Creditos a subir</h2>
          {streamate?.map((x, i) => {
            return (
              <div key={i}>
                <h3 className="mostrarcorte">
                  <p>{i + 1}</p>
                  <p>Nombre: {x.user}</p>
                  <p>Coins: {x.coins}</p>
                  <p>Euros: {x.euros}</p>
                  <p>Fecha: {x.fecha}</p>
                  <br />
                </h3>
                <br />
              </div>
            );
          })}
        </div>
        <div className="contenedor4">
          <h2 className="titulo">Creditos subidos</h2>
          {!errors && (
            <div>
              {reporte?.map((x, i) => {
                return (
                  <div key={x.id}>
                    <h3 className="mostrarcorte">
                      <p>{i + 1}</p>
                      <p>Nombre: {x.userName}</p>
                      <p>Coins: {x.coins}</p>
                      <p>Euros: {x.euros}</p>
                      <p>Fecha: {x.fecha}</p>
                      <p>fecha creacion: {x.createdAt}</p>
                    </h3>
                    <br />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Streamate;
