import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiSend } from "react-icons/bi";


const RegisterUser = () => {
  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    fechaDeNacimiento: "",
    whatsapp: "",
    direccion: "",
  });

  const handleNombre = (event) => {
    setInput({
      ...input,
      nombre: event.target.value,
    });
  };
  const handleApellido = (event) => {
    setInput({
      ...input,
      apellido: event.target.value,
    });
  };
  const handleCedula = (event) => {
    setInput({
      ...input,
      cedula: event.target.value,
    });
  };
  const handleTelefono = (event) => {
    setInput({
      ...input,
      telefono: event.target.value,
    });
  };
  const handleFechaDeNacimiento = (date) => {
    setInput({
      ...input,
      fechaDeNacimiento: date, // Actualizar el estado con la fecha de nacimiento seleccionada
    });
  };
  const handleWhtsapp = (event) => {
    setInput({
      ...input,
      whatsapp: event.target.value,
    });
  };
  const handleDireccion = (event) => {
    setInput({
      ...input,
      direccion: event.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-fuchsia-400 top-0">
      <div className="text-center flex flex-col items-center justify-center">
        <h1 className="bg-fuchsia-300 w-auto justify-center mt-6 m-4 p-2 px-4 rounded-xl font-bold text-4xl">
          Registro De Usuario
        </h1>
        <div>
          <form action="">
            <section className="border flex flex-col items-center px-20 border-black min-w-min mx-20 rounded-lg m-4 p-1 ">
              <h1 className=" font-bold text-black text-3xl">Datos Personales</h1>
              <section className="grid grid-cols-2 text-left">
                <label className="label">Nombre:</label>
                <input
                  type="text"
                  placeholder="Casimira"
                  value={input.nombre}
                  name="nombre"
                  onChange={handleNombre}
                  className="input"
                />
                <label className="label">Apellido:</label>
                <input
                  type="text"
                  placeholder="La Visca"
                  value={input.apellido}
                  name="apellido"
                  onChange={handleApellido}
                  className="input"
                />
                <label className="label">Numero De Cedula:</label>
                <input
                  type="number"
                  placeholder="1234567890"
                  value={input.cedula}
                  name="cedula"
                  onChange={handleCedula}
                  className="input no-spin"
                />
                <label className="label">Fecha De Nacimiento:</label>
                <DatePicker
                  selected={input.fechaDeNacimiento}
                  onChange={handleFechaDeNacimiento}
                  dateFormat="dd/MM/yyyy"
                  showMonthDropdown
                  showYearDropdown
                  placeholderText="18/08/20223"
                  dropdownMode="select"
                  popperModifiers={{
                    preventOverflow: {
                      enabled: true,
                      escapeWithReference: false,
                      boundariesElement: "viewport",
                    },
                  }}
                  customInput={
                    <input
                      type="text"
                      className="input"
                      name="fechaDeNacimiento"
                    />
                  }
                />
              </section>
            </section>
            <section className="border px-20 border-black min-w-min mx-20 rounded-lg m-1 p-1">
              <h1 className=" font-bold text-black text-3xl">Datos De Contacto:</h1>
              <section className="grid grid-cols-2 text-left">
                <label className="label">Telefono:</label>
                <input
                  type="number"
                  placeholder="310 000 00 00"
                  value={input.telefono}
                  name="telefono"
                  onChange={handleTelefono}
                  className="input no-spin"
                />
                <label className="label">WhatsApp:</label>
                <input
                  type="number"
                  // readOnly='false'
                  placeholder="+57 310 000 00 00"
                  value={input.whatsapp}
                  name="whatsapp"
                  onChange={handleWhtsapp}
                  className="input no-spin"
                />
                <label className="label">Direccion:</label>
                <input
                  type="text"
                  placeholder="calle 1W # 57-68"
                  value={input.direccion}
                  name="direccion"
                  onChange={handleDireccion}
                  className="input"
                />
              </section>
            </section>
           
            <section className="flex items-center justify-center">
              <button onClick={'#'} className="btn-w w-auto font-bold text-4xl">
              <BiSend/>
              </button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
