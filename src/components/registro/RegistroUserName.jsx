import React, { useEffect, useState } from "react";
import { FcCancel } from "react-icons/fc";
import { BiSend } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getAllPagina } from "../../redux/actions/registro/registroPaginas.js";
import { getAllUser } from "../../redux/actions/registro/registroUser.js";
import { postUserName } from '../../redux/actions/registro/registarUserName.js';

const Registro = () => {
  const dispatch = useDispatch();
  const paginas = useSelector((state) => state.paginas);
  const allUser = useSelector((state) => state.allUser);
  const [input, setInput] = useState({
    paginas: [],
    user: "",
  });
  

  const [show, setShow] = useState({});
  console.log(paginas)
  console.log(input);
  console.log(allUser)

  useEffect(() => {
    dispatch(getAllPagina());
    dispatch(getAllUser());
  }, [dispatch]);

  const handlePaginas = (idPagina) => {
    // Busca la página correspondiente al ID seleccionado
    const paginaSeleccionada = paginas.find((pagina) => pagina.id === idPagina);
    if (paginaSeleccionada) {
      setInput({
        ...input,
        paginas: [...input.paginas, idPagina],
      });
      setShow({
        ...show,
        [idPagina]: true,
      });
    }
  };

  const handleDelete = (idPaginaToDelete) => {
    const updatedInput = {...input};

    updatedInput.paginas = updatedInput.paginas.filter(
      (idPagina) => idPagina !== idPaginaToDelete
    );
    delete updatedInput[idPaginaToDelete];
    setInput(updatedInput);
    setShow({
      ...show,
      [idPaginaToDelete]: false,
    });
  };

  const handleUser = (event) => {
    setInput({
      ...input,
      user: event.target.value,
    });
  };

  const renderCamposUsuario = (idPagina) => {
    const pagina = paginas.find((p) => p.id === idPagina);

    if (pagina) {
      return (
        <section>
          <label className="label">
            Nombre de usuario: {pagina.nombrePagina}
          </label>
          <input
            type="text"
            placeholder={`Usuario de ${pagina.nombrePagina}`}
            value={input[idPagina] || ""}
            onChange={(e) =>
              setInput({
                ...input,
                [idPagina]: e.target.value,
              })
            }
            className="input max-w-xl"
          />
        </section>
      );
    }

    return null;
  };

  const handlerSubmit = () => {
    dispatch(postUserName(input));
  };

  return (
    <div className="contenedor1">
      <div className="pt-14 text-center flex flex-col items-center justify-center">
        <h1 className="bg-indigo-300 w-auto justify-center m-2 p-2 px-4 rounded-xl font-bold text-2xl">
          Registro De Usuarios
        </h1>
        <div>
          <form onSubmit={handlerSubmit}>
            <section className=" px-20 grid min-w-min mx-20 rounded-lg m-5 p-5 bg-indigo-300">
              <h1 className=" font-bold text-black text-3xl">
                Datos Laborales
              </h1>
              <section className="m-5">
                <select
                  onChange={handleUser}
                  className="bg-indigo-200 font-bold"
                  value={input.user}
                >
                  <option value="" hidden>
                    Seleccione usuario
                  </option>
                  {allUser?.map((x) => {
                    return (
                      <option value={x.id} key={x.id} className="font-bold">
                        {x.nombre}
                      </option>
                    );
                  })}
                </select>
              </section>
              <label className="label">Paginas:</label>
              <h2>
                Seleccione una página para introducir el nombre de usuario
              </h2>

              <section className="">
                <select
                  onChange={(e) => handlePaginas(e.target.value)}
                  className="bg-indigo-200 font-bold"
                >
                  <option value="" hidden>
                    Seleccione Páginas
                  </option>
                  {paginas.map((pagina) => {
                    if (!input.paginas.includes(pagina.id)) {
                      return (
                        <option
                          value={pagina.id}
                          name="pagina"
                          key={pagina.id}
                          className="font-bold"
                        >
                          {pagina.nombrePagina}
                        </option>
                      );
                    } else {
                      return null;
                    }
                  })}
                </select>
              </section>
              <section>
                <h1 className="font-bold text-black text-2xl">
                  Lista De Páginas
                </h1>
                <ol>
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                    {input.paginas.map((idPagina) => {
                      const pagina = paginas.find((p) => p.id === idPagina);
                      if (pagina) {
                        return (
                          <li key={idPagina} className="m-2 min-w-max">
                            <div className="bg-indigo-200 m-2 px-2 rounded-xl flex justify-between">
                              <p className="mx-2">{pagina.nombrePagina}</p>
                              <button
                                onClick={() => {
                                  handleDelete(idPagina);
                                }}
                                className="btn-n"
                              >
                                <FcCancel /> {/* Eliminar */}
                              </button>
                            </div>
                          </li>
                        );
                      }
                      return null;
                    })}
                  </div>
                </ol>
              </section>
            </section>
            {/* Resto de tu formulario */}
            <section className="border flex flex-col items-center px-20 bg-indigo-300 min-w-min mx-20 rounded-lg m-5 p-5 ">
              <h1 className=" font-bold text-black text-3xl">
                Nombres De Usuario
              </h1>
              {input.paginas.map((idPagina) => (
                <React.Fragment key={idPagina}>
                  {renderCamposUsuario(idPagina)}
                </React.Fragment>
              ))}
            </section>
            <section className="flex items-center justify-center">
              <button className="btn-w w-auto font-bold text-4xl" type="submit">
                <BiSend />
              </button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
