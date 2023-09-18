import React, { useEffect, useState } from "react";
import { BiSend } from "react-icons/bi";

import { getAllQuincena } from "../../redux/actions/registro/registrarQuincena.js";
import { useDispatch, useSelector } from "react-redux";
import { postMoneda } from "../../redux/actions/registro/registerMoneda.js";
import { useNavigate } from "react-router-dom";

const Moneda = () => {
  const [moneda, setMoneda] = useState({
    quincena: "",
    edolar: "",
    eeuro: "",
    elibra: "",
    pdolar: "",
    peuro: "",
    plibra: "",
  });

const navigate = useNavigate();
  const dispatch = useDispatch();
  const quincenas = useSelector((state) => state.quincenas);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getAllQuincena());
  }, [dispatch]);

  const handleQuincena = (event) => {
    setMoneda({
      ...moneda,
      quincena: event.target.value,
    });
  };
  const handleEsDolar = (event) => {
    setMoneda({
      ...moneda,
      edolar: event.target.value,
    });
  };
  const handleEsEuro = (event) => {
    setMoneda({
      ...moneda,
      eeuro: event.target.value,
    });
  };
  const handleEsLibra = (event) => {
    setMoneda({
      ...moneda,
      elibra: event.target.value,
    });
  };
  const handlePagoDolar = (event) => {
    setMoneda({
      ...moneda,
      pdolar: event.target.value,
    });
  };
  const handlePagoEuro = (event) => {
    setMoneda({
      ...moneda,
      peuro: event.target.value,
    });
  };
  const handlePagoLibra = (event) => {
    setMoneda({
      ...moneda,
      plibra: event.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(postMoneda(moneda));
navigate('/crear');
  };

  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <form onSubmit={handleSubmit}>
          <section className="flex flex-col items-center px-10 bg-indigo-300 min-w-min mx-20 rounded-lg m-2 p-1 ">
            <h1 className=" font-bold text-black text-2xl">
              Registro De Moneda
            </h1>
            <section>
              <select onChange={handleQuincena} value={moneda.quincena}>
                <option value="" hidden>
                  Seleccione Una Quincena
                </option>
                {quincenas?.map((x) => {
                  return (
                    <option value={x.id} key={x.id}>
                      {x.nombre}
                    </option>
                  );
                })}
              </select>
            </section>
            <section>
              <h2>Modena Estadisticas</h2>
              <section>
                <label className="label">Dolar</label>
                <input
                  type="number"
                  className="input no-spin"
                  value={moneda.edolar}
                  onChange={handleEsDolar}
                />
              </section>
              <section>
                <label className="label">Euro</label>
                <input
                  type="number"
                  className="input no-spin"
                  value={moneda.eeuro}
                  onChange={handleEsEuro}
                />
              </section>
              <section>
                <label className="label">Libra Esterlina</label>
                <input
                  type="number"
                  className="input no-spin"
                  value={moneda.elibra}
                  onChange={handleEsLibra}
                />
              </section>
            </section>

            <section>
              <h2>Modenda Para Pago</h2>
              <section>
                <label className="label">Dolar</label>
                <input
                  type="number"
                  className="input no-spin"
                  value={moneda.pdolar}
                  onChange={handlePagoDolar}
                />
              </section>
              <section>
                <label className="label">Euro</label>
                <input
                  type="number"
                  className="input no-spin"
                  value={moneda.peuro}
                  onChange={handlePagoEuro}
                />
              </section>
              <section>
                <label className="label">Libra Esterlina</label>
                <input
                  type="number"
                  className="input no-spin"
                  value={moneda.plibra}
                  onChange={handlePagoLibra}
                />
              </section>
            </section>
            <section className="flex items-center justify-center">
            <button className="btn-w w-auto font-bold text-4xl" type="submit">
              <BiSend />
            </button>
          </section>
          </section>
        </form>
      </div>
    </div>
  );
};

export default Moneda;
