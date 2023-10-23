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
console.log(quincenaMoneda)
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
    // setTimeout(() => {
      dispatch(getQuincenaAdult(id));
      dispatch(getQuincenaAmateur(id));
      dispatch(getQuincenaBonga(id));
      dispatch(getQuincenaCam4(id));
      dispatch(getQuincenaChaturbate(id));
      dispatch(getQuincenaDirty(id));
      dispatch(getQuincenaIsLive(id));
      dispatch(getQuincenaSender(id));
      dispatch(getQuincenaSkype(id));
      dispatch(getQuincenaStripchat(id));
      dispatch(getQuincenaVx(id));
      dispatch(getQuincenaXlove(id));
      dispatch(getQuincenaXloveNueva(id));
    // }, 5000);
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

  let creditos = quincenaAdult?.q_adult
    ?.reduce((x, y) => {
      return x + y.creditos;
    }, 0)
    .toFixed(2);

  const amateur = quincenaAmateur?.q_amateur
    ?.reduce((x, y) => {
      return x + y.dolares;
    }, 0)
    .toFixed(2);

  const tokensAmateur = quincenaAmateur?.q_amateur?.reduce((x, y) => {
    return x + y.tokens;
  }, 0);
  const bonga = quincenaBonga?.q_bonga
    ?.reduce((x, y) => {
      return x + y.dolares;
    }, 0)
    .toFixed(2);
  const cam4 = quincenaCam4?.q_cam4
    ?.reduce((x, y) => {
      return x + y.dolares;
    }, 0)
    .toFixed(2);
  const chaturbate = quincenaChaturbate?.q_chaturbate
    ?.reduce((x, y) => {
      return x + y.dolares;
    }, 0)
    .toFixed(2);
  const dirtyDolares = quincenaDirty?.q_dirty?.reduce((x, y) => {
    if (y.moneda === "dolar") return x + y.plata;
  }, 0);
  // .toFixed(2);
  const dirtyEuros = quincenaDirty?.q_dirty?.reduce((x, y) => {
    if (y.moneda === "euro") return x + y.plata;
  }, 0);
  // .toFixed(2);
  const isLive = quincenaIslive?.q_isLive
    ?.reduce((x, y) => {
      return x + y.euros;
    }, 0)
    .toFixed(2);
  const sender = quincenaSender?.q_sender
    ?.reduce((x, y) => {
      return x + y.euros;
    }, 0)
    .toFixed(2);
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
      return x + y.dolares;
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

  // console.log(quincena);
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
      <div className="mx-28 bg-indigo-300 p-2 rounded-2xl border-4 border-indigo-400">
        {/* //todo Adultregular */}
        <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-200">
          <section className="sectionPage sectionIconPage adult max-w-fit">
            <img src="/AWLogo_on.png" alt="Adult" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Cortes</h1>
            <h1>{quincenaAdult?.q_adult?.length}</h1>
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
        {/* //todo amateur  */}
        <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400">
          <section className="sectionPage sectionIconPage bg-red-600 max-w-fit">
            <img src="/Amateur.png" alt="Amateur" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Usuarios</h1>
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
        {/* //todo Bonga  */}
        <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-200">
          <section className="sectionPage sectionIconPage max-w-fit">
            <img src="/bonga.jpeg" alt="bonga" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Usuarios</h1>
            <h1>{quincenaBonga?.q_bonga?.length}</h1>
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
        {/* //todo Cam4  */}
        <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400">
          <section className="sectionPage sectionIconPage bg-black max-w-fit">
            <img src="/Cam4.png" alt="Cam4" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Usuarios</h1>
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
        {/* //todo Chaturbate  */}
        <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-200">
          <section className="sectionPage sectionIconPage bg-slate-200 max-w-fit">
            <img
              src="/Chaturbate_logo.svg"
              alt="Chaturbate"
              className="iconPage"
            />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Usuarios</h1>
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
        {/* //todo dirty euros */}
        <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400">
          <section className="sectionPage sectionIconPage bg-stone-900 max-w-fit">
            <img src="/mydirty.png" alt="Dirty" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Usuarios</h1>
            <h1>{quincenaDirty?.q_dirty?.length}</h1>
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
        {/* //todo dirty  dolares*/}
        <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400">
          <section className="sectionPage sectionIconPage bg-stone-900 max-w-fit">
            <img src="/mydirty.png" alt="Dirty" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Usuarios</h1>
            <h1>{quincenaDirty?.q_dirty?.length}</h1>
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
        {/* //todo islive  */}
        <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-200">
          <section className="sectionPage sectionIconPage max-w-fit">
            <img src="/clubIsLive.png" alt="Islive" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Usuarios</h1>
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
        {/* //todo Sender  */}
        <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400">
          <section className="sectionPage sectionIconPage bg-black max-w-fit">
            <img src="/livestrip.webp" alt="Sender" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Usuarios</h1>
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
        {/* //todo Skype   */}
        <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-200">
          <section className="sectionPage sectionIconPage bg-white max-w-fit">
            <img src="/Skype.webp" alt="Skype" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Usuarios</h1>
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
        {/* //todo Stripchat   */}
        <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400">
          <section className="sectionPage sectionIconPage bg-white max-w-fit">
            <img src="/stripchat.png" alt="Stripchat" className="w-14 mx-7" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Usuarios</h1>
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
        {/* //todo Vx   */}
        <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-200">
          <section className="sectionPage sectionIconPage bg-black max-w-fit">
            <img src="/VxMaster.jpg" alt="Vx" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Usuarios</h1>
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
        {/* //todo xlove   */}
        <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400">
          <section className="sectionPage sectionIconPage bg-red-800 max-w-fit">
            <img src="/xlove.png" alt="Xlove" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Usuarios</h1>
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
        {/* //todo xlove Nueva  */}
        <div className="grid grid-cols-4 border-2 border-indigo-500 mx-4 my-1 max-w-screen-lg bg-indigo-400">
          <section className="sectionPage sectionIconPage bg-red-800 max-w-fit">
            <img src="/xlove.png" alt="Xlove" className="iconPage" />
          </section>
          {/* <section></section> */}
          <section className="sectionPage">
            <h1>Usuarios</h1>
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
      <div className="flex justify-between item-center font-bold border-4 border-indigo-600 m-2">
        <section className="min-w-fit my-auto mx-4 text-center">
          <h1 className="font-bold text-4xl text-center">TOTAL:</h1>
        </section>

        <section className=" flex justify-between item-center">
          <section className="mx-4">
            <h1>Total Dolares</h1>
            <h1>
              {Intl.NumberFormat("es-ES").format(bonga + chaturbate + cam4)}
            </h1>
          </section>
          <section className=" mx-4">
            <h1>Total Euros</h1>
            <h1>
              {Intl.NumberFormat("es-US").format(
                sender + xlove + xloveNueva + isLive
              )}
            </h1>
          </section>
          <section className="mx-4">
            <h1>Total Libras</h1>
            <h1>{Intl.NumberFormat("es-GB").format(creditos)}</h1>
          </section>
        </section>
        <section className="mx-20 text-2xl">
          <h1>Total Pesos</h1>
          <h1>
            {Intl.NumberFormat("es-CP").format(
              creditos * libra +
                amateur * dolar +
                bonga * dolar +
                cam4 * dolar +
                chaturbate * dolar
            )}
          </h1>
        </section>
      </div>
    </div>
  );
};
export default Home;
