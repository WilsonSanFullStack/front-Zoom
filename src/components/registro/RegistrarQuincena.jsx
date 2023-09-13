import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiSend } from "react-icons/bi";
import { useDispatch } from "react-redux";
import {
  postQuincena,
  getAllQuincena,
} from "../../redux/actions/registro/registrarQuincena.js";

const RegistrarQuincena = () => {
  const dispatch = useDispatch();
  const [quincena, setQuincena] = useState({
    nombreQuincena: "",
    fechaDeInicio: "",
    fechaFinal: "",
  });
  console.log(quincena);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFinal, setFechaFinal] = useState(null);

  const handleFechaDeInicio = (date) => {
    setFechaInicio(date);
    const dateString = date
      ? date.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "";

    setQuincena({
      ...quincena,
      fechaDeInicio: dateString,
    });
  };
  const handleName = (event) => {
    setQuincena({
      ...quincena,
      nombreQuincena: event.target.value,
    });
  };

  const handleFechaFinal = (date) => {
    setFechaFinal(date);
    const dateStringi = date
      ? date.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "";

    setQuincena({
      ...quincena,
      fechaFinal: dateStringi,
    });
  };

  const handleCreate = () => {
    dispatch(postQuincena(quincena))
  };

  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <h1>Registro De Quincenas</h1>
        <form onSubmit={handleCreate}>
          <section className="flex flex-col items-center px-10 bg-indigo-300 min-w-min mx-20 rounded-lg m-2 p-1 ">
            <section>
              <label className="label">Nombre Quincena:</label>
              <input
                type="text"
                value={quincena.nombreQuincena}
                onChange={handleName}
                className="input"
              />
            </section>
            <section className="grid grid-cols-2">
              <label className="label">Fecha De Inicio:</label>
              <DatePicker
                selected={fechaInicio}
                onChange={handleFechaDeInicio}
                dateFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                placeholderText="18/08/2023"
                dropdownMode="select"
                popperModifiers={{
                  preventOverflow: {
                    enabled: true,
                    escapeWithReference: false,
                    boundariesElement: "viewport",
                  },
                }}
                customInput={<input type="text" className="input" />}
              />
            </section>

            <section className="grid grid-cols-2">
              <label className="label">Fecha Final:</label>
              <DatePicker
                selected={fechaFinal}
                onChange={handleFechaFinal}
                dateFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                placeholderText="18/08/2023"
                dropdownMode="select"
                popperModifiers={{
                  preventOverflow: {
                    enabled: true,
                    escapeWithReference: false,
                    boundariesElement: "viewport",
                  },
                }}
                customInput={<input type="text" className="input" />}
              />
            </section>
          </section>
          <section className="flex items-center justify-center">
            <button className="btn-w w-auto font-bold text-4xl" type="submit">
              <BiSend />
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default RegistrarQuincena;
