import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moneda from "../resource/Moneda.jsx";
import { useParams } from "react-router-dom";

import {
  getAllQuincena,
  searchUserByFortnight,
} from "../../redux/actions/registro/registerQuincena.js";
import { resetError } from "../../redux/actions/resetError.js";

const User = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const quincenas = useSelector((state) => state.quincenas);
  const quincenaUser = useSelector((state) => state.quincenaUser);
  console.log(quincenaUser);

  const [ids, setIds] = useState("");

  const dolar = quincenaUser?.moneda?.monedas?.map((x) => {
    return x.dolar;
  });
  const euro = quincenaUser?.moneda?.monedas?.map((x) => {
    return x.euro;
  });

  const libra = quincenaUser?.moneda?.monedas?.map((x) => {
    return x.libra;
  });
  useEffect(() => {
    dispatch(resetError());
  }, [ids]);
  
  useEffect(() => {
    dispatch(getAllQuincena());
  }, [dispatch]);

  useEffect(() => {
    ids || ids !== "" ? dispatch(searchUserByFortnight(ids, id)) : "";
  }, [dispatch]);

  useEffect(() => {
    // Encontrar la quincena que coincide con la fecha actual
    const quincenaActual = quincenas.find((q) => {
      const quincenaInicio = q?.inicia;
      const partesFechaInicio = quincenaInicio.split("/");

      // Obtén el día, el mes y el año como números
      const diaInicio = parseInt(partesFechaInicio[0], 10);
      const mesInicio = parseInt(partesFechaInicio[1], 10) - 1; // Restamos 1 al mes ya que en JavaScript los meses van de 0 a 11
      const añoInicio = parseInt(partesFechaInicio[2], 10);

      // Crea un objeto de fecha
      const fechaInicio = new Date(añoInicio, mesInicio, diaInicio);

      const quincenaFinal = q?.final;
      const partesFechaFinal = quincenaFinal.split("/");

      // Obtén el día, el mes y el año como números
      const diaFinal = parseInt(partesFechaFinal[0], 10);
      const mesFinal = parseInt(partesFechaFinal[1], 10) - 1; // Restamos 1 al mes ya que en JavaScript los meses van de 0 a 11
      const añoFinal = parseInt(partesFechaFinal[2], 10);

      // Crea un objeto de fecha
      const fechaFinal = new Date(añoFinal, mesFinal, diaFinal, 23, 59, 59);

      const fechaActual = new Date();

      return fechaActual >= fechaInicio && fechaActual <= fechaFinal;
    });

    if (quincenaActual) {
      setIds(quincenaActual?.id); // Establecer la quincena actual como valor predeterminado en el selector
    }
  }, [quincenas]);

  const handleQuincena = (event) => {
    setIds(event.target.value);
  };

  const [showDetail, setShowDetail] = useState(false);
  const handleShowDetail = () => {
    if (showDetail) {
      setShowDetail(false);
    } else {
      setShowDetail(true);
    }
  };
  const [showDetailBonga, setShowDetailBonga] = useState(false);
  const handleShowDetailBonga = () => {
    if (showDetailBonga) {
      setShowDetailBonga(false);
    } else {
      setShowDetailBonga(true);
    }
  };

  const [showPage, setShowPage] = useState({
    showAdult: quincenaUser?.adultwork?.length >= 1 ? true : false,
    showAmateur: quincenaUser?.amateur ? true : false,
    showBonga: quincenaUser?.bonga?.length >= 1 ? true : false,
    showCam4: quincenaUser?.cam4 ? true : false,
    showChaturbate: quincenaUser?.chaturbate ? true : false,
    showDirty: quincenaUser?.dirty ? true : false,
    showIsLive: quincenaUser?.islive ? true : false,
    showSender: quincenaUser?.sender ? true : false,
    showSkype: quincenaUser?.skype ? true : false,
    showStripchat: quincenaUser?.stripchat ? true : false,
    showVx: quincenaUser?.vx ? true : false,
    showXlove: quincenaUser?.xlove ? true : false,
    showXloveNueva: quincenaUser?.xlovenueva ? true : false,
  });
  useEffect(() => {
    // ... el código anterior
  
    const newShowPage = {
      showAdult: quincenaUser?.adultwork?.length >= 1 ? true : false,
      showAmateur: quincenaUser?.amateur ? true : false,
      showBonga: quincenaUser?.bonga?.length >= 1 ? true : false,
      showCam4: quincenaUser?.cam4 ? true : false,
      showChaturbate: quincenaUser?.chaturbate ? true : false,
      showDirty: quincenaUser?.dirty ? true : false,
      showIsLive: quincenaUser?.islive ? true : false,
      showSender: quincenaUser?.sender ? true : false,
      showSkype: quincenaUser?.skype ? true : false,
      showStripchat: quincenaUser?.stripchat ? true : false,
      showVx: quincenaUser?.vx ? true : false,
      showXlove: quincenaUser?.xlove ? true : false,
      showXloveNueva: quincenaUser?.xlovenueva ? true : false,
    };
  
    setShowPage(newShowPage);
  }, [id, quincenaUser]);
  
  const cp = (
    quincenaUser?.adultwork?.reduce((x, y) => {
      return x + y.creditos;
    }, 0) +
    quincenaUser?.amateur?.dolares +
    quincenaUser?.bonga?.reduce((x, y) => {
      return x + y.dolares;
    }, 0) +
    (quincenaUser?.cam4?.dolares || 0) +
    quincenaUser?.chaturbate?.dolares +
    quincenaUser?.dirty?.plata +
    quincenaUser?.islive?.euros +
    quincenaUser?.sender?.euros +
    quincenaUser?.skype?.dolares +
    quincenaUser?.stripchat?.dolares +
    quincenaUser?.vx?.euros +
    quincenaUser?.xlove?.euros +
    quincenaUser?.xlovenueva?.euros
  ).toFixed(2);

  let porcentaje = "";
  if (cp < quincenaUser?.user?.porcentaje?.meta || cp === "NaN") {
    porcentaje = quincenaUser?.user?.porcentaje?.inicial;
  } else {
    porcentaje = quincenaUser?.user.porcentaje?.final;
  }

  return (
    <div className="contenedor1">
      <div className="contenedor2 ">
        <div>
          <select onChange={handleQuincena} value={ids} className="select">
            <option value="">
              Seleccione Una Quincena
            </option>
            {quincenas &&
              quincenas?.map((x) => {
                return (
                  <option value={x.id} key={x.id}>
                    {x?.nombre}
                  </option>
                );
              })}
          </select>
        </div>

        {quincenaUser && quincenaUser?.moneda?.nombre ? (
          <Moneda quincena={quincenaUser?.moneda} />
        ) : (
          <div className="loade1 m-auto my-2"></div>
        )}

        <div className="grid grid-cols-2"></div>
        <div className="pb-28">
          <h1 className=" font-bold text-3xl">
            {quincenaUser && quincenaUser?.user?.nombre.split(" ")[0]}{" "}
            {quincenaUser && quincenaUser?.user?.apellido?.split(" ")[0]}
          </h1>
          <div className="grid grid-cols-2 font-bold text-xl mb-2 border-2 border-indigo-500 rounded-2xl bg-indigo-300 max-w-screen-sm mx-auto">
            <section className=" ">
              <h1>Total Creditos</h1>
              <h1>{cp}</h1>
            </section>
            <section>
              <h1>Porcentaje</h1>
              <h1>{porcentaje} %</h1>
            </section>
          </div>
          <div className="mx-28 bg-indigo-300 p-2 rounded-2xl border-4 border-indigo-400">
            {/*  //todo Adultregular  */}

            {showPage?.showAdult && (
              <div
                className="grid grid-cols-4 border-2 m-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-200"
                onClick={handleShowDetail}
              >
                <section className="sectionPage adult sectionIconPage max-w-fit">
                  <img src="/AWLogo_on.png" alt="Adult" className="iconPage" />
                </section>
                <section className="sectionPage border-l-2">
                  <h1>Cortes</h1>
                  <h1>{quincenaUser?.adultwork?.length}</h1>
                </section>
                <section className="sectionPage">
                  <h1>Libras</h1>
                  <h1>
                    {quincenaUser?.adultwork
                      ? "£ " +
                        Intl.NumberFormat("en-GB").format(
                          quincenaUser?.adultwork
                            ?.reduce((x, y) => {
                              return x + y.creditos;
                            }, 0)
                            .toFixed(2)
                        )
                      : "No trabajo"}
                  </h1>
                </section>
                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("es-CP").format(
                      (
                        (quincenaUser?.adultwork?.reduce((x, y) => {
                          return x + y.creditos;
                        }, 0) *
                          porcentaje) /
                        100
                      ).toFixed(2) * libra
                    )}
                  </h1>
                </section>
              </div>
            )}

            {showDetail && (
              <div className="grid grid-cols-3">
                {quincenaUser?.adultwork
                  ? quincenaUser?.adultwork?.map((corte, x) => {
                      return (
                        <div
                          key={corte?.id}
                          className=" bg-indigo-200 m-2 p-2 w-max rounded-3xl"
                        >
                          <p className=" font-bold">Corte N°{x + 1} Adult </p>
                          <p className=" ">Fecha Adult: {corte?.fecha} </p>
                          <p>UserName: {corte?.userName}</p>
                          <p className=" font-bold">
                            Libras: £ {(corte?.creditos).toFixed(2)}{" "}
                          </p>
                          <p>
                            Pesos: ${" "}
                            {Intl.NumberFormat("es-CP").format(
                              ((corte?.creditos * porcentaje) / 100).toFixed(
                                2
                              ) * libra
                            )}
                          </p>
                        </div>
                      );
                    })
                  : null}
              </div>
            )}

            {/* //todo amateur   */}

            {showPage?.showAmateur && (
              <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400">
                <section className="sectionPage sectionIconPage bg-red-600 max-w-fit">
                  <img src="/Amateur.png" alt="Amateur" className="iconPage" />
                </section>
                <section className="sectionPage border-l-2">
                  <h1>Tokens</h1>
                  <h1>
                    {Intl.NumberFormat().format(
                      parseFloat(quincenaUser?.amateur?.tokens)
                    )}
                  </h1>
                </section>

                <section className="sectionPage">
                  <h1>Dolares</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("en-US").format(
                      quincenaUser?.amateur?.dolares
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((quincenaUser?.amateur?.dolares * porcentaje) / 100) *
                        dolar
                    )}
                  </h1>
                </section>
              </div>
            )}

            {/* //todo Bonga */}

            {showPage?.showBonga && (
              <div
                className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-200"
                onClick={handleShowDetailBonga}
              >
                <section className="sectionPage sectionIconPage max-w-fit">
                  <img src="/bonga.jpeg" alt="bonga" className="iconPage" />
                </section>

                <section className="sectionPage border-l-2">
                  <h1>Cortes</h1>
                  <h1>{quincenaUser?.bonga?.length}</h1>
                </section>

                <section className="sectionPage">
                  <h1>Dolares</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("en-US").format(
                      quincenaUser?.bonga?.reduce((x, y) => {
                        return x + y.dolares;
                      }, 0)
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((quincenaUser?.bonga?.reduce((x, y) => {
                        return x + y.dolares;
                      }, 0) *
                        porcentaje) /
                        100) *
                        dolar
                    )}
                  </h1>
                </section>
              </div>
            )}

            {showDetailBonga && (
              <div className="grid grid-cols-3">
                {quincenaUser?.bonga
                  ? quincenaUser?.bonga?.map((corte, x) => {
                      return (
                        <div
                          key={corte?.id}
                          className=" bg-indigo-200 m-2 p-2 w-max rounded-3xl"
                        >
                          <p className=" font-bold">Corte N°{x + 1} Bonga </p>
                          <p className=" ">Fecha Bonga: {corte?.fecha} </p>
                          <p className=" font-bold">
                            Dolares: $ {corte?.dolares}{" "}
                          </p>
                          <p>
                            Pesos: ${" "}
                            {Intl.NumberFormat("es-CP").format(
                              ((corte?.dolares * porcentaje) / 100) * dolar
                            )}
                          </p>
                        </div>
                      );
                    })
                  : null}
              </div>
            )}

            {/* //todo Cam4  */}

            {showPage?.showCam4 && (
              <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400">
                <section className="sectionPage sectionIconPage bg-black max-w-fit">
                  <img src="/Cam4.png" alt="Cam4" className="iconPage" />
                </section>
                <section className="sectionPage"></section>
                <section className="sectionPage">
                  <h1>Dolares</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("en-US").format(
                      quincenaUser?.cam4?.dolares
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((quincenaUser?.cam4?.dolares * porcentaje) / 100) * dolar
                    )}
                  </h1>
                </section>
              </div>
            )}
            {/* //todo Chaturbate  */}

            {showPage?.showChaturbate && (
              <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-200">
                <section className="sectionPage sectionIconPage bg-slate-200 max-w-fit">
                  <img
                    src="/Chaturbate_logo.svg"
                    alt="Chaturbate"
                    className="iconPage"
                  />
                </section>

                <section className="sectionPage border-l-2">
                  <h1>Tokens</h1>
                  <h1>{quincenaUser?.chaturbate?.tokens}</h1>
                </section>

                <section className="sectionPage">
                  <h1>Dolares</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("en-US").format(
                      quincenaUser?.chaturbate?.dolares?.toFixed(2)
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((quincenaUser?.chaturbate?.dolares * porcentaje) / 100) *
                        dolar
                    )}
                  </h1>
                </section>
              </div>
            )}
            {/* //todo dirty  */}

            {showPage?.showDirty && (
              <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400">
                <section className="sectionPage sectionIconPage bg-stone-900 max-w-fit">
                  <img src="/mydirty.png" alt="Dirty" className="iconPage" />
                </section>

                <section className="sectionPage">
                  {/* <h1>Usuarios</h1>*/}
                  <h1>{}</h1>
                </section>

                <section className="sectionPage">
                  <h1>
                    {quincenaUser?.dirty?.moneda === "dolar"
                      ? "Dolares"
                      : "Euros"}
                  </h1>
                  <h1>
                    {quincenaUser?.dirty?.moneda === "dolar" ? "$" : "€"}{" "}
                    {Intl.NumberFormat("en-US").format(
                      quincenaUser?.dirty?.plata
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("es-CP").format(
                      quincenaUser?.dirty?.moneda === "dolar"
                        ? ((quincenaUser?.dirty?.plata * porcentaje) / 100) *
                            dolar
                        : ((quincenaUser?.dirty?.plata * porcentaje) / 100) *
                            euro
                    )}
                  </h1>
                </section>
              </div>
            )}

            {/* //todo islive  */}

            {showPage?.showIsLive && (
              <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-200">
                <section className="sectionPage sectionIconPage max-w-fit">
                  <img
                    src="/clubIsLive.png"
                    alt="Islive"
                    className="iconPage"
                  />
                </section>
                <section className="sectionPage">
                  {/* <h1>Usuarios</h1>*/}
                  <h1>{}</h1>
                </section>

                <section className="sectionPage">
                  <h1>Euros</h1>
                  <h1>
                    €{" "}
                    {Intl.NumberFormat("en-US").format(
                      quincenaUser?.islive?.euros
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((quincenaUser?.islive?.euros * porcentaje) / 100) * euro
                    )}
                  </h1>
                </section>
              </div>
            )}
            {/* //todo Sender   */}

            {showPage.showSender && (
              <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400">
                <section className="sectionPage sectionIconPage bg-black max-w-fit">
                  <img
                    src="/livestrip.webp"
                    alt="Sender"
                    className="iconPage"
                  />
                </section>

                <section className="sectionPage">
                  {/* <h1>Usuarios</h1>*/}
                  <h1>{}</h1>
                </section>

                <section className="sectionPage">
                  <h1>Euros</h1>
                  <h1>
                    €{" "}
                    {Intl.NumberFormat("en-ES").format(
                      (quincenaUser?.sender?.euros * porcentaje) / 100
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((quincenaUser?.sender?.euros * porcentaje) / 100) * euro
                    )}
                  </h1>
                </section>
              </div>
            )}
            {/* //todo Skype    */}

            {showPage.showSkype && (
              <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-200">
                <section className="sectionPage sectionIconPage bg-white max-w-fit">
                  <img src="/Skype.webp" alt="Skype" className="iconPage" />
                </section>

                <section className="sectionPage">
                  {/* <h1>Usuarios</h1>*/}
                  <h1>{}</h1>
                </section>

                <section className="sectionPage">
                  <h1>Dolares</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("en-US").format(
                      quincenaUser?.skype?.dolares
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((quincenaUser?.skype?.dolares * porcentaje) / 100) *
                        dolar
                    )}
                  </h1>
                </section>
              </div>
            )}
            {/* //todo Stripchat    */}

            {showPage.showStripchat && (
              <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400">
                <section className="sectionPage sectionIconPage bg-white max-w-fit">
                  <img
                    src="/stripchat.png"
                    alt="Stripchat"
                    className="w-14 mx-7"
                  />
                </section>

                <section className="sectionPage border-l-2">
                  <h1>tokens</h1>
                  <h1>{quincenaUser?.stripchat?.tokens}</h1>
                </section>

                <section className="sectionPage">
                  <h1>Dolares</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("en-US").format(
                      quincenaUser?.stripchat?.dolares
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((quincenaUser?.stripchat?.dolares * porcentaje) / 100) *
                        dolar
                    )}
                  </h1>
                </section>
              </div>
            )}
            {/* //todo Vx    */}

            {showPage.showVx && (
              <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-200">
                <section className="sectionPage sectionIconPage bg-black max-w-fit">
                  <img src="/VxMaster.svg" alt="Vx" className="iconPage" />
                </section>
                <section className="sectionPage">
                  {/* <h1>Usuarios</h1>*/}
                  <h1>{}</h1>
                </section>

                <section className="sectionPage">
                  <h1>Euros</h1>
                  <h1>
                    €{" "}
                    {Intl.NumberFormat("en-US").format(quincenaUser?.vx?.euros)}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    €{" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((quincenaUser?.vx?.euros * porcentaje) / 100) * euro
                    )}
                  </h1>
                </section>
              </div>
            )}
            {/* //todo xlove    */}
            {showPage.showXlove && (
              <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400">
                <section className="sectionPage sectionIconPage bg-red-800 max-w-fit">
                  <img src="/xlove.png" alt="Xlove" className="iconPage" />
                </section>

                <section className="sectionPage">
                  {/* <h1>Usuarios</h1>*/}
                  <h1>{}</h1>
                </section>

                <section className="sectionPage">
                  <h1>Euro</h1>
                  <h1>
                    €{" "}
                    {Intl.NumberFormat("en-US").format(
                      quincenaUser?.xlove?.euros
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    €{" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((quincenaUser?.xlove?.euros * porcentaje) / 100) * euro
                    )}
                  </h1>
                </section>
              </div>
            )}
            {/* //todo xlove Nueva   */}
            {showPage.showXloveNueva && (
              <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-200">
                <section className="sectionPage sectionIconPage bg-red-800 max-w-fit">
                  <img src="/xlove.png" alt="Xlove" className="iconPage" />
                </section>
                <section className="sectionPage">
                  {/* <h1>Usuarios</h1>*/}
                  <h1>{}</h1>
                </section>

                <section className="sectionPage">
                  <h1>Euro</h1>
                  <h1>
                    €{" "}
                    {Intl.NumberFormat("en-US").format(
                      quincenaUser?.xlovenueva?.euros
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    €{" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((quincenaUser?.xlovenueva?.euros * porcentaje) / 100) *
                        euro
                    )}
                  </h1>
                </section>
              </div>
            )}
          </div>

          {/* //! TOTALES */}
          <div className="fixed bottom-1 font-bold text-lg grid grid-cols-7 border-2 border-indigo-500 my-1 min-w-full  bg-sky-400">
            <section className="sectionPage sectionIconPage ">
              {/* <img src="/xlove.png" alt="Xlove" className="iconPage" /> */}
              <h1>TOTALES</h1>
            </section>
            <section className="sectionPage">
              <h1 className="border-b-2 border-indigo-500">Prestamos</h1>
              <h1>{123456789}</h1>
            </section>
            <section className="sectionPage">
              <h1 className="border-b-2 border-indigo-500">Compras</h1>
              <h1>{123456789}</h1>
            </section>

            <section className="sectionPage">
              <h1 className="border-b-2 border-indigo-500">Total Libras</h1>
              <h1>
                £{" "}
                {Intl.NumberFormat("en-GB").format(
                  quincenaUser?.adultwork
                    ?.reduce((x, y) => {
                      return x + y.creditos;
                    }, 0)
                    .toFixed(2)
                )}
              </h1>
            </section>
            <section className="sectionPage">
              <h1 className="border-b-2 border-indigo-500">Total Euro</h1>
              <h1>
                €{" "}
                {Intl.NumberFormat("es-ES").format(
                  (
                    (quincenaUser?.dirty?.moneda === "dolar"
                      ? 0
                      : quincenaUser?.dirty?.plata) +
                    quincenaUser?.islive?.euros +
                    quincenaUser?.sender?.euros +
                    quincenaUser?.vx?.euros +
                    quincenaUser?.xlove?.euros +
                    quincenaUser?.xlovenueva?.euros
                  ).toFixed(2)
                )}
              </h1>
            </section>
            <section className="sectionPage">
              <h1 className="border-b-2 border-indigo-500">Total Dolares</h1>
              <h1>
                $
                {Intl.NumberFormat("en-US").format(
                  (
                    quincenaUser?.amateur?.dolares +
                    quincenaUser?.bonga?.reduce((x, y) => {
                      return x + y.dolares;
                    }, 0) +
                    quincenaUser?.cam4?.dolares +
                    quincenaUser?.chaturbate?.dolares +
                    (quincenaUser?.dirty?.moneda === "dolar"
                      ? quincenaUser?.dirty?.plata
                      : 0) +
                    quincenaUser?.skype?.dolares +
                    quincenaUser?.stripchat?.dolares
                  ).toFixed(2)
                )}
              </h1>
            </section>

            <section className=" min-w-fit">
              <h1 className="border-b-2 border-indigo-500">Total Pesos</h1>
              <h1>
                ${" "}
                {Intl.NumberFormat("es-CP").format(
                  (((quincenaUser?.amateur?.dolares +
                    quincenaUser?.bonga?.reduce((x, y) => {
                      return x + y.dolares;
                    }, 0) +
                    quincenaUser?.cam4?.dolares +
                    quincenaUser?.chaturbate?.dolares +
                    (quincenaUser?.dirty?.moneda === "dolar"
                      ? quincenaUser?.dirty?.plata
                      : 0) +
                    quincenaUser?.skype?.dolares +
                    quincenaUser?.stripchat?.dolares) *
                    porcentaje) /
                    100) *
                    dolar +
                    ((((quincenaUser?.dirty?.moneda === "dolar"
                      ? 0
                      : quincenaUser?.dirty?.plata) +
                      quincenaUser?.islive?.euros +
                      quincenaUser?.sender?.euros +
                      quincenaUser?.vx?.euros +
                      quincenaUser?.xlove?.euros +
                      quincenaUser?.xlovenueva?.euros) *
                      porcentaje) /
                      100) *
                      euro +
                    ((quincenaUser?.adultwork?.reduce((x, y) => {
                      return x + y.creditos;
                    }, 0) *
                      porcentaje) /
                      100) *
                      libra
                )}
              </h1>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
