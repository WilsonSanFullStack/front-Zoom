import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moneda from "../resource/Moneda.jsx";
import { useParams } from "react-router-dom";

import {
  getAllQuincena,
  getQuincenaMoneda,
  getQuincenaAdult,
  getQuincenaAmateur,
  getQuincenaBonga,
  getQuincenaCam4,
  getQuincenaChaturbate,
  getQuincenaDirty,
  getQuincenaIsLive,
  getQuincenaSender,
  getQuincenaSkype,
  getQuincenaStripchat,
  getQuincenaVx,
  getQuincenaXlove,
  getQuincenaXloveNueva,
} from "../../redux/actions/registro/registerQuincena.js";

import { getUserId } from "../../redux/actions/registro/registerUser.js";
import { getAllPagina } from "../../redux/actions/registro/registerPaginas.js";

const User = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const paginas = useSelector((state) => state.paginas);
  const quincenas = useSelector((state) => state.quincenas);
  const quincenaMoneda = useSelector((state) => state.quincenaMoneda);
  const quincenaAdult = useSelector((state) => state.quincenaAdult);
  const quincenaAmateur = useSelector((state) => state.quincenaAmateur);
  const quincenaBonga = useSelector((state) => state.quincenaBonga);
  const quincenaCam4 = useSelector((state) => state.quincenaCam4);
  const quincenaChaturbate = useSelector((state) => state.quincenaChaturbate);
  const quincenaDirty = useSelector((state) => state.quincenaDirty);
  const quincenaIslive = useSelector((state) => state.quincenaIslive);
  const quincenaSender = useSelector((state) => state.quincenaSender);
  const quincenaSkype = useSelector((state) => state.quincenaSkype);
  const quincenaStripchat = useSelector((state) => state.quincenaStripchat);
  const quincenaVx = useSelector((state) => state.quincenaVx);
  const quincenaXlove = useSelector((state) => state.quincenaXlove);
  const quincenaXloveNueva = useSelector((state) => state.quincenaXloveNueva);

  const [ids, setIds] = useState("");

  const dolar = quincenaMoneda?.monedas?.map((x) => {
    return x.dolar;
  });
  const euro = quincenaMoneda?.monedas?.map((x) => {
    return x.euro;
  });

  const libra = quincenaMoneda?.monedas?.map((x) => {
    return x.libra;
  });

  useEffect(() => {
    dispatch(getAllQuincena());
    dispatch(getUserId(id));
    dispatch(getAllPagina());
  }, [dispatch]);

  useEffect(() => {
    ids || ids !== "" ? dispatch(getQuincenaMoneda(ids)) : "";
    ids || ids !== "" ? dispatch(getQuincenaAdult(ids)) : "";
    ids || ids !== "" ? dispatch(getQuincenaAmateur(ids)) : "";
    ids || ids !== "" ? dispatch(getQuincenaBonga(ids)) : "";
    ids || ids !== "" ? dispatch(getQuincenaCam4(ids)) : "";
    ids || ids !== "" ? dispatch(getQuincenaChaturbate(ids)) : "";
    ids || ids !== "" ? dispatch(getQuincenaDirty(ids)) : "";
    ids || ids !== "" ? dispatch(getQuincenaIsLive(ids)) : "";
    ids || ids !== "" ? dispatch(getQuincenaSender(ids)) : "";
    ids || ids !== "" ? dispatch(getQuincenaSkype(ids)) : "";
    ids || ids !== "" ? dispatch(getQuincenaStripchat(ids)) : "";
    ids || ids !== "" ? dispatch(getQuincenaVx(ids)) : "";
    ids || ids !== "" ? dispatch(getQuincenaXlove(ids)) : "";
    ids || ids !== "" ? dispatch(getQuincenaXloveNueva(ids)) : "";
  }, [dispatch, ids]);

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
  const pages = {};
  const UserNames = {};
  for (const x of paginas) {
    pages[x.nombrePagina] = x.id;
    for (const y of user?.useres) {
      if (y.pagina === pages?.[x.nombrePagina]) {
        UserNames[x.nombrePagina] = y.userName;
      }
    }
  }
  console.log(UserNames);
  const creditosAdultwork = quincenaAdult?.q_adult?.filter(
    (item) => item.userName === UserNames?.Adultwork
  );

  const creditos = creditosAdultwork?.reduce((x, y) => {
    return x + y.creditos;
  }, 0);

  const amateur = quincenaAmateur?.q_amateur?.find(
    (x) => x.userName === UserNames?.Amateur
  );

  const bonga = quincenaBonga?.q_bonga?.filter(
    (x) => x.userName === UserNames?.Bonga
  );
  const creditosBonga = bonga?.reduce((x, y) => {
    return x + y.dolares;
  }, 0);

  const cam4 = quincenaCam4?.q_cam4?.find(
    (x) => x.userName === UserNames?.Cam4
  );

  const chaturbate = quincenaChaturbate?.q_chaturbate?.find(
    (x) => x.userName === UserNames?.Chaturbate
  );
  const dirty = quincenaDirty?.q_dirty?.find(
    (x) => x.userName === UserNames?.Dirty
  );
  const isLive = quincenaIslive?.q_isLive?.find(
    (x) => x.codigo === UserNames?.Islive
  );
  const sender = quincenaSender?.q_sender?.find(
    (x) => x.userName === UserNames?.Sender
  );
  const skype = quincenaSkype?.q_skype?.find(
    (x) => x.userName === UserNames?.Skype
  );
  const stripchat = quincenaStripchat?.q_stripchat?.find(
    (x) => x.userName === UserNames?.Stripchat
  );
  const vx = quincenaVx?.q_vx?.find((x) => x.userName === UserNames?.Vx);

  const xlove = quincenaXlove?.q_xlove?.find(
    (x) => x.userName === UserNames?.Xlove
  );

  const xloveNueva = quincenaXloveNueva?.q_xloveNueva?.find(
    (x) => x.userName === UserNames?.XloveNueva
  );

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
    showAdult: UserNames?.Adultwork?.length >= 1 ? true : false,
    showAmateur: UserNames?.Amateur?.length >= 1 ? true : false,
    showBonga: UserNames?.Bonga?.length >= 1 ? true : false,
    showCam4: UserNames?.Cam4?.length >= 1 ? true : false,
    showChaturbate: UserNames?.Chaturbate?.length >= 1 ? true : false,
    showDirty: UserNames?.Dirty?.length >= 1 ? true : false,
    showIsLive: UserNames?.Islive?.length >= 1 ? true : false,
    showSender: UserNames?.Sender?.length >= 1 ? true : false,
    showSkype: UserNames?.Skype?.length >= 1 ? true : false,
    showStripchat: UserNames?.Stripchat?.length >= 1 ? true : false,
    showVx: UserNames?.Vx?.length >= 1 ? true : false,
    showXlove: UserNames?.Xlove?.length >= 1 ? true : false,
    showXloveNueva: UserNames?.XloveNueva?.length >= 1 ? true : false,
  });

  const cp = (
    creditos +
    amateur?.dolares +
    creditosBonga +
    cam4?.dolares +
    chaturbate?.dolares +
    dirty?.plata +
    isLive?.euros +
    sender?.euros +
    skype?.dolares +
    stripchat?.dolares +
    vx?.euros +
    xlove?.euros +
    xloveNueva?.euros
  ).toFixed(2);
  console.log(cp);
  let porcentaje = "";
  if (cp < user.p_porcentaje?.meta || cp === "NaN") {
    porcentaje = user.p_porcentaje?.inicial;
  } else {
    porcentaje = user.p_porcentaje?.final;
  }
  console.log(porcentaje);
  return (
    <div className="contenedor1">
      <div className="contenedor2 ">
        <div>
          <select onChange={handleQuincena} value={id} className="select">
            <option value="" hidden>
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

        {quincenaMoneda && quincenaMoneda?.nombre ? (
          <Moneda quincena={quincenaMoneda} />
        ) : (
          <div className="loade1 m-auto my-2"></div>
        )}
        
        <div className="grid grid-cols-2"></div>
        <div className="pb-28">
          <h1 className=" font-bold text-3xl">
            {user && user?.nombre?.split(" ")[0]}{" "}
            {user && user?.apellido?.split(" ")[0]}
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
            {/* //todo Adultregular */}
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
                  <h1>
                    {creditosAdultwork?.find(
                      (x) => x.userName === UserNames?.Adultwork
                    )
                      ? creditosAdultwork.length
                      : "No trabajo"}
                  </h1>
                </section>
                <section className="sectionPage">
                  <h1>Libras</h1>
                  <h1>
                    {creditosAdultwork
                      ? "£ " +
                        Intl.NumberFormat("en-GB").format(
                          ((creditos * porcentaje) / 100).toFixed(2)
                        )
                      : "No trabajo"}
                  </h1>
                </section>
                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((creditos * porcentaje) / 100) * libra
                    )}
                  </h1>
                </section>
              </div>
            )}
            {showDetail && (
              <div className="grid grid-cols-3">
                {creditosAdultwork
                  ? creditosAdultwork?.map((corte, x) => {
                      return (
                        <div
                          key={corte?.id}
                          className=" bg-indigo-200 m-2 p-2 w-max rounded-3xl"
                        >
                          <p className=" font-bold">Corte N°{x + 1} Adult </p>
                          <p className=" ">Fecha Adult: {corte?.fecha} </p>
                          <p className=" font-bold">
                            Libras: £ {corte?.creditos}{" "}
                          </p>
                          <p>
                            Pesos: ${" "}
                            {Intl.NumberFormat("es-CP").format(
                              corte?.creditos * libra
                            )}
                          </p>
                        </div>
                      );
                    })
                  : null}
              </div>
            )}

            {/* //todo amateur  */}
            {showPage?.showAmateur && (
              <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400">
                <section className="sectionPage sectionIconPage bg-red-600 max-w-fit">
                  <img src="/Amateur.png" alt="Amateur" className="iconPage" />
                </section>
                <section className="sectionPage border-l-2">
                  <h1>Tokens</h1>
                  <h1>{Intl.NumberFormat().format(amateur?.tokens)}</h1>
                </section>

                <section className="sectionPage">
                  <h1>Dolares</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("en-US").format(
                      (amateur?.dolares * porcentaje) / 100
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((amateur?.dolares * porcentaje) / 100) * dolar
                    )}
                  </h1>
                </section>
              </div>
            )}

            {/* //todo Bonga  */}
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
                  <h1>{bonga?.length}</h1>
                </section>

                <section className="sectionPage">
                  <h1>Dolares</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("en-US").format(
                      (creditosBonga * porcentaje) / 100
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((creditosBonga * porcentaje) / 100) * dolar
                    )}
                  </h1>
                </section>
              </div>
            )}

            {showDetailBonga && (
              <div className="grid grid-cols-3">
                {bonga
                  ? bonga?.map((corte, x) => {
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

                <section className="sectionPage">
                  {/* <h1>Usuarios</h1>
                <h1>{}</h1> */}
                </section>

                <section className="sectionPage">
                  <h1>Dolares</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("en-US").format(
                      (cam4?.dolares * porcentaje) / 100
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((cam4?.dolares * porcentaje) / 100) * dolar
                    )}
                  </h1>
                </section>
              </div>
            )}
            {/* //todo Chaturbate   */}
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
                  <h1>{chaturbate?.tokens}</h1>
                </section>

                <section className="sectionPage">
                  <h1>Dolares</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("en-US").format(
                      ((chaturbate?.dolares * porcentaje) / 100).toFixed(2)
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((chaturbate?.dolares * porcentaje) / 100) * dolar
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
                  {/* <h1>Usuarios</h1>
            <h1>{}</h1> */}
                </section>

                <section className="sectionPage">
                  <h1>{dirty?.moneda === "dolar" ? "Dolares" : "Euros"}</h1>
                  <h1>
                    {dirty?.moneda === "dolar" ? "$" : "€"}{" "}
                    {Intl.NumberFormat("en-US").format(
                      (dirty?.plata * porcentaje) / 100
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("es-CP").format(
                      dirty?.moneda === "dolar"
                        ? ((dirty?.plata * porcentaje) / 100) * dolar
                        : ((dirty?.plata * porcentaje) / 100) * euro
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
                  {/* <h1>Usuarios</h1>
            <h1>{}</h1> */}
                </section>

                <section className="sectionPage">
                  <h1>Euros</h1>
                  <h1>
                    €{" "}
                    {Intl.NumberFormat("en-US").format(
                      (isLive?.euros * porcentaje) / 100
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((isLive?.euros * porcentaje) / 100) * euro
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
                  {/* <h1>Usuarios</h1>
            <h1>{quincenaSender?.q_sender?.length}</h1> */}
                </section>

                <section className="sectionPage">
                  <h1>Euros</h1>
                  <h1>
                    €{" "}
                    {Intl.NumberFormat("en-ES").format(
                      (sender?.euros * porcentaje) / 100
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((sender?.euros * porcentaje) / 100) * euro
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
                  {/* <h1>Usuarios</h1>
            <h1>{quincenaSkype?.q_skype?.length}</h1> */}
                </section>

                <section className="sectionPage">
                  <h1>Dolares</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("en-US").format(
                      (skype?.dolares * porcentaje) / 100
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((skype?.dolares * porcentaje) / 100) * dolar
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
                  <h1>{stripchat?.tokens}</h1>
                </section>

                <section className="sectionPage">
                  <h1>Dolares</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("en-US").format(
                      (stripchat?.dolares * porcentaje) / 100
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    ${" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((stripchat?.dolares * porcentaje) / 100) * dolar
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
                  {/* <h1>Usuarios</h1>
            <h1>{quincenaVx?.q_vx?.length}</h1> */}
                </section>

                <section className="sectionPage">
                  <h1>Euros</h1>
                  <h1>
                    €{" "}
                    {Intl.NumberFormat("en-US").format(
                      (vx?.euros * porcentaje) / 100
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    €{" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((vx?.euros * porcentaje) / 100) * euro
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
                  {/* <h1>Usuarios</h1>
            <h1>{quincenaXlove?.q_xlove?.length}</h1> */}
                </section>

                <section className="sectionPage">
                  <h1>Euro</h1>
                  <h1>
                    €{" "}
                    {Intl.NumberFormat("en-US").format(
                      (xlove?.euros * porcentaje) / 100
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    €{" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((xlove?.euros * porcentaje) / 100) * euro
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
                  {/* <h1>Usuarios</h1>
            <h1>{quincenaXloveNueva?.q_xloveNueva?.length}</h1> */}
                </section>

                <section className="sectionPage">
                  <h1>Euro</h1>
                  <h1>
                    €{" "}
                    {Intl.NumberFormat("en-US").format(
                      (xloveNueva?.euros * porcentaje) / 100
                    )}
                  </h1>
                </section>

                <section className="">
                  <h1>Total Pesos</h1>
                  <h1>
                    €{" "}
                    {Intl.NumberFormat("es-CP").format(
                      ((xloveNueva?.euros * porcentaje) / 100) * euro
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
                  ((creditos * porcentaje) / 100).toFixed(2)
                )}
              </h1>
            </section>
            <section className="sectionPage">
              <h1 className="border-b-2 border-indigo-500">Total Euro</h1>
              <h1>
                €{" "}
                {Intl.NumberFormat("es-ES").format(
                  (
                    (((dirty?.moneda === "dolar" ? 0 : dirty?.plata) +
                      isLive?.euros +
                      sender?.euros +
                      vx?.euros +
                      xlove?.euros +
                      xloveNueva?.euros) *
                      porcentaje) /
                    100
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
                    ((amateur?.dolares +
                      creditosBonga +
                      cam4?.dolares +
                      chaturbate?.dolares +
                      (dirty?.moneda === "dolar" ? dirty?.plata : 0) +
                      skype?.dolares +
                      stripchat?.dolares) *
                      porcentaje) /
                    100
                  ).toFixed(2)
                )}
              </h1>
            </section>

            <section className=" min-w-fit">
              <h1 className="border-b-2 border-indigo-500">Total Pesos</h1>
              <h1>
                ${" "}
                {Intl.NumberFormat("es-CP").format(
                  (
                    (((amateur?.dolares +
                      creditosBonga +
                      cam4?.dolares +
                      chaturbate?.dolares +
                      (dirty?.moneda === "dolar" ? dirty?.plata : 0) +
                      skype?.dolares +
                      stripchat?.dolares) *
                      porcentaje) /
                      100) *
                      dolar +
                    ((((dirty?.moneda === "dolar" ? 0 : dirty?.plata) +
                      isLive?.euros +
                      sender?.euros +
                      vx?.euros +
                      xlove?.euros +
                      xloveNueva?.euros) *
                      porcentaje) /
                      100) *
                      euro +
                    ((creditos * porcentaje) / 100) * libra
                  ).toFixed(2)
                )}
              </h1>
            </section>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default User;
