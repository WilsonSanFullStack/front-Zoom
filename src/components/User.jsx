import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../redux/actions/registro/registroUser.js";
import Moneda from "./Moneda.jsx";
import {
  getAllQuincena,
  getByIdQuincena,
} from "../redux/actions/registro/registrarQuincena.js";

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const quincenas = useSelector((state) => state.quincenas);
  const quincena = useSelector((state) => state.quincena);
  const [id, setId] = useState("");

  useEffect(() => {
    dispatch(getAllQuincena());
  }, [dispatch]);

  useEffect(() => {
    id || id !== ''? dispatch(getByIdQuincena(id)): '';
  }, [dispatch, id]);


  const handleQuincena = (event) => {
    setId(event.target.value);
  };

  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <div>
          <h1>{user && user?.nombre}</h1>
        </div>
        <div>
          <select onChange={handleQuincena} value={id}>
            <option value="" hidden>
              Seleccione Una Quincena
            </option>
            {quincenas && quincenas?.map((x) => {
              return (
                <option value={x.id} key={x.id}>
                  {x.nombre}
                </option>
              );
            })}
          </select>
        </div>

          {quincena && quincena.nombre ? (<Moneda quincena={quincena} />) : (
        <div className="loader m-auto my-2"></div>
      )}
        <h1 className="m-5">xxx</h1>
        <p>baneada en pagina x la fecha xxx/xx/xxxx por taly tal cosa </p>
      </div>
    </div>
  );
};

export default User;
