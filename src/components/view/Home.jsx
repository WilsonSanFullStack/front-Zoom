import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Moneda from "../resource/Moneda.jsx";
import { BiSend } from "react-icons/bi";

import { resetError } from "../../redux/actions/resetError.js";
import {
  getAllQuincena,
  searchAllUserByFortnight,
} from "../../redux/actions/registro/registerQuincena.js";
import { postRojo } from "../../redux/actions/registro/registerRojo.js";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quincenas = useSelector((state) => state.quincenas);
  const quincenaHome = useSelector((state) => state.quincenaHome);
  const [id, setId] = useState("");
  const [rojo, setRojo] = useState([]);
  // console.log(quincenas);
  useEffect(() => {
    dispatch(resetError());
  }, [id]);

  useEffect(() => {
    dispatch(getAllQuincena());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(searchAllUserByFortnight(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
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

      const fechaFinal = new Date(añoFinal, mesFinal, diaFinal, 23, 59, 59);

      const fechaActual = new Date();

      return fechaActual >= fechaInicio && fechaActual <= fechaFinal;
    });

    if (quincenaActual && quincenaActual.id) {
      setId(quincenaActual.id);
    }
  }, [quincenas]);
  // console.log(id)

  useEffect(() => {
    if (id.length > 1) {
      const selectedQuincena = quincenas.find((q) => q.id === id);
      const selectedQuincenaNombre = selectedQuincena.nombre;
      // Definir el nombre de la siguiente quincena basándote en la quincena seleccionada
      let nextQuincenaNombre;
      const yearLastTwoDigits = new Date().getFullYear().toString().slice(-2);

      switch (selectedQuincenaNombre) {
        case `enero-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `enero-2-${yearLastTwoDigits}`;
          break;
        case `enero-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `febrero-1-${yearLastTwoDigits}`;
          break;
        case `febrero-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `febrero-2-${yearLastTwoDigits}`;
          break;
        case `febrero-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `marzo-1-${yearLastTwoDigits}`;
          break;
        case `marzo-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `marzo-2-${yearLastTwoDigits}`;
          break;
        case `marzo-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `abril-1-${yearLastTwoDigits}`;
          break;
        case `abril-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `abril-2-${yearLastTwoDigits}`;
          break;
        case `abril-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `mayo-1-${yearLastTwoDigits}`;
          break;
        case `mayo-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `mayo-2-${yearLastTwoDigits}`;
          break;
        case `mayo-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `junio-1-${yearLastTwoDigits}`;
          break;
        case `junio-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `junio-2-${yearLastTwoDigits}`;
          break;
        case `junio-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `julio-1-${yearLastTwoDigits}`;
          break;
        case `julio-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `julio-2-${yearLastTwoDigits}`;
          break;
        case `julio-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `agosto-1-${yearLastTwoDigits}`;
          break;
        case `agosto-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `agosto-2-${yearLastTwoDigits}`;
          break;
        case `agosto-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `septiembre-1-${yearLastTwoDigits}`;
          break;
        case `septiembre-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `septiembre-2-${yearLastTwoDigits}`;
          break;
        case `septiembre-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `octubre-1-${yearLastTwoDigits}`;
          break;
        case `octubre-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `octubre-2-${yearLastTwoDigits}`;
          break;
        case `octubre-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `noviembre-1-${yearLastTwoDigits}`;
          break;
        case `noviembre-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `noviembre-2-${yearLastTwoDigits}`;
          break;
        case `noviembre-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `diciembre-1-${yearLastTwoDigits}`;
          break;
        case `diciembre-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `diciembre-2-${yearLastTwoDigits}`;
          break;
        case `diciembre-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `enero-1-${parseInt(yearLastTwoDigits, 10) + 1}`;
          break;
        case `diciembre-2-${parseInt(yearLastTwoDigits, 10) - 1}`:
          nextQuincenaNombre = `enero-1-${yearLastTwoDigits}`;
          break;
        default:
          return;
      }

      // Encontrar la siguiente quincena en la lista
      const nextQuincena = quincenas.find(
        (q) => q.nombre === nextQuincenaNombre
      );

      const modelosEnRojo = quincenaHome?.modelos?.filter(
        (modelo) => modelo?.totales?.saldo <= 0
      );
      const modeloEnRojo = modelosEnRojo?.map((modelo) => ({
        id: modelo.id,
        nombre: modelo.nombre,
        apellido: modelo.apellido,
        rojo: modelo.totales.saldo,
        quincena: nextQuincena ? nextQuincena.id : "No hay quincena siguiente",
        quincenaNombre: nextQuincena
          ? nextQuincena.nombre
          : "No hay quincena siguiente",
      }));
      setRojo(modeloEnRojo);
    }
  }, [id, quincenaHome.modelos]);

  const handleQuincena = (event) => {
    setId(event.target.value);
  };

  const [show, setShow] = useState(() => {
    const initialState = {};
    quincenaHome?.modelos?.forEach((modelo) => {
      initialState[modelo.id] = false;
    });
    return initialState;
  });

  const [showDetail, setShowDetail] = useState(() => {
    const initialState = {};
    quincenaHome?.modelos?.forEach((modelo) => {
      initialState[modelo.id] = false;
    });
    return initialState;
  });
  const [showPrestamos, setShowPrestamos] = useState(() => {
    const initialState = {};
    quincenaHome?.modelos?.forEach((modelo) => {
      initialState[modelo.id] = false;
    });
    return initialState;
  });
  const [showVitrina, setShowVitrina] = useState(() => {
    const initialState = {};
    quincenaHome?.modelos?.forEach((modelo) => {
      initialState[modelo.id] = false;
    });
    return initialState;
  });

  const handleShow = (modeloId) => {
    setShow((prevShow) => ({
      ...prevShow,
      [modeloId]: !prevShow[modeloId],
    }));
    setShowDetail((prevShowDetail) => ({
      ...prevShowDetail,
      [modeloId]: false,
    }));
    setShowPrestamos((prevShowPrestamos) => ({
      ...prevShowPrestamos,
      [modeloId]: false,
    }));
    setShowVitrina((prevShowVitrina) => ({
      ...prevShowVitrina,
      [modeloId]: false,
    }));
  };

  const handleShowDetail = (modeloId) => {
    setShowDetail((prevShowDetail) => ({
      ...prevShowDetail,
      [modeloId]: !prevShowDetail[modeloId],
    }));
  };

  const handleShowPrestamos = (modeloId) => {
    setShowPrestamos((prevShowPrestamos) => {
      const shouldShowPrestamos = !prevShowPrestamos[modeloId];
      return {
        ...prevShowPrestamos,
        [modeloId]: shouldShowPrestamos,
      };
    });

    // Utilizamos la función de devolución de llamada para asegurar que estamos
    // trabajando con el valor más reciente de show
    setShow((prevShow) => {
      if (!prevShow[modeloId]) {
        setShowPrestamos((prevShowPrestamos) => ({
          ...prevShowPrestamos,
          [modeloId]: false,
        }));
      }
      return prevShow;
    });
  };
  const handleShowVitrina = (modeloId) => {
    setShowVitrina((prevShowVitrina) => {
      const shouldShowVitrina = !prevShowVitrina[modeloId];
      return {
        ...prevShowVitrina,
        [modeloId]: shouldShowVitrina,
      };
    });
  };

  const handleRojo = () => {
    if (rojo.length >= 1) {
      dispatch(postRojo(rojo))
      setRojo([]);
    }
  };
  const [showRojos, setShowRojos] = useState(false);

  const handleRojos = () => {
    showRojos ? setShowRojos(false) : setShowRojos(true);
  };
  console.log(rojo);
  return (
    <div className="contenedor1">
      <div className="contenedor2">
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

        {quincenaHome && quincenaHome.moneda ? (
          <Moneda quincena={quincenaHome.moneda} />
        ) : (
          <div className="loade1 m-auto my-2"></div>
        )}

        {showRojos && (
          <div className="max-w-fit m-4 rounded-xl p-2 bg-red-400 border-4 border-black fixed right-40 bottom-10">
            <h1 className="text-xl font-bold">SALDO ROJO</h1>
            <table className="min-w-full divide-y-4 divide-black border-4 border-black">
              <tbody className="bg-red-500 divide-y-2 divide-black">
                <tr className="text-center bg-red-700 font-bold">
                  <td className="px-6 py-3 text-lg uppercase tracking-wider">
                    #
                  </td>
                  <td className="px-6 py-3  uppercase tracking-wider">
                    nombre
                  </td>
                  <td className="px-6 py-3  uppercase tracking-wider">
                    apellido
                  </td>
                  <td className="px-6 py-3  uppercase tracking-wider">rojo</td>
                  <td className="px-6 py-3  uppercase tracking-wider">para</td>
                </tr>
                {rojo?.map((x, index) => {
                  return (
                    <tr className="font-bold" key={x.id}>
                      <td className="px-6 py-2 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        {x?.nombre}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        {x?.apellido}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        {Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(x?.rojo)}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        {x?.quincenaNombre}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <section className="flex items-center justify-center">
              <button className="btn-w w-auto font-bold text-4xl" onClick={handleRojo}>
                <BiSend />
              </button>
            </section>
          </div>
        )}

        <div className="pb-8">
          <div className="mx-2 bg-indigo-300 p-2 rounded-2xl border-4 border-indigo-400">
            <button className="btn-rojos" onClick={() => handleRojos()}>
              Generar Rojos
            </button>

            <div>
              {quincenaHome?.modelos?.map((x) => {
                if (
                  x?.userNamePage.length ||
                  x?.totales?.totalPrestamos > 0 ||
                  x?.totales?.totalVitrina > 0
                )
                  return (
                    <div
                      key={x.id}
                      className="divPageContainer hover:bg-emerald-300 py-2 px-2"
                    >
                      <h1 className="text-2xl font-bold">
                        {x.nombre} {x.apellido}
                      </h1>
                      <table
                        className="min-w-full divide-y-4 divide-indigo-700 border-4 border-indigo-700"
                        onClick={() => handleShow(x?.id)}
                      >
                        <tbody className="bg-indigo-400 divide-y-2 divide-indigo-700">
                          <tr className="text-center bg-indigo-600 font-bold">
                            <td className="px-6 py-3 text-lg uppercase tracking-wider">
                              Nombre
                            </td>
                            <td className="px-6 py-3  uppercase tracking-wider">
                              Meta
                            </td>
                            <td className="px-6 py-3  uppercase tracking-wider">
                              Total Créditos
                            </td>
                            <td className="px-6 py-3  uppercase tracking-wider">
                              Porcentaje
                            </td>
                            <td className="px-6 py-3  uppercase tracking-wider">
                              rojo
                            </td>
                            <td className="px-6 py-3  uppercase tracking-wider">
                              interes
                            </td>
                            <td className="px-6 py-3  uppercase tracking-wider">
                              Total Prestamos
                            </td>
                            <td className="px-6 py-3  uppercase tracking-wider">
                              Total Vitrina
                            </td>
                            <td className="px-6 py-3  uppercase tracking-wider">
                              Total Pesos
                            </td>
                            <td className="px-6 py-3  uppercase tracking-wider">
                              Saldo
                            </td>
                          </tr>
                          <tr className="font-bold">
                            <td className="px-6 py-2 whitespace-nowrap">
                              {x?.porcentaje && (
                                <h1>{x?.porcentaje?.nombre}</h1>
                              )}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap">
                              {x?.porcentaje && (
                                <h1>{x?.porcentaje?.meta} créditos</h1>
                              )}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap">
                              {x?.totales && (
                                <h1>
                                  {Intl.NumberFormat("es-IN", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(x?.totales?.totalCreditos)}
                                </h1>
                              )}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap">
                              {x?.totales?.porcentajeFinal && (
                                <h1>{x?.totales?.porcentajeFinal}%</h1>
                              )}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap">
                              {x?.totales?.rojo && (
                                <h1>
                                  {Intl.NumberFormat("es-CO", {
                                    style: "currency",
                                    currency: "COP",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(x?.totales?.rojo) || 0}
                                </h1>
                              )}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap">
                              {x?.totales?.interes && (
                                <h1>
                                  {Intl.NumberFormat("es-CO", {
                                    style: "currency",
                                    currency: "COP",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(x?.totales?.interes) || 0}
                                </h1>
                              )}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap">
                              {x?.totales?.totalPrestamos && (
                                <h1>
                                  ${" "}
                                  {Intl.NumberFormat("es-CO", {
                                    style: "currency",
                                    currency: "COP",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(x?.totales?.totalPrestamos)}
                                </h1>
                              )}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap">
                              {x?.totales?.totalVitrina && (
                                <h1>
                                  ${" "}
                                  {Intl.NumberFormat("es-CO", {
                                    style: "currency",
                                    currency: "COP",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(x?.totales?.totalVitrina)}
                                </h1>
                              )}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap">
                              {x?.totales?.totalPesos && (
                                <h1>
                                  {Intl.NumberFormat("es-CO", {
                                    style: "currency",
                                    currency: "COP",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(x?.totales?.totalPesos)}
                                </h1>
                              )}
                            </td>
                            <td
                              className={
                                x?.totales?.saldo > 0
                                  ? "saldoPositivo px-6 py-2 whitespace-nowrap"
                                  : "saldoRojo px-6 py-2 whitespace-nowrap"
                              }
                            >
                              {x?.totales?.saldo && (
                                <h1>
                                  {Intl.NumberFormat("es-CO", {
                                    style: "currency",
                                    currency: "COP",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(x?.totales?.saldo)}
                                </h1>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {show[x?.id] && (
                        <div className="divPages">
                          {x?.adultworkTotal && (
                            <section
                              className="sectionPage1"
                              onClick={() => handleShowDetail(x?.id)}
                            >
                              <h1>Adultwork</h1>
                              <h1>Libras</h1>{" "}
                              <h2>
                                {parseFloat(
                                  x?.adultworkTotal?.creditos
                                ).toFixed(2)}
                              </h2>
                            </section>
                          )}

                          {x?.amateur && (
                            <section className="sectionPage1">
                              <h1>Amateur</h1>
                              <section className="sectionPage2">
                                <section>
                                  <h1>dolares</h1>{" "}
                                  <h2>{x?.amateur?.dolares}</h2>
                                </section>
                                <section>
                                  <h1>Tokens</h1> <h2>{x?.amateur?.tokens}</h2>
                                </section>
                              </section>
                            </section>
                          )}

                          {x?.bongaTotal && (
                            <section className="sectionPage1">
                              <h1>Bonga</h1>
                              <h1>Dolares</h1>{" "}
                              <h2>{x?.bongaTotal?.dolares.toFixed(2)}</h2>
                            </section>
                          )}

                          {x?.cam4 && (
                            <section className="sectionPage1">
                              <h1>Cam4</h1>
                              <h1>Dolares</h1> <h2>{x?.cam4?.dolares}</h2>
                            </section>
                          )}

                          {x?.chaturbate && (
                            <section className="sectionPage1">
                              <h1>Chaturbate</h1>
                              <section className="sectionPage2">
                                <section>
                                  <h1>Tokens </h1>{" "}
                                  <h2>{x?.chaturbate?.tokens}</h2>
                                </section>
                                <section>
                                  <h1>Dolares </h1>{" "}
                                  <h2>{x?.chaturbate?.dolares}</h2>
                                </section>
                              </section>
                            </section>
                          )}

                          {x?.dirty && (
                            <section className="sectionPage1">
                              <h1>Dirty</h1>
                              <h1>
                                {x?.dirty?.moneda === "euro"
                                  ? "Euros"
                                  : "Dolar"}
                              </h1>{" "}
                              <h2>{x?.dirty?.plata}</h2>
                            </section>
                          )}

                          {x?.islive && (
                            <section className="sectionPage1">
                              <h1>Is Live</h1>
                              <h1>Euros</h1> <h2>{x?.islive?.euros}</h2>
                            </section>
                          )}

                          {x?.mondo && (
                            <section className="sectionPage1">
                              <h1>Mondo</h1>
                              <h1>Euros</h1> <h2>{x?.mondo?.euros}</h2>
                            </section>
                          )}

                          {x?.myFreeCams && (
                            <section className="sectionPage1">
                              <h1>My Free Cams</h1>
                              <section className="sectionPage2">
                                <section>
                                  <h1>Dolares</h1>{" "}
                                  <h2>{x?.myFreeCams?.dolares}</h2>
                                </section>
                                <section>
                                  <h1>Tokens</h1>{" "}
                                  <h2>{x?.myFreeCams?.tokens}</h2>
                                </section>
                              </section>
                            </section>
                          )}

                          {x?.sakura && (
                            <section className="sectionPage1">
                              <h1>Sakura</h1>
                              <h1>Dolares</h1> <h2>{x?.sakura?.dolares}</h2>
                            </section>
                          )}

                          {x?.sender && (
                            <section className="sectionPage1">
                              <h1>Sender</h1>
                              <h1>Euros</h1>{" "}
                              <h2>
                                {x?.senderAnterior?.euros
                                  ? x?.sender?.euros - x?.senderAnterior?.euros
                                  : x?.sender?.euros}
                              </h2>
                            </section>
                          )}

                          {x?.skype && (
                            <section className="sectionPage1">
                              <h1>Skype</h1>
                              <h1>Dolares</h1> <h2>{x?.skype?.dolares}</h2>
                            </section>
                          )}

                          {x?.streamate && (
                            <section className="sectionPage1">
                              <h1>Streamate</h1>
                              <h1>Dolares</h1> <h2>{x?.streamate?.dolares}</h2>
                            </section>
                          )}

                          {x?.streamRay && (
                            <section className="sectionPage1">
                              <h1>StreamRay</h1>
                              <h1>Dolares</h1> <h2>{x?.streamRay?.dolares}</h2>
                            </section>
                          )}

                          {x?.stripchat && (
                            <section className="sectionPage1">
                              <h1>Stripchat</h1>
                              <section className="sectionPage2">
                                <section>
                                  <h1>Dolares</h1>{" "}
                                  <h2>{x?.stripchat?.dolares}</h2>
                                </section>
                                <section>
                                  <h1>Tokens</h1>{" "}
                                  <h2>{x?.stripchat?.tokens}</h2>
                                </section>
                              </section>
                            </section>
                          )}

                          {x?.tripleSiete && (
                            <section className="sectionPage1">
                              <h1>777</h1>
                              <section>
                                <h1>Dolares</h1>{" "}
                                <h2>{x?.tripleSiete?.dolares}</h2>
                              </section>
                            </section>
                          )}

                          {x?.vx && (
                            <section className="sectionPage1">
                              <h1>Vx</h1>
                              <h1>Euros</h1> <h2>{x?.vx?.euros}</h2>
                            </section>
                          )}

                          {x?.xlove && (
                            <section className="sectionPage1">
                              <h1>Xlove</h1>
                              <h1>Euros</h1> <h2>{x?.xlove?.euros}</h2>
                            </section>
                          )}

                          {x?.xlovenueva && (
                            <section className="sectionPage1">
                              <h1>Xlove Nueva</h1>
                              <h1>Euros</h1> <h2>{x?.xlovenueva?.euros}</h2>
                              {/* <h1>Fecha</h1> <h2>{x?.xlovenueva?.fecha}</h2> */}
                            </section>
                          )}

                          {x?.prestamos && (
                            <section
                              className="sectionPage1"
                              onClick={() => handleShowPrestamos(x?.id)}
                            >
                              <h1>Prestamos</h1>
                              <section className="sectionPage2">
                                <section>
                                  <h1>Total</h1>{" "}
                                  <h2>
                                    ${" "}
                                    {Intl.NumberFormat("es-CP").format(
                                      x?.totales?.totalPrestamos
                                    )}
                                  </h2>
                                </section>
                                <section>
                                  <h1>Cantidad</h1>{" "}
                                  <h2>{x?.prestamos.length}</h2>
                                </section>
                              </section>
                            </section>
                          )}
                          {x?.vitrina && (
                            <section
                              className="sectionPage1"
                              onClick={() => handleShowVitrina(x?.id)}
                            >
                              <h1>Vitrina</h1>
                              <section className="sectionPage2">
                                <section>
                                  <h1>Total</h1>{" "}
                                  <h2>
                                    ${" "}
                                    {Intl.NumberFormat("es-CP").format(
                                      x?.totales?.totalVitrina
                                    )}
                                  </h2>
                                </section>
                                <section>
                                  <h1>Cantidad</h1> <h2>{x?.vitrina.length}</h2>
                                </section>
                              </section>
                            </section>
                          )}
                        </div>
                      )}

                      {showDetail[x?.id] && (
                        <div className="overflow-x-auto px-2 py-2">
                          <h1 className="text-xl font-bold m-2">
                            CORTES ADULTWORK
                          </h1>
                          <table className="min-w-full divide-y-4 divide-indigo-700 border-4 border-indigo-700">
                            <thead className="bg-indigo-600">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                                >
                                  #
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                                >
                                  UserName
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                                >
                                  Libras
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                                >
                                  Tipo
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                                >
                                  Fecha Adultwork
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-indigo-400 divide-y-2 divide-indigo-700">
                              {x?.adultwork?.map((detalle, index) => (
                                <tr
                                  key={detalle?.id}
                                  className="hover:bg-green-300"
                                >
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {index + 1}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {detalle?.userName}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap font-bold">
                                    {detalle?.creditos}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap font-bold">
                                    {detalle?.parcial ? "Parcial" : "Regular"}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {detalle?.parcial
                                      ? detalle?.createdAt
                                      : detalle?.fecha}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {showPrestamos[x?.id] && (
                        <div className="overflow-x-auto px-2 py-2">
                          <h1 className="text-xl font-bold m-2">
                            PRESTAMOS DETALLADOS
                          </h1>
                          <table className="min-w-full divide-y-4 divide-indigo-700 border-4 border-indigo-700">
                            <thead className="bg-indigo-600">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                                >
                                  #
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                                >
                                  Fechas
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-lg uppercase tracking-wider"
                                >
                                  Valor
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-indigo-400 divide-y-2 divide-indigo-700">
                              {x?.prestamos?.map((p, n) => {
                                const fecha = new Date(p?.createdAt);
                                const opcionesFecha = {
                                  day: "numeric",
                                  month: "short",
                                  year: "2-digit",
                                };
                                const fechaFormateada =
                                  fecha.toLocaleDateString(
                                    "es-ES",
                                    opcionesFecha
                                  );

                                return (
                                  <tr
                                    key={p?.id}
                                    className=" hover:bg-green-300"
                                  >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {n + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {fechaFormateada}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-left font-bold">
                                      ${" "}
                                      {Intl.NumberFormat("ES-CP").format(
                                        p?.cantidad
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {showVitrina[x?.id] && (
                        <div className="overflow-x-auto px-2 py-2">
                          <h1 className="text-xl font-bold m-2">
                            VITRINA DETALLADO
                          </h1>
                          <table className="min-w-full divide-y-4 divide-indigo-700 border-4 border-indigo-700">
                            <thead className="bg-indigo-600">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                                >
                                  #
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                                >
                                  Fechas
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-lg uppercase tracking-wider"
                                >
                                  Nombre
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-lg uppercase tracking-wider"
                                >
                                  Valor
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-lg uppercase tracking-wider"
                                >
                                  Cantidad
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-indigo-400 divide-y-2 divide-indigo-700">
                              {x?.vitrina?.map((p, n) => {
                                const fecha = new Date(p?.createdAt);
                                const opcionesFecha = {
                                  day: "numeric",
                                  month: "short",
                                  year: "2-digit",
                                };
                                const fechaFormateada =
                                  fecha.toLocaleDateString(
                                    "es-ES",
                                    opcionesFecha
                                  );

                                return (
                                  <tr
                                    key={p?.id}
                                    className=" hover:bg-green-300"
                                  >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {n + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {fechaFormateada}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-left font-bold">
                                      {p?.nombre}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-left font-bold">
                                      ${" "}
                                      {Intl.NumberFormat("ES-CP").format(
                                        p?.valor
                                      )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-left font-bold">
                                      {p?.cantidad}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
