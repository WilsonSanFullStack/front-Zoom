import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Moneda from "../resource/Moneda.jsx";

import { resetError } from "../../redux/actions/resetError.js";
import {
  getAllQuincena,
  searchAllUserByFortnight,
} from "../../redux/actions/registro/registerQuincena.js";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quincenas = useSelector((state) => state.quincenas);
  const quincenaHome = useSelector((state) => state.quincenaHome);
  console.log(quincenaHome);

  const [id, setId] = useState("");

  const dolar = quincenaHome?.moneda?.monedas?.map((x) => {
    return x.dolar;
  });
  const euro = quincenaHome?.moneda?.monedas?.map((x) => {
    return x.euro;
  });

  const libra = quincenaHome?.moneda?.monedas?.map((x) => {
    return x.libra;
  });

  useEffect(() => {
    dispatch(resetError());
  }, [id]);

  useEffect(() => {
    dispatch(getAllQuincena());
  }, [dispatch]);

  useEffect(() => {
    id || id !== "" ? dispatch(searchAllUserByFortnight(id)) : "";
    // dispatch(resetError());
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

      const fechaFinal = new Date(añoFinal, mesFinal, diaFinal, 23, 59, 59);

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
  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const handleShow = () => (show ? (setShow(false), setShowDetail(false)) : setShow(true));
  const handleShowDetail = () =>
    showDetail ? setShowDetail(false) : setShowDetail(true) || !show?setShowDetail(false):showDetail;
  const rojos = [];
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

      {quincenaHome && quincenaHome.moneda ? (
        <Moneda quincena={quincenaHome.moneda} />
      ) : (
        <div className="loade1 m-auto my-2"></div>
      )}
      <div className="pb-28">
        <div className="mx-2 bg-indigo-300 p-2 rounded-2xl border-4 border-indigo-400">
          <div>
            {quincenaHome?.modelos?.map((x) => {
              const cp =
                (x?.adultworkTotal?.creditos || 0) +
                (x?.adultworkParcial?.creditos || 0) +
                (x?.amateur?.dolares || 0) +
                (x?.bongaTotal?.dolares || 0) +
                (x?.cam4?.dolares || 0) +
                (x?.chaturbate?.dolares || 0) +
                (x?.dirty?.plata || 0) +
                (x?.islive?.euros || 0) +
                (x?.mondo?.euros || 0) +
                (x?.myfreecams?.dolares || 0) +
                (x?.sakura?.dolares || 0) +
                (x?.sender?.euros - x?.senderAnterior?.euros
                  ? x?.sender?.euros - x?.senderAnterior?.euros
                  : "" || 0) +
                (x?.skype?.dolares || 0) +
                (x?.streamate?.dolares || 0) +
                (x?.streamray?.dolares || 0) +
                (x?.stripchat?.dolares || 0) +
                (x?.vx?.euros || 0) +
                (x?.xlove?.euros || 0) +
                (x?.xlovenueva?.euros || 0) +
                (x?.siete?.euros || 0);
              console.log(cp);
              const porcentaje =
                cp >= x?.porcentaje?.meta
                  ? x?.porcentaje?.final
                  : x?.porcentaje?.inical;

              const totalPesos = (
                ((((x?.adultworkTotal?.creditos || 0) +
                  (x?.adultworkParcial?.creditos || 0)) *
                  porcentaje) /
                  100) *
                  libra +
                ((((x?.dirty?.moneda === "euro" ? x?.dirty?.plata || 0 : 0) +
                  (x?.islive?.euros || 0) +
                  (x?.mondo?.euros || 0) +
                  (x?.sender?.euros - x?.senderAnterior?.euros
                    ? x?.sender?.euros - x?.senderAnterior?.euros
                    : "" || 0) +
                  (x?.vx?.euros || 0) +
                  (x?.xlove?.euros || 0) +
                  (x?.xlovenueva?.euros || 0) +
                  (x?.siete?.euros || 0)) *
                  porcentaje) /
                  100) *
                  euro +
                ((((x?.amateur?.dolares || 0) +
                  (x?.bongaTotal?.dolares || 0) +
                  (x?.cam4?.dolares || 0) +
                  (x?.chaturbate?.dolares || 0) +
                  (x?.dirty?.moneda === "dolar" ? x?.dirty?.plata || 0 : 0) +
                  (x?.myfreecams?.dolares || 0) +
                  (x?.sakura?.dolares || 0) +
                  (x?.skype?.dolares || 0) +
                  (x?.streamate?.dolares || 0) +
                  (x?.streamray?.dolares || 0) +
                  (x?.stripchat?.dolares || 0)) *
                  porcentaje) /
                  100) *
                  dolar
              ).toFixed(2);
              const gastos = 15000000;
              const saldo = -totalPesos - gastos;
              saldo < 0
                ? rojos.push({ id: x?.id, rojo: saldo, quincena: id })
                : "";
              console.log(rojos);

              if (x?.userNamePage.length)
              return (
                <div key={x.id} className="divPageContainer">
                  <h1 className="text-2xl font-bold">
                    {x.nombre} {x.apellido}
                  </h1>
                  <section className="porcentaje" onClick={() => handleShow()}>
                    <section className="pt-2">
                      <h1>Nombre</h1>
                      {x?.porcentaje && (
                        <h1 className="">{x?.porcentaje?.nombre}</h1>
                      )}
                    </section>
                    <section className="pt-2">
                      <h1>Meta: </h1>
                      {x?.porcentaje && <h1>{x?.porcentaje?.meta} creditos</h1>}
                    </section>

                    <section className="pt-2">
                      <h1>Total Creditos</h1>
                      {cp && <h1>{cp.toFixed(2)}</h1>}
                    </section>

                    <section className="pt-2">
                      <h1>Porcentaje: </h1>
                      {x?.porcentaje && <h1 className="">{porcentaje}%</h1>}
                    </section>
                    <section className="pt-2">
                      <h1>Total Gastos</h1>
                      {cp && (
                        <h1>$ {Intl.NumberFormat("es-CP").format(gastos)}</h1>
                      )}
                    </section>
                    <section className="pt-2">
                      <h1>Total Pesos: </h1>
                      {cp && (
                        <h1>{Intl.NumberFormat("en-GB").format(totalPesos)}</h1>
                      )}
                    </section>
                    <section
                      className={saldo > 0 ? "saldoPositivo" : "saldoRojo"}
                    >
                      <h1>Saldo</h1>
                      {cp && (
                        <h1>{Intl.NumberFormat("es-CP").format(saldo)}</h1>
                      )}
                    </section>
                  </section>

                  {show && (
                    <div
                      className="divPages"
                      onClick={() => handleShowDetail()}
                    >
                      {x?.adultworkTotal && (
                        <section className="sectionPage1">
                          <h1>Adultwork</h1>
                          <h1>Libras</h1>{" "}
                          <h2>{x?.adultworkTotal?.creditos.toFixed(2)}</h2>
                        </section>
                      )}

                      {x?.awParcial && (
                        <section className="sectionPage1">
                          <h1>AW Parcial</h1>
                          <h1>Libras</h1>{" "}
                          <h2>{x?.adultworkParcial?.creditos.toFixed(2)}</h2>
                        </section>
                      )}

                      {x?.amateur && (
                        <section className="sectionPage1">
                          <h1>Amateur</h1>
                          <section className="sectionPage2">
                            <section>
                              <h1>dolares</h1> <h2>{x?.amateur?.dolares}</h2>
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
                              <h1>Tokens </h1> <h2>{x?.chaturbate?.tokens}</h2>
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
                            {x?.dirty?.moneda === "euro" ? "Euros" : "Dolar"}
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

                      {x?.myfreecams && (
                        <section className="sectionPage1">
                          <h1>My Free Cams</h1>
                          <section className="sectionPage2">
                            <section>
                              <h1>Dolares</h1> <h2>{x?.myfreecams?.dolares}</h2>
                            </section>
                            <section>
                              <h1>Tokens</h1> <h2>{x?.myfreecams?.tokens}</h2>
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
                            {x?.sender?.euros - x?.senderAnterior?.euros
                              ? x?.sender?.euros - x?.senderAnterior?.euros
                              : ""}
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

                      {x?.streamray && (
                        <section className="sectionPage1">
                          <h1>StreamRay</h1>
                          <h1>Dolares</h1> <h2>{x?.streamray?.dolares}</h2>
                        </section>
                      )}

                      {x?.stripchat && (
                        <section className="sectionPage1">
                          <h1>Stripchat</h1>
                          <section className="sectionPage2">
                            <section>
                              <h1>Dolares</h1> <h2>{x?.stripchat?.dolares}</h2>
                            </section>
                            <section>
                              <h1>Tokens</h1> <h2>{x?.stripchat?.tokens}</h2>
                            </section>
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

                      {x?.siete && (
                        <section className="sectionPage1">
                          <h1>777</h1>
                          <section>
                            <h1>Euros</h1> <h2>{x?.siete?.euros}</h2>
                          </section>
                          <section>
                            <h1>Fecha</h1> <h2>{x?.xlovenueva?.fecha}</h2>
                          </section>
                        </section>
                      )}
                    </div>
                  )}
                  {showDetail && (
                    <div className="grid grid-cols-3">
                      {x?.adultwork?.map((detalle) => {
                        return (
                          <section key={detalle?.id}>
                            <h1>UserName:</h1> <h2>{detalle?.userName}</h2>
                            <h1>Libras:</h1> <h2>{detalle?.creditos}</h2>
                            <h1>Tipo:</h1>{" "}
                            <h2>{detalle?.parcial ? "Parcial" : "Regular"}</h2>
                            <h1>Fecha Adultwork</h1> <h2>{detalle?.fecha}</h2>
                          </section>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
