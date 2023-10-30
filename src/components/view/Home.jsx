import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Moneda from "../resource/Moneda.jsx";

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

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user);
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
  // console.log(quincenaMoneda);
  const [id, setId] = useState("");

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
  }, [dispatch]);

  useEffect(() => {
    id || id !== "" ? dispatch(getQuincenaMoneda(id)) : "";
    id || id !== "" ? dispatch(getQuincenaAdult(id)) : "";
    id || id !== "" ? dispatch(getQuincenaAmateur(id)) : "";
    id || id !== "" ? dispatch(getQuincenaBonga(id)) : "";
    id || id !== "" ? dispatch(getQuincenaCam4(id)) : "";
    id || id !== "" ? dispatch(getQuincenaChaturbate(id)) : "";
    id || id !== "" ? dispatch(getQuincenaDirty(id)) : "";
    id || id !== "" ? dispatch(getQuincenaIsLive(id)) : "";
    id || id !== "" ? dispatch(getQuincenaSender(id)) : "";
    id || id !== "" ? dispatch(getQuincenaSkype(id)) : "";
    id || id !== "" ? dispatch(getQuincenaStripchat(id)) : "";
    id || id !== "" ? dispatch(getQuincenaVx(id)) : "";
    id || id !== "" ? dispatch(getQuincenaXlove(id)) : "";
    id || id !== "" ? dispatch(getQuincenaXloveNueva(id)) : "";
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
      setId(quincenaActual?.id);
    }
  }, [quincenas]);

  const handleQuincena = (event) => {
    setId(event.target.value);
  };

  const creditos = quincenaAdult?.q_adult
    ?.reduce((x, y) => {
      return x + y.creditos;
    }, 0)
    .toFixed(2);
  console.log("creditos");
  console.log(creditos);

  const amateur = quincenaAmateur?.q_amateur
    ?.reduce((x, y) => {
      return x + y.dolares;
    }, 0)
    .toFixed(2);
  console.log("amateur");
  console.log(amateur);

  const bonga = quincenaBonga?.q_bonga
    ?.reduce((x, y) => {
      return x + y.dolares;
    }, 0)
    .toFixed(2);
  console.log("bonga");
  console.log(bonga);
  const cam4 = quincenaCam4?.q_cam4
    ?.reduce((x, y) => {
      return x + y.dolares;
    }, 0)
    .toFixed(2);
  console.log("cam4");
  console.log(cam4);
  const chaturbate = quincenaChaturbate?.q_chaturbate
    ?.reduce((x, y) => {
      return x + y.dolares;
    }, 0)
    .toFixed(2);
  console.log("chaturbate");
  console.log(chaturbate);
  const dirtyDolares = quincenaDirty?.q_dirty?.reduce((x, y) => {
    return y.moneda === "dolar" ? x + y.plata : x;
  }, 0);
  // .toFixed(2);
  console.log("dirtyDolares");
  console.log(dirtyDolares);
  const dirtyEuros = quincenaDirty?.q_dirty?.reduce((x, y) => {
    return y.moneda === "euro" ? x + y.plata : x;
  }, 0);
  // .toFixed(2);
  console.log("dirtyEuros");
  console.log(dirtyEuros);
  const isLive = quincenaIslive?.q_isLive
    ?.reduce((x, y) => {
      return x + y.euros;
    }, 0)
    .toFixed(2);
  console.log("isLive");
  console.log(isLive);
  const sender = quincenaSender?.q_sender
    ?.reduce((x, y) => {
      return x + y.euros;
    }, 0)
    .toFixed(2);
  console.log("sender");
  console.log(sender);
  const skype = quincenaSkype?.q_skype
    ?.reduce((x, y) => {
      return x + y.dolares;
    }, 0)
    .toFixed(2);
  const stripchat = quincenaStripchat?.q_stripchat
    ?.reduce((x, y) => {
      return x + y.dolares;
    }, 0)
    .toFixed(2);
  const vx = quincenaVx?.q_vx
    ?.reduce((x, y) => {
      return x + y.euros;
    }, 0)
    .toFixed(2);
  const xlove = quincenaXlove?.q_xlove
    ?.reduce((x, y) => {
      return x + y.euros;
    }, 0)
    .toFixed(2);

  const xloveNueva = quincenaXloveNueva?.q_xloveNueva
    ?.reduce((x, y) => {
      return x + y.euros;
    }, 0)
    .toFixed(2);
  const uniqueUserNames = new Set(); // Utilizamos un Set para almacenar nombres de usuario únicos
  quincenaAdult?.q_adult?.forEach((item) => {
    const userName = item.userName;
    uniqueUserNames.add(userName); // Agregamos cada nombre de usuario al Set
  });
  const uniqueUserNamesBonga = new Set(); // Utilizamos un Set para almacenar nombres de usuario únicos
  quincenaBonga?.q_bonga?.forEach((item) => {
    const userName = item.userName;
    uniqueUserNamesBonga.add(userName); // Agregamos cada nombre de usuario al Set
  });
  console.log(uniqueUserNamesBonga.size);

  const [showDetail, setShowDetail] = useState({
    Adult: false,
    Amateur: false,
    Bonga: false,
    Cam4: false,
    Chaturbate: false,
    DirtyEuros: false,
    DirtyDolares: false,
    IsLive: false,
    Sender: false,
    Skype: false,
    Stripchat: false,
    Vx: false,
    Xlove: false,
    XloveNueva: false,
  });
  const handleShowDetail = (selectedOption) => {
    // Crear una copia del estado actual
    const updatedShowDetail = { ...showDetail };

    // Verificar si la opción seleccionada ya está abierta
    if (updatedShowDetail[selectedOption]) {
      // Si ya está abierta, ocultarla
      updatedShowDetail[selectedOption] = false;
    } else {
      // Si no está abierta, abrir la opción seleccionada y cerrar las demás
      for (const option in updatedShowDetail) {
        updatedShowDetail[option] = option === selectedOption;
      }
    }

    // Actualizar el estado con las opciones modificadas
    setShowDetail(updatedShowDetail);
  };
  console.log(quincenaXloveNueva);

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

      {quincenaMoneda && quincenaMoneda.nombre ? (
        <Moneda quincena={quincenaMoneda} />
      ) : (
        <div className="loade1 m-auto my-2"></div>
      )}
      <div className="pb-28">
      <div className="mx-28 bg-indigo-300 p-2 rounded-2xl border-4 border-indigo-400">
        {/* //todo Adultregular */}
        <div
          className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-200"
          onClick={() => handleShowDetail("Adult")}
        >
          <section className="sectionPage sectionIconPage adult max-w-fit">
            <img src="/AWLogo_on.png" alt="Adult" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Modelos</h1>
            <h1>{uniqueUserNames.size}</h1>
          </section>
          <section className="sectionPage">
            <h1>Total Libras</h1>
            <h1>£ {Intl.NumberFormat("en-GB").format(creditos)}</h1>
          </section>

          <section className="">
            <h1>Total Pesos</h1>
            <h1>$ {Intl.NumberFormat("es-CP").format(creditos * libra)}</h1>
          </section>
        </div>

        {showDetail.Adult && (
          <div className="containerDetails">
            {quincenaAdult?.q_adult?.map((x) => {
              return (
                <section className="details" key={x.id}>
                  <h1>Corte De: </h1>
                  <h2 className="font-bold text-lx">{x.userName}</h2>
                  <h1>Libras: </h1> <h2>{x.creditos}</h2>
                  <h1>Tipo: </h1> <h2>{x.partical ? "Parcial" : "Regular"}</h2>
                  <h1>Fecha Adult: </h1> <h2>{x.fecha}</h2>
                </section>
              );
            })}
          </div>
        )}

        {/* //todo amateur  */}
        <div
          className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400"
          onClick={() => handleShowDetail("Amateur")}
        >
          <section className="sectionPage sectionIconPage bg-red-600 max-w-fit">
            <img src="/Amateur.png" alt="Amateur" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Modelos</h1>
            <h1>{quincenaAmateur?.q_amateur?.length}</h1>
          </section>

          <section className="sectionPage">
            <h1>Total Dolares</h1>
            <h1>$ {Intl.NumberFormat("en-US").format(amateur)}</h1>
          </section>

          <section className="">
            <h1>Total Pesos</h1>
            <h1>$ {Intl.NumberFormat("es-CP").format(amateur * dolar)}</h1>
          </section>
        </div>

        {showDetail.Amateur && (
          <div className="containerDetails">
            {quincenaAmateur?.q_amateur?.map((x) => {
              return (
                <section className="details" key={x.id}>
                  <h1>Modelo</h1> <h2>{x.userName}</h2>
                  <h1>tokens</h1> <h2>{x.tokens}</h2>
                  <h1>Dolares</h1> <h2>{x.dolares}</h2>
                </section>
              );
            })}
          </div>
        )}
        {/* //todo Bonga  */}
        <div
          className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-200"
          onClick={() => handleShowDetail("Bonga")}
        >
          <section className="sectionPage sectionIconPage max-w-fit">
            <img src="/bonga.jpeg" alt="bonga" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Modelos</h1>
            <h1>{uniqueUserNamesBonga.size}</h1>
          </section>

          <section className="sectionPage">
            <h1>Total Dolares</h1>
            <h1>$ {Intl.NumberFormat("en-US").format(bonga)}</h1>
          </section>

          <section className="">
            <h1>Total Pesos</h1>
            <h1>$ {Intl.NumberFormat("es-CP").format(bonga * dolar)}</h1>
          </section>
        </div>

        {showDetail.Bonga && (
          <div className="containerDetails">
            {quincenaBonga?.q_bonga?.map((x) => {
              return (
                <section className="details" key={x.id}>
                  <h1> Modelo</h1> <h2>{x.userName}</h2>
                  <h1>Dolares</h1> <h2>{x.dolares}</h2>
                  <h1>Fecha Bonga</h1> <h2>{x.fecha}</h2>
                </section>
              );
            })}
          </div>
        )}
        {/* //todo Cam4  */}
        <div
          className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400"
          onClick={() => handleShowDetail("Cam4")}
        >
          <section className="sectionPage sectionIconPage bg-black max-w-fit">
            <img src="/Cam4.png" alt="Cam4" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>MOdelos</h1>
            <h1>{quincenaCam4?.q_cam4?.length}</h1>
          </section>

          <section className="sectionPage">
            <h1>Total Dolares</h1>
            <h1>$ {Intl.NumberFormat("en-US").format(cam4)}</h1>
          </section>

          <section className="">
            <h1>Total Pesos</h1>
            <h1>$ {Intl.NumberFormat("es-CP").format(cam4 * dolar)}</h1>
          </section>
        </div>

        {showDetail.Cam4 && (
          <div className="containerDetails">
            {quincenaCam4?.q_cam4?.map((x) => {
              return (
                <section className="details" key={x.id}>
                  <h1>Modelo</h1> <h2>{x.userName}</h2>
                  <h1>Dolares</h1> <h2>{x.dolares}</h2>
                </section>
              );
            })}
          </div>
        )}

        {/* //todo Chaturbate  */}
        <div
          className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-200"
          onClick={() => handleShowDetail("Chaturbate")}
        >
          <section className="sectionPage sectionIconPage bg-slate-200 max-w-fit">
            <img
              src="/Chaturbate_logo.svg"
              alt="Chaturbate"
              className="iconPage"
            />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Modelos</h1>
            <h1>{quincenaChaturbate?.q_chaturbate?.length}</h1>
          </section>

          <section className="sectionPage">
            <h1>Total Dolares</h1>
            <h1>$ {Intl.NumberFormat("en-US").format(chaturbate)}</h1>
          </section>

          <section className="">
            <h1>Total Pesos</h1>
            <h1>$ {Intl.NumberFormat("es-CP").format(chaturbate * dolar)}</h1>
          </section>
        </div>

        {showDetail.Chaturbate && (
          <div className="containerDetails">
            {quincenaChaturbate?.q_chaturbate?.map((x) => {
              return (
                <section className="details" key={x.id}>
                  <h1>Modelo</h1> <h2>{x.userName}</h2>
                  <h1>Tokens</h1> <h2>{x.tokens}</h2>
                  <h1>Dolares</h1> <h2>{x.dolares}</h2>
                </section>
              );
            })}
          </div>
        )}

        {/* //todo dirty euros */}
        <div
          className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400"
          onClick={() => handleShowDetail("DirtyEuros")}
        >
          <section className="sectionPage sectionIconPage bg-stone-900 max-w-fit">
            <img src="/mydirty.png" alt="Dirty" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Modelos</h1>
            <h1>
              {
                quincenaDirty?.q_dirty?.filter((x) => x.moneda === "euro")
                  .length
              }
            </h1>
          </section>

          <section className="sectionPage">
            <h1>Total Euros</h1>
            <h1>$ {Intl.NumberFormat("en-US").format(dirtyEuros)}</h1>
          </section>

          <section className="">
            <h1>Total Pesos</h1>
            <h1>$ {Intl.NumberFormat("es-CP").format(dirtyEuros * euro)}</h1>
          </section>
        </div>

        {showDetail.DirtyEuros && (
          <div className="containerDetails">
            {quincenaDirty?.q_dirty?.map((x) => {
              if (x.moneda === "euro") {
                return (
                  <section className="details" key={x.id}>
                    <h1>Modelo</h1> <h2>{x.userName}</h2>
                    <h1>Moneda</h1> <h2>{x.moneda}</h2>
                    <h1>Euros</h1> <h1>{x.plata}</h1>
                  </section>
                );
              }
            })}
          </div>
        )}

        {/* //todo dirty  dolares*/}
        <div
          className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400"
          onClick={() => handleShowDetail("DirtyDolares")}
        >
          <section className="sectionPage sectionIconPage bg-stone-900 max-w-fit">
            <img src="/mydirty.png" alt="Dirty" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Modelos</h1>
            <h1>
              {
                quincenaDirty?.q_dirty?.filter((x) => x.moneda === "dolar")
                  .length
              }
            </h1>
          </section>

          <section className="sectionPage">
            <h1>Total Dolares</h1>
            <h1>$ {Intl.NumberFormat("en-US").format(dirtyDolares)}</h1>
          </section>

          <section className="">
            <h1>Total Pesos</h1>
            <h1>$ {Intl.NumberFormat("es-CP").format(dirtyDolares * dolar)}</h1>
          </section>
        </div>

        {showDetail.DirtyDolares && (
          <div className="containerDetails">
            {quincenaDirty?.q_dirty?.map((x) => {
              if (x.moneda === "dolar") {
                return (
                  <section className="details" key={x.id}>
                    <h1>Modelo</h1> <h2>{x.userName}</h2>
                    <h1>Moneda</h1> <h2>{x.moneda}</h2>
                    <h1>Dolares</h1> <h1>{x.plata}</h1>
                  </section>
                );
              }
            })}
          </div>
        )}

        {/* //todo islive  */}
        <div
          className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-200"
          onClick={() => handleShowDetail("IsLive")}
        >
          <section className="sectionPage sectionIconPage max-w-fit">
            <img src="/clubIsLive.png" alt="Islive" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Modelos</h1>
            <h1>{quincenaIslive?.q_isLive?.length}</h1>
          </section>

          <section className="sectionPage">
            <h1>Total Euros</h1>
            <h1>$ {Intl.NumberFormat("en-US").format(isLive)}</h1>
          </section>

          <section className="">
            <h1>Total Pesos</h1>
            <h1>$ {Intl.NumberFormat("es-CP").format(isLive * euro)}</h1>
          </section>
        </div>

        {showDetail.IsLive && (
          <div className="containerDetails">
            {quincenaIslive?.q_isLive?.map((x) => {
              return (
                <section className="details" key={x.id}>
                  <h1>Modelo</h1> <h2>{x.codigo}</h2>
                  <h1>Euros</h1> <h2>{x.euros}</h2>
                </section>
              );
            })}
          </div>
        )}

        {/* //todo Sender  */}
        <div
          className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400"
          onClick={() => handleShowDetail("Sender")}
        >
          <section className="sectionPage sectionIconPage bg-black max-w-fit">
            <img src="/livestrip.webp" alt="Sender" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Modelos</h1>
            <h1>{quincenaSender?.q_sender?.length}</h1>
          </section>

          <section className="sectionPage">
            <h1>Total Euro</h1>
            <h1>$ {Intl.NumberFormat("en-US").format(sender)}</h1>
          </section>

          <section className="">
            <h1>Total Pesos</h1>
            <h1>$ {Intl.NumberFormat("es-CP").format(sender * euro)}</h1>
          </section>
        </div>

        {showDetail.Sender && (
          <div className="containerDetails">
            {quincenaSender?.q_sender?.map((x) => {
              return (
                <section className="details" key={x.id}>
                  <h1>Modelo</h1> <h2>{x.userName}</h2>
                  <h1>Coins</h1> <h2>{x.coins}</h2>
                  <h1>Euros</h1> <h2>{x.euros}</h2>
                  <h1>Time On</h1> <h1>{x.fecha}</h1>
                </section>
              );
            })}
          </div>
        )}

        {/* //todo Skype   */}
        <div
          className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-200"
          onClick={() => handleShowDetail("Skype")}
        >
          <section className="sectionPage sectionIconPage bg-white max-w-fit">
            <img src="/Skype.webp" alt="Skype" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Modelos</h1>
            <h1>{quincenaSkype?.q_skype?.length}</h1>
          </section>

          <section className="sectionPage">
            <h1>Total Dolares</h1>
            <h1>$ {Intl.NumberFormat("en-US").format(skype)}</h1>
          </section>

          <section className="">
            <h1>Total Pesos</h1>
            <h1>$ {Intl.NumberFormat("es-CP").format(skype * dolar)}</h1>
          </section>
        </div>

        {showDetail.Skype && (
          <div className="containerDetails">
            {quincenaSkype?.q_skype?.map((x) => {
              return (
                <section className="details" key={x.id}>
                  <h1>Modelo</h1> <h2>{x.userName}</h2>
                  <h1>Dolares</h1> <h2>{x.dolares}</h2>
                </section>
              );
            })}
          </div>
        )}
        {/* //todo Stripchat   */}
        <div
          className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400"
          onClick={() => handleShowDetail("Stripchat")}
        >
          <section className="sectionPage sectionIconPage bg-white max-w-fit">
            <img src="/stripchat.png" alt="Stripchat" className="w-14 mx-7" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Modelos</h1>
            <h1>{quincenaStripchat?.q_stripchat?.length}</h1>
          </section>

          <section className="sectionPage">
            <h1>Total Dolares</h1>
            <h1>$ {Intl.NumberFormat("en-US").format(stripchat)}</h1>
          </section>

          <section className="">
            <h1>Total Pesos</h1>
            <h1>$ {Intl.NumberFormat("es-CP").format(stripchat * dolar)}</h1>
          </section>
        </div>

        {showDetail.Stripchat && (
          <div className="containerDetails">
            {quincenaStripchat?.q_stripchat?.map((x) => {
              return (
                <section className="details" key={x.id}>
                  <h1>Modelo</h1> <h2>{x.userName}</h2>
                  <h1>Tokens</h1> <h2>{x.tokens}</h2>
                  <h1>Dolares</h1> <h2>{x.dolares}</h2>
                </section>
              );
            })}
          </div>
        )}

        {/* //todo Vx   */}
        <div
          className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-200"
          onClick={() => handleShowDetail("Vx")}
        >
          <section className="sectionPage sectionIconPage bg-black max-w-fit">
            <img src="/VxMaster.svg" alt="Vx" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Modelos</h1>
            <h1>{quincenaVx?.q_vx?.length}</h1>
          </section>

          <section className="sectionPage">
            <h1>Total Dolares</h1>
            <h1>$ {Intl.NumberFormat("en-US").format(vx)}</h1>
          </section>

          <section className="">
            <h1>Total Pesos</h1>
            <h1>$ {Intl.NumberFormat("es-CP").format(vx * dolar)}</h1>
          </section>
        </div>

        {showDetail.Vx && (
          <div className="containerDetails">
            {quincenaVx?.q_vx?.map((x) => {
              return (
                <section className="details" key={x.id}>
                  <h1>Modelo</h1> <h2>{x.userName}</h2>
                  <h1>Euros</h1> <h2>{x.euros}</h2>
                </section>
              );
            })}
          </div>
        )}

        {/* //todo xlove   */}
        <div
          className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400"
          onClick={() => handleShowDetail("Xlove")}
        >
          <section className="sectionPage sectionIconPage bg-red-800 max-w-fit">
            <img src="/xlove.png" alt="Xlove" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Modelos</h1>
            <h1>{quincenaXlove?.q_xlove?.length}</h1>
          </section>

          <section className="sectionPage">
            <h1>Total Euro</h1>
            <h1>$ {Intl.NumberFormat("en-US").format(xlove)}</h1>
          </section>

          <section className="">
            <h1>Total Pesos</h1>
            <h1>$ {Intl.NumberFormat("es-CP").format(xlove * euro)}</h1>
          </section>
        </div>

        {showDetail.Xlove && (
          <div className="containerDetails">
            {quincenaXlove?.q_xlove?.map((x) => {
              return (
                <section className="details" key={x.id}>
                  <h1>Modelo</h1> <h2>{x.userName}</h2>
                  <h1>Euros</h1> <h2>{x.euros}</h2>
                </section>
              );
            })}
          </div>
        )}
        {/* //todo xlove Nueva  */}
        <div
          className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400"
          onClick={() => handleShowDetail("XloveNueva")}
        >
          <section className="sectionPage sectionIconPage bg-red-800 max-w-fit">
            <img src="/xlove.png" alt="Xlove" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Modelos</h1>
            <h1>{quincenaXloveNueva?.q_xloveNueva?.length}</h1>
          </section>

          <section className="sectionPage">
            <h1>Total Euro</h1>
            <h1>$ {Intl.NumberFormat("en-US").format(xloveNueva)}</h1>
          </section>

          <section className="">
            <h1>Total Pesos</h1>
            <h1>$ {Intl.NumberFormat("es-CP").format(xloveNueva * euro)}</h1>
          </section>
        </div>

        {showDetail.XloveNueva && (
          <div className="containerDetails">
            {quincenaXloveNueva?.q_xloveNueva?.map((x) => {
              return (
                <section className="details" key={x.id}>
                  <h1>Modelo</h1> <h2>{x.userName}</h2>
                  <h1>Euros</h1> <h2>{x.euros}</h2>
                  <h1>Fecha Corte</h1> <h2>{x.fecha}</h2>
                </section>
              );
            })}
          </div>
        )}
        {/* //todo islive 
      <div className="grid grid-cols-5 border-2 border-indigo-500 mx-4 my-1">
        <section className="sectionPage sectionIconPage bg-red-600 max-w-fit">
          <img src="/Amateur.png" alt="Amateur" className="iconPage" />
        </section>
<section></section>
        <section className="sectionPage">
          <h1>Usuarios</h1>
          <h1>{quincena?.q_amateur?.length}</h1>
        </section>

        <section className="sectionPage">
          <h1>Total Dolares</h1>
          <h1>$ {Intl.NumberFormat("en-US").format(amateur)}</h1>
        </section>

        <section className="">
          <h1>Total Pesos</h1>
          <h1>$ {Intl.NumberFormat("es-CP").format(amateur * dolar)}</h1>
        </section>
      </div>
//todo islive 
      <div className="grid grid-cols-5 border-2 border-indigo-500 mx-4 my-1">
        <section className="sectionPage sectionIconPage bg-red-600 max-w-fit">
          <img src="/Amateur.png" alt="Amateur" className="iconPage" />
        </section>
<section></section>
        <section className="sectionPage">
          <h1>Usuarios</h1>
          <h1>{quincena?.q_amateur?.length}</h1>
        </section>

        <section className="sectionPage">
          <h1>Total Dolares</h1>
          <h1>$ {Intl.NumberFormat("en-US").format(amateur)}</h1>
        </section>

        <section className="">
          <h1>Total Pesos</h1>
          <h1>$ {Intl.NumberFormat("es-CP").format(amateur * dolar)}</h1>
        </section>
      </div> */}
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
          <h1>£ {Intl.NumberFormat("en-GB").format(creditos)}</h1>
        </section>
        <section className="sectionPage">
          <h1 className="border-b-2 border-indigo-500">Total Euro</h1>
          <h1>
            €{" "}
            {Intl.NumberFormat("es-ES").format(
              parseFloat(dirtyEuros + isLive + sender + vx + xlove + xloveNueva)
            )}
          </h1>
        </section>
        <section className="sectionPage">
          <h1 className="border-b-2 border-indigo-500">Total Dolares</h1>
          <h1>
            ${" "}
            {Intl.NumberFormat("en-US").format(
              parseFloat(
                amateur +
                  bonga +
                  cam4 +
                  chaturbate +
                  dirtyDolares +
                  skype +
                  stripchat
              )
            )}
          </h1>
        </section>

        <section className=" min-w-fit">
          <h1 className="border-b-2 border-indigo-500">Total Pesos</h1>
          <h1>
            ${" "}
            {Intl.NumberFormat("es-CP").format(
              parseFloat(
                amateur +
                  bonga +
                  cam4 +
                  chaturbate +
                  dirtyDolares +
                  skype +
                  stripchat
              ) *
                dolar +
                parseFloat(
                  dirtyEuros + isLive + sender + vx + xlove + xloveNueva
                ) *
                  euro +
                parseFloat(creditos) * libra
            )}
          </h1>
        </section>
      </div>
      {/*  */}
    </div>
    </div>
  );
};
export default Home;
