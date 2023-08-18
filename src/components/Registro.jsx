import React, { useState } from "react";
import { FcCancel } from "react-icons/fc";
import { BiSend } from "react-icons/bi";

const Registro = () => {
  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    pasaporte: "",
    telefono: "",
    whatsapp: "",
    direccion: "",
    paginas: [],
  });
  console.log(input)
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
            <section className="border grid border-black min-w-min mx-20 rounded-lg m-5 p-5">
              <h1 className="m-2 px-5">Datos Personales</h1>
              <label className="p-2">
                Nombre:
                <input type="text" placeholder="Casimira" 
                value={input.nombre}
                name="nombre"
                onChange={handleNombre}
                />
              </label>
              <label className="p-2">
                Apellido
                <input type="text" placeholder="La Vistaca"
                value={input.apellido}
                name="apellido"
                onChange={handleApellido}
                />
              </label>
              <label className="p-2">
                Numero De Cedula
                <input type="text" placeholder="1234567890" 
                value={input.cedula}
                name="cedula"
                onChange={handleCedula}
                />
              </label>
              <label className="p-2">
                Numero De Pasaporte
                <input type="text" placeholder="1234567890" 
                value={input.pasaporte}
                name="pasaporte"
                onChange={handlePasaporte}
                />
              </label>
            </section>
            <section className="border grid border-black min-w-min mx-20 rounded-lg m-5 p-5">
              <h1>Datos De Contacto</h1>
              <label className="p-2">
                Telefono:
                <input type="text" placeholder="310 000 00 00" 
                value={input.telefono}
                name="telefono"
                onChange={handleTelefono}
                />
              </label>
              <label className="p-2">
                WhatsApp:
                <input type="text" placeholder="+57 310 000 00 00" 
                value={input.whatsapp}
                name="whatsapp"
                onChange={handleWhtsapp}
                />
              </label>
              <label className="p-2">
                Direccion:
                <input type="text" placeholder="calle 1W # 57-68" 
                value={input.direccion}
                name="direccion"
                onChange={handleDireccion}
                />
              </label>
            </section>
            <section className="border grid border-black min-w-min mx-20 rounded-lg m-5 p-5">
              <h1>Datos Laborales</h1>
              <label className="p-2">
                Paginas:
                  </label>
                <select onChange={handlePaginas}>
                  <option value="" hidden>
                    Selecione Las Paginas
                  </option>
                  {paginas.map((pagina) => {
                    if (!input.paginas.includes(pagina)) {
                      return (
                        <option
                          value={pagina}
                          name="pagina"
                          key={pagina}
                        >
                          {pagina}
                        </option>
                      );
                    } else {
                      return null;
                    }
                  })}
                </select>
                <section>
                <ol>
                  {input.paginas.map((pagina) => (
                    <li key={pagina}>
                      <div>
                        <p>{pagina}</p>
                        <button
                          onClick={() => {
                            handleDelete(pagina);
                          }}
                          className="stroke-2"
                        >
                          <FcCancel  /> {/* Eliminar */}
                        </button>
                      </div>
                    </li>
                  ))}
                </ol>
                </section>
            </section>

            <section>
              <button onClick={'#'}>
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
