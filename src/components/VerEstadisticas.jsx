import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllParcial, getAllQuincena } from "../redux/actionAdult";
import { getBonga } from "../redux/actionBonga";
import { getChatur } from "../redux/actionChatur";
import { gs } from "../redux/actionSender";
// import { gs } from '../redux/'

import Adultcorte from "./MostrarCreditos/Adultcorte";

const CargarEstadisticas = () => {
  const dispatch = useDispatch();

  const ca = useSelector((state) => state.ca); //corte adult
  const pa = useSelector((state) => state.pa); //parcial adult
  const cc = useSelector((state) => state.cc); //corte chaturbate
  const cb = useSelector((state) => state.cb); //corte bonga
  const cs = useSelector((state) => state.cs); //corte sender


  console.log(ca);
  useEffect(() => {
    dispatch(getAllQuincena());
    dispatch(getAllParcial());
    dispatch(getBonga());
    dispatch(getChatur());
    dispatch(gs());
  }, [dispatch]);

  return (
    <div>
      <Adultcorte ca={ca}/>
    </div>
  );
};
export default CargarEstadisticas;
