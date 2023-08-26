import React, { useState } from "react";
import { FcCancel } from "react-icons/fc";
import { BiSend } from "react-icons/bi";

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
  
  const handlePasaporte = (event) => {
    setInput({
      ...input,
      pasaporte: event.target.value,
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
                <label className="label">Nombres De Usuario:</label>
                <input
                  type="text"
                  placeholder="Casimira"
                  value={input.nombre}
                  name="nombre"
                  onChange={handleNombre}
                  className="input"
                />
              </section>
            
            </section>
            <section className=" px-20 grid min-w-min mx-20 rounded-lg m-5 p-5 bg-fuchsia-500">
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
