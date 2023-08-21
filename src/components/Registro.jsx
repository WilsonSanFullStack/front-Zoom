import React, { useState } from "react";
import { FcCancel } from "react-icons/fc";
import { BiSend } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Registro = () => {
  const [input, setInput] = useState({
    pasaporte: "",
    paginas: [],
  });
  const paginas = [
    "adultwork",
    "amateur",
    "bonga",
    "cam4",
    "chaturbate",
    "dirty",
    "islive",
    "sender",
    "skype",
    "stripchat",
    "vx",
    "xlove",
  ];

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
  const handlePasaporte = (event) => {
    setInput({
      ...input,
      pasaporte: event.target.value,
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
  const handlePaginas = (event) => {
    const selectedPagina = event.target.value;
    setInput({
      ...input,
      paginas: [...input.paginas, selectedPagina],
    });
  };
  const handleDelete = (paginaToDelete) => {
    setInput({
      ...input,
      paginas: input.paginas.filter((pagina) => pagina !== paginaToDelete),
    });
  };
  // const handleNombre = (Event) => {
  //   setInput({
  //     ...input,
  //     a: event.target.value,
  //   })
  // };
  // const handleNombre = (Event) => {
  //   setInput({
  //     ...input,
  //     a: event.target.value,
  //   })
  // };

  return (
    <div className="min-h-screen bg-fuchsia-400 top-0">
      <div className="pt-14 text-center flex flex-col items-center justify-center">
        <h1 className="bg-fuchsia-300 w-auto justify-center m-2 p-2 px-4 rounded-xl font-bold text-2xl">
          Registro De Usuarios
        </h1>
        <div>
          <form action="">
            <section className="border flex flex-col items-center px-20 border-black min-w-min mx-20 rounded-lg m-5 p-5 ">
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
                <label className="label">Numero De Pasaporte:</label>
                <input
                  type="text"
                  placeholder="1234567890"
                  value={input.pasaporte}
                  name="pasaporte"
                  onChange={handlePasaporte}
                  className="input"
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
            <section className="border px-20 border-black min-w-min mx-20 rounded-lg m-5 p-5">
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
            <section className="border px-20 grid border-black min-w-min mx-20 rounded-lg m-5 p-5 bg-fuchsia-500">
              <h1 className=" font-bold text-black text-3xl">Datos Laborales</h1>
              <label className="label">Paginas:</label>
              <section className="">
                <select onChange={handlePaginas} className=" bg-fuchsia-300 font-bold">
                  <option value="" hidden >
                    Selecione Paginas
                  </option>
                  {paginas.map((pagina) => {
                    if (!input.paginas.includes(pagina)) {
                      return (
                        <option value={pagina} name="pagina" key={pagina} className=" font-bold">
                          {pagina}
                        </option>
                      );
                    } else {
                      return null;
                    }
                  })}
                </select>
              </section>
              <section>
                <h1 className=" font-bold text-black text-2xl">Lista De Paginas</h1>
                <ol>
                  <div className="grid grid-cols-3">
                    {input.paginas.map((pagina) => (
                      <li key={pagina}>
                        <div className=" bg-fuchsia-300 m-2 px-2 rounded-xl flex justify-between">
                          <p className="mx-2">{pagina}</p>
                          <button
                            onClick={() => {
                              handleDelete(pagina);
                            }}
                            className="btn-n"
                          >
                            <FcCancel /> {/* Eliminar */}
                          </button>
                        </div>
                      </li>
                    ))}
                  </div>
                </ol>
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

export default Registro;
