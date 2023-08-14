import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gpad, gad } from "../redux/actionAdult";
import { gbo } from "../redux/actionBonga";
import { gch } from "../redux/actionChatur";
import { gse } from "../redux/actionSender";
// import { gs } from '../redux/'

import Adultcorte from "./MostrarCreditos/Adultcorte";

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


  console.log(ca);
  useEffect(() => {
    dispatch(gad());
    dispatch(gpad());
    dispatch(gbo());
    dispatch(gch());
    dispatch(gse());
  }, [dispatch]);

  return (
    <div>
      <Adultcorte coad={coad}/>
    </div>
  );
};
export default CargarEstadisticas;
