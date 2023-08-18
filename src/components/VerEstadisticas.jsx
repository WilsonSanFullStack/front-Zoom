import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gpad, gad } from "../redux/actionAdult";
import { gam } from "../redux/actionAmateur.js";
import { gbo } from "../redux/actionBonga.js";
import { gca } from "../redux/actionCam4.js";
import { gch } from '../redux/actionChatur.js'
import { gdi } from '../redux/actionDirty.js'
import { gil } from '../redux/actionIsLive.js'
import { gse } from '../redux/actionSender.js'
import { gsk } from '../redux/actionSkype.js'
import { gst } from '../redux/actionStripchat.js'
import { gvx } from '../redux/actionVx.js'
import { gxl } from '../redux/actionXlove.js'
import { gxln } from '../redux/actionXloveNueva.js'


const CargarEstadisticas = () => {
  const dispatch = useDispatch();

  const coad = useSelector((state) => state.coad);    //corte adult
  const copad = useSelector((state) => state.copad);  //corte parcial adult
  const coam = useSelector((state) => state.coam);    //corte amateur
  const cobo = useSelector((state) => state.cobo);    //corte bonga
  const coca = useSelector((state) => state.coca);    //corte cam4 
  const coch = useSelector((state) => state.coch);    //corte chaturbate
  const codi = useSelector((state) => state.codi);    //corte dirty
  const coil = useSelector((state) => state.coil);    //corte islive
  const cose = useSelector((state) => state.cose);    //corte sender
  const cosk = useSelector((state) => state.cosk);    //corte skype
  const cost = useSelector((state) => state.cost);    //corte stripchat
  const covx = useSelector((state) => state.covx);    //corte vx
  const coxl = useSelector((state) => state.coxl);    //corte xlove
  const coxln = useSelector((state) => state.coxln);    //corte xlovenueva

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

  const tcoad = coad[0] && coad?.map((x) => x.creditos).reduce((x, y) => x + y).toFixed(2);
  const tcopad = copad[0] && copad?.map((x) => x.creditos).reduce((x, y) => x + y).toFixed(2);
  const tcoam = coam[0] && coam?.map((x) => x.dolares).reduce((x, y) => x + y).toFixed(2);
  const tcobo = cobo[0] && cobo?.map((x) => x.dolares).reduce((x, y) => x + y).toFixed(2);  //corte bonga
  const tcoca = coca[0] && coca?.map((x) => x.dolares).reduce((x, y) => x + y).toFixed(2);  //corte cam4 
  const tcoch = coch[0] && coch?.map((x) => x.dolares).reduce((x, y) => x + y).toFixed(2);  //corte chaturbate
  // const tcodie = codi[0] && codi?.map((x) => x.moneda === 'euro'? x.moneda: 0).reduce((x, y) => x + y).toFixed(2);  //corte dirty
  // const tcodid = codi[0] && codi?.map((x) => x.moneda === 'dolar'? x.moneda: 0).reduce((x, y) => x + y).toFixed(2);  //corte dirty
  const tcoil = coil[0] && coil?.map((x) => x.euros).reduce((x, y) => x + y).toFixed(2);  //corte islive
  const tcose = cose[0] && cose?.map((x) => x.euros).reduce((x, y) => x + y).toFixed(2);  //corte sender
  const tcosk = cosk[0] && cosk?.map((x) => x.dolares).reduce((x, y) => x + y).toFixed(2);  //corte skype
  const tcost = cost[0] && cosk?.map((x) => x.dolares).reduce((x, y) => x + y).toFixed(2);  //corte stripchat
  const tcovx = covx[0] && covx?.map((x) => x.euros).reduce((x, y) => x + y).toFixed(2);  //corte vx
  const tcoxl = coxl[0] && coxl?.map((x) => x.euros).reduce((x, y) => x + y).toFixed(2);  //corte xlove
  const tcoxln = coxln[0] && coxln?.map((x) => x.euros).reduce((x, y) => x + y).toFixed(2);   //corte xlovenueva

  return (
    <div className=" text-left ml-32 font-bold text-2xl">
      <p>tcoad : ${tcoad}</p>
      <p>tcopad: ${tcopad}</p>
      <p>tcoam : ${tcoam}</p>
      <p>tcobo : ${tcobo}</p>
      <p>tcoca : ${tcoca}</p>
      <p>tcoch : ${tcoch}</p>
      {/* <p>tcodie: ${tcodie}</p> */}
      {/* <p>tcodid: ${tcodid}</p> */}
      <p>tcoil : ${tcoil}</p>
      <p>tcose : ${tcose}</p>
      <p>tcosk : ${tcosk}</p>
      <p>tcost : ${tcost}</p>
      <p>tcovx : ${tcovx}</p>
      <p>tcoxl : ${tcoxl}</p>
      <p>tcoxln: ${tcoxln}</p>
      
    </div>
  );
};
export default CargarEstadisticas;
