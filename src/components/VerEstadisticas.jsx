import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gpad, gad } from "../redux/actions/paginas/adult.js";
import { gam } from "../redux/actions/paginas/amateur.js";
import { gbo } from "../redux/actions/paginas/bonga.js";
import { gca } from "../redux/actions/paginas/cam4.js";
import { gch } from "../redux/actions/paginas/chaturbate.js";
import { gdi } from "../redux/actions/paginas/dirty.js";
import { gil } from "../redux/actions/paginas/isLive.js";
import { gse } from "../redux/actions/paginas/sender.js";
import { gsk } from "../redux/actions/paginas/skype.js";
import { gst } from "../redux/actions/paginas/stripchat.js";
import { gvx } from "../redux/actions/paginas/vx.js";
import { gxl } from "../redux/actions/paginas/xlove.js";
import { gxln } from "../redux/actions/paginas/xloveNueva.js";

const CargarEstadisticas = () => {
  const dispatch = useDispatch();

  const coad = useSelector((state) => state.coad); //corte adult
  const copad = useSelector((state) => state.copad); //corte parcial adult
  const coam = useSelector((state) => state.coam); //corte amateur
  const cobo = useSelector((state) => state.cobo); //corte bonga
  const coca = useSelector((state) => state.coca); //corte cam4
  const coch = useSelector((state) => state.coch); //corte chaturbate
  const codi = useSelector((state) => state.codi); //corte dirty
  const coil = useSelector((state) => state.coil); //corte islive
  const cose = useSelector((state) => state.cose); //corte sender
  const cosk = useSelector((state) => state.cosk); //corte skype
  const cost = useSelector((state) => state.cost); //corte stripchat
  const covx = useSelector((state) => state.covx); //corte vx
  const coxl = useSelector((state) => state.coxl); //corte xlove
  const coxln = useSelector((state) => state.coxln); //corte xlovenueva

  useEffect(() => {
    dispatch(gad());
    dispatch(gpad());
    dispatch(gam());
    dispatch(gbo());
    dispatch(gca());
    dispatch(gch());
    dispatch(gdi());
    dispatch(gil());
    dispatch(gse());
    dispatch(gsk());
    dispatch(gst());
    dispatch(gvx());
    dispatch(gxl());
    dispatch(gxln());
  }, [dispatch]);

  const tcoad =
    coad[0] &&
    coad
      ?.map((x) => x.creditos)
      .reduce((x, y) => x + y)
      .toFixed(2);
  const tcopad =
    copad[0] &&
    copad
      ?.map((x) => x.creditos)
      .reduce((x, y) => x + y)
      .toFixed(2);
  const tcoam =
    coam[0] &&
    coam
      ?.map((x) => x.dolares)
      .reduce((x, y) => x + y)
      .toFixed(2);
  const tcobo =
    cobo[0] &&
    cobo
      ?.map((x) => x.dolares)
      .reduce((x, y) => x + y)
      .toFixed(2); //corte bonga
  const tcoca =
    coca[0] &&
    coca
      ?.map((x) => x.dolares)
      .reduce((x, y) => x + y)
      .toFixed(2); //corte cam4
  const tcoch =
    coch[0] &&
    coch
      ?.map((x) => x.dolares)
      .reduce((x, y) => x + y)
      .toFixed(2); //corte chaturbate
  // const tcodie = codi[0] && codi?.map((x) => x.moneda === 'euro'? x.moneda: 0).reduce((x, y) => x + y).toFixed(2);  //corte dirty
  // const tcodid = codi[0] && codi?.map((x) => x.moneda === 'dolar'? x.moneda: 0).reduce((x, y) => x + y).toFixed(2);  //corte dirty
  const tcoil =
    coil[0] &&
    coil
      ?.map((x) => x.euros)
      .reduce((x, y) => x + y)
      .toFixed(2); //corte islive
  const tcose =
    cose[0] &&
    cose
      ?.map((x) => x.euros)
      .reduce((x, y) => x + y)
      .toFixed(2); //corte sender
  const tcosk =
    cosk[0] &&
    cosk
      ?.map((x) => x.dolares)
      .reduce((x, y) => x + y)
      .toFixed(2); //corte skype
  const tcost =
    cost[0] &&
    cosk
      ?.map((x) => x.dolares)
      .reduce((x, y) => x + y)
      .toFixed(2); //corte stripchat
  const tcovx =
    covx[0] &&
    covx
      ?.map((x) => x.euros)
      .reduce((x, y) => x + y)
      .toFixed(2); //corte vx
  const tcoxl =
    coxl[0] &&
    coxl
      ?.map((x) => x.euros)
      .reduce((x, y) => x + y)
      .toFixed(2); //corte xlove
  const tcoxln =
    coxln[0] &&
    coxln
      ?.map((x) => x.euros)
      .reduce((x, y) => x + y)
      .toFixed(2); //corte xlovenueva

  return (
    <div className=" text-left  font-bold text-2xl grid grid-cols-3">
      <p className="totalpagina">Total Adult: ${tcoad}</p>
      <p className="totalpagina">Total Parcial: ${tcopad}</p>
      <p className="totalpagina">Total Amateur: ${tcoam}</p>
      <p className="totalpagina">Total Bonga: ${tcobo}</p>
      <p className="totalpagina">Total Cam4: ${tcoca}</p>
      <p className="totalpagina">Total Chaturbate: ${tcoch}</p>
      {/* <p>tcodie: ${tcodie}</p> */}
      {/* <p>tcodid: ${tcodid}</p> */}
      <p className="totalpagina">Total IsLive: ${tcoil}</p>
      <p className="totalpagina">Total Sender: ${tcose}</p>
      <p className="totalpagina">Total Skype: ${tcosk}</p>
      <p className="totalpagina">Total Stripchat: ${tcost}</p>
      <p className="totalpagina">Total Vx: ${tcovx}</p>
      <p className="totalpagina">Total Xlove: ${tcoxl}</p>
      <p className="totalpagina">Total XloveN: ${tcoxln}</p>
    </div>
  );
};
export default CargarEstadisticas;
