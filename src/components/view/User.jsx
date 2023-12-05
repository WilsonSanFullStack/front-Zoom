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
  const user = useSelector((state) => state.quincenaUser);

  const [ids, setIds] = useState("");

  // useEffect(() => {
  //   dispatch(resetError());
  // }, [ids]);

  useEffect(() => {
    dispatch(getAllQuincena());
  }, [dispatch]);

  useEffect(() => {
    ids || ids !== "" ? dispatch(searchUserByFortnight(ids, id)) : "";
  }, [ids]);

  // useEffect(() => {
  //   // Encontrar la quincena que coincide con la fecha actual
  //   const quincenaActual = quincenas.find((q) => {
  //     const quincenaInicio = q?.inicia;
  //     const partesFechaInicio = quincenaInicio.split("/");

  //     // Obtén el día, el mes y el año como números
  //     const diaInicio = parseInt(partesFechaInicio[0], 10);
  //     const mesInicio = parseInt(partesFechaInicio[1], 10) - 1; // Restamos 1 al mes ya que en JavaScript los meses van de 0 a 11
  //     const añoInicio = parseInt(partesFechaInicio[2], 10);

  //     // Crea un objeto de fecha
  //     const fechaInicio = new Date(añoInicio, mesInicio, diaInicio);

  //     const quincenaFinal = q?.final;
  //     const partesFechaFinal = quincenaFinal.split("/");

  //     // Obtén el día, el mes y el año como números
  //     const diaFinal = parseInt(partesFechaFinal[0], 10);
  //     const mesFinal = parseInt(partesFechaFinal[1], 10) - 1; // Restamos 1 al mes ya que en JavaScript los meses van de 0 a 11
  //     const añoFinal = parseInt(partesFechaFinal[2], 10);

  //     // Crea un objeto de fecha
  //     const fechaFinal = new Date(añoFinal, mesFinal, diaFinal, 23, 59, 59);

  //     const fechaActual = new Date();

  //     return fechaActual >= fechaInicio && fechaActual <= fechaFinal;
  //   });

  //   if (quincenaActual) {
  //     setIds(quincenaActual?.id); // Establecer la quincena actual como valor predeterminado en el selector
  //   }
  // }, [quincenas]);

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
  console.log(user);
  return (
    <div className="contenedor1">
      <div className="contenedor2 ">
        <div>
          <select onChange={handleQuincena} value={ids} className="select">
            <option value="">Seleccione Una Quincena</option>
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

        {user && user?.moneda?.nombre ? (
          <Moneda quincena={user?.moneda} />
        ) : (
          <div className="loade1 m-auto my-2"></div>
        )}

        <div className="pb-28 m-2">
          <h1 className=" font-bold text-3xl">
            {user && user?.nombre?.split(" ")[0]}{" "}
            {user && user?.apellido?.split(" ")[0]}
          </h1>

          <table className="min-w-full divide-y-4 bg-indigo-400 divide-indigo-700 border-4 border-indigo-700">
            <tbody className=" divide-y-2 divide-indigo-700">
              <tr className="text-center bd-indigo-600 font-bold ">
                <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                  Nombre
                </td>
                <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                  meta
                </td>
                <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                  total creditos
                </td>
                <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                  porcentaje
                </td>
                <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                  total prestamos
                </td>
                <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                  total vitrina
                </td>
                <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                  total pesos
                </td>
                <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                  saldo
                </td>
              </tr>
              <tr className="bg-indigo-300">
                <td className="px-6 py-2 whitespace-nowrap">
                  {user?.porcentaje && <h1>{user.porcentaje?.nombre}</h1>}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {user?.porcentaje && <h1>{user.porcentaje?.meta}</h1>}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {user?.totales && (
                    <h1>
                      {Intl.NumberFormat("es-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user?.totales?.totalCreditos)}
                    </h1>
                  )}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {user?.totales && <h1>{user?.totales?.porcentajeFinal} %</h1>}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {user?.totales && (
                    <h1>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user?.totales?.totalPrestamos)}{" "}
                    </h1>
                  )}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {user?.totales && (
                    <h1>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user?.totales?.totalVitrina)}{" "}
                    </h1>
                  )}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {user?.totales && (
                    <h1>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user?.totales?.totalPesos)}{" "}
                    </h1>
                  )}
                </td>
                <td
                  className={
                    user?.totales?.saldo > 0
                      ? "saldoPositivo px-6 py-2 whitespace-nowrap"
                      : "saldoRojo px-6 py-2 whitespace-nowrap"
                  }
                >
                  {user?.totales && (
                    <h1>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user?.totales?.saldo)}
                    </h1>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="my-2">
            <table className="min-w-full divide-y-4 bg-indigo-400 divide-indigo-700 border-4 border-indigo-700">
              <tbody className=" divide-y-2 divide-indigo-700">
                <tr className="text-center bd-indigo-600 font-bold ">
                  <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                    pagina
                  </td>
                  <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                    nombre
                  </td>
                  <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                    cortes
                  </td>
                  <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                    tokens
                  </td>
                  <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                    creditos
                  </td>
                  <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                    pesos
                  </td>
                </tr>
                {/*//todo adultwork */}
                {user?.adultwork && (
                  <tr className="bg-indigo-300" onClick={handleShowDetail}>
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <img
                        src="/AWLogo_on.png"
                        alt="logo adultwork"
                        className="w-32 h-10"
                      />
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.adultwork && (
                        <h1>{user?.adultwork[0]?.userName}</h1>
                      )}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.adultwork && (
                        <h1>{user?.adultwork?.length || 1}</h1>
                      )}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.adultwork && <h1>Sin tokens</h1>}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.adultwork && (
                        <h1>
                          {Intl.NumberFormat("en-GB", {
                            style: "currency",
                            currency: "GBP",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user.adultworkTotal)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.adultwork && user?.totales?.libra && (
                        <h1>
                          {Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(
                            ((user?.adultworkTotal *
                              user?.totales?.porcentajeFinal) /
                              100) *
                              user?.totales?.libra
                          )}
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/*//todo amateur */}
                {user?.amateur && (
                  <tr className="bg-indigo-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="bg-red-600 rounded-xl p-2 h-10 w-32 flex justify-center items-center">
                        <img src="/Amateur.png" alt="logo Amateur" />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.amateur && <h1>{user?.amateur?.userName}</h1>}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.amateur && <h1>{user?.amateur?.length || 1}</h1>}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.amateur && (
                        <h1>
                          {Intl.NumberFormat("es-IN").format(
                            user?.amateur?.tokens
                          )}
                        </h1>
                      )}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.amateur && (
                        <h1>
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user.amateur.dolares)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.amateur && user?.totales?.dolar && (
                        <h1>
                          {Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(
                            ((user?.amateur?.dolares *
                              user?.totales?.porcentajeFinal) /
                              100) *
                              user?.totales?.dolar
                          )}
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/*//todo BONGA */}
                {user?.bonga && (
                  <tr className="bg-indigo-300" onClick={handleShowDetailBonga}>
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <img
                        src="/public/bonga.jpeg"
                        alt="logo adultwork"
                        className="w-32 h-10 rounded-xl"
                      />
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.bonga && <h1>{user?.bonga[0]?.userName}</h1>}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.bonga && <h1>{user?.bonga?.length || 1}</h1>}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.bonga && <h1>Sin tokens</h1>}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.bonga && (
                        <h1>
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user.bongaTotal)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.bonga && user?.totales?.dolar && (
                        <h1>
                          {Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(
                            ((user?.bongaTotal *
                              user?.totales?.porcentajeFinal) /
                              100) *
                              user?.totales?.dolar
                          )}
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/*//todo CAM4 */}
                {user.cam4 && (
                  <tr className="bg-indigo-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="bg-black rounded-xl h-10 p-2 w-32 flex justify-center items-center">
                        <img src="/Cam4.png" alt="logo Cam4" />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.cam4 && <h1>{user?.cam4?.userName}</h1>}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.cam4 && <h1>{user?.cam4?.length || 1}</h1>}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.cam4 && <h1>Sin tokens</h1>}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.cam4 && (
                        <h1>
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user.cam4.dolares)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.cam4 && user?.totales?.dolar && (
                        <h1>
                          {Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(
                            ((user?.cam4?.dolares *
                              user?.totales?.porcentajeFinal) /
                              100) *
                              user?.totales?.dolar
                          )}
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/* //todo CHATURBATE */}
                {user?.chaturbate && (
                  <tr className="bg-indigo-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className=" bg-slate-200 p-2 h-10 w-32 rounded-xl flex justify-center items-center ">
                        <img src="/Chaturbate_logo.svg" alt="logo Chaturbate" />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.chaturbate && (
                        <h1>{user?.chaturbate?.userName}</h1>
                      )}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.chaturbate && (
                        <h1>{user?.chaturbate?.length || 1}</h1>
                      )}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.chaturbate && (
                        <h1>
                          {Intl.NumberFormat("es-IN").format(
                            user?.chaturbate?.tokens
                          )}
                        </h1>
                      )}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.chaturbate && (
                        <h1>
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user.chaturbate.dolares)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.chaturbate && user?.totales?.dolar && (
                        <h1>
                          {Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(
                            ((user?.chaturbate?.dolares *
                              user?.totales?.porcentajeFinal) /
                              100) *
                              user?.totales?.dolar
                          )}
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/* //todo DIRTY */}
                {user?.dirty && (
                  <tr className="bg-indigo-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="bg-stone-900 p-2 rounded-xl h-10 w-32 flex justify-center items-center">
                        <img src="/mydirty.png" alt="logo Dirty" />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.dirty && <h1>{user?.dirty?.userName}</h1>}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.dirty && <h1>{user?.dirty?.length || 1}</h1>}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.dirty && <h1>Sin tokens</h1>}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.dirty && (
                        <h1>
                          {user?.dirty?.moneda.toLowerCase() === "dolar"
                            ? Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(user.dirty.plata)
                            : Intl.NumberFormat("en-EU", {
                                style: "currency",
                                currency: "EUR",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(user.dirty.plata)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.dirty &&
                        user?.totales?.dolar &&
                        user?.totales?.euro && (
                          <h1>
                            {Intl.NumberFormat("es-CO", {
                              style: "currency",
                              currency: "COP",
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(
                              ((user?.dirty?.plata *
                                user?.totales?.porcentajeFinal) /
                                100) *
                                (user?.dirty?.moneda.toLowerCase() === "dolar"
                                  ? user?.totales?.dolar
                                  : user?.totales?.euro)
                            )}
                          </h1>
                        )}
                    </td>
                  </tr>
                )}
                {/* //todo ISLIVE */}
                {user?.islive && (
                  <tr className="bg-indigo-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <img
                        src="/clubIsLive.png"
                        alt="logo Club Islive"
                        className="w-32 h-10 rounded-xl"
                      />
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.islive && <h1>{user?.islive?.codigo}</h1>}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.islive && <h1>{user?.islive?.length || 1}</h1>}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.islive && <h1>Sin tokens</h1>}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.islive && (
                        <h1>
                          {Intl.NumberFormat("en-EU", {
                            style: "currency",
                            currency: "EUR",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user.islive.euros)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.islive && user?.totales?.euro && (
                        <h1>
                          {Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(
                            ((user?.islive?.euros *
                              user?.totales?.porcentajeFinal) /
                              100) *
                              user?.totales?.euro
                          )}
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/* //todo MONDO */}
                {user?.mondo && (
                  <tr className="bg-indigo-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="bg-black p-2 rounded-xl h-10 w-32 flex justify-center items-center">
                        <img
                          src="/logo-mondocamgirls.svg"
                          alt="logo mondo cam girls"
                          className=" rounded-xl h-20"
                        />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.mondo && <h1>{user?.mondo?.userName}</h1>}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.mondo && <h1>{user?.mondo?.length || 1}</h1>}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.mondo && <h1>Sin tokens</h1>}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.mondo && (
                        <h1>
                          {Intl.NumberFormat("en-EU", {
                            style: "currency",
                            currency: "EUR",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user.mondo.euros)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.mondo && user?.totales?.euro && (
                        <h1>
                          {Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(
                            ((user?.mondo?.euros *
                              user?.totales?.porcentajeFinal) /
                              100) *
                              user?.totales?.euro
                          )}
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
