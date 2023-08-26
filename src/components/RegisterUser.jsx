import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiSend } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registroUser } from "../redux/actionRegistroUser.js";

const validacion = (input) => {
  let error = {};
  const errorMessages = [];
  //validacion nombre
  if (input.nombre.length < 3 || input.nombre.length === 0) {
    error.nombre = "El nombre es requisito obligatorio";
  }
  //validacion apellido
  if (input.apellido.length < 3 || input.apellido === 0) {
    error.apellido = "El apellido es requisito obligatorio";
  }
  //validacion nacionalidad
  if (input.nacionalidad === "") {
    error.nacionalidad = "seleccione su pais de origen";
  }
  //validacion cedula
  if (input.cedula.length < 3 || input.cedula.length === 0) {
    error.cedula = "La cédula es requisito obligatorio";
  } else {
    if (input.nacionalidad === "Colombia") {
      const cedulaColombianaRegex = /^\d{7,11}$/;
      if (!cedulaColombianaRegex.test(input.cedula)) {
        error.cedula = "Cédula colombiana errónea";
      }
    } else if (input.nacionalidad === "Venezuela") {
      const cedulaVenezolanaRegex = /^\d{5,9}$/;
      if (!cedulaVenezolanaRegex.test(input.cedula)) {
        error.cedula = "Cédula venezolana errónea";
      }
    }
  }
  //validacion fecha de nacimiento
  if (!input.fechaDeNacimiento) {
    error.fechaDeNacimiento = "La fecha de nacimiento es requisito obligatorio";
  } else {
    const hoy = new Date();
    const partesFecha = input.fechaDeNacimiento.split("/"); // Dividir el string en partes: [día, mes, año]

    const diaNacimiento = parseInt(partesFecha[0], 10);
    const mesNacimiento = parseInt(partesFecha[1], 10) - 1; // Restar 1 al mes ya que en JavaScript los meses son indexados en base 0
    const anioNacimiento = parseInt(partesFecha[2], 10);

    const fechaNacimiento = new Date(
      anioNacimiento,
      mesNacimiento,
      diaNacimiento
    );

    const edadCalculada = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mesActual = hoy.getMonth();
    const diaNacimient = fechaNacimiento.getDate();

    const edad =
      mesActual > mesNacimiento ||
      (mesActual === mesNacimiento && hoy.getDate() >= diaNacimient)
        ? edadCalculada
        : edadCalculada - 1;

    const edadMinima = 18;

    if (edad < edadMinima) {
      error.fechaDeNacimiento = "Debes ser mayor de 18 años";
    }
  }
  
  // validacion de telefono
  if (!/^3(0[0-5]|1[0-9]|2[0-9]|3[0-6])[0-9]{7}$/.test(input.telefono)) {
    error.telefono = "Numero de telefono no es valido";
  }
  if (!/^3(0[0-5]|1[0-9]|2[0-9]|3[0-6])[0-9]{7}$/.test(input.whatsapp)) {
    error.whatsapp = "Numero de WhatsApp no es valido";
  }

  if (input.direccion.length < 10 || input.direccion.length === 0) {
    error.direccion = "Direccion Invalida";
  }

  return error;
};

const RegisterUser = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    if (user.id) {
      setIsRegister(true);
      navigate('/home')
    }
  },[user]);

  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [showForm, setShowForm] = useState(true);
  const [confirmacion, setConfirmacion] = useState("");
  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    nacionalidad: "",
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
    setError(
      validacion({
        ...input,
        nombre: event.target.value,
      })
    );
  };
  const handleApellido = (event) => {
    setInput({
      ...input,
      apellido: event.target.value,
    });
    setError(
      validacion({
        ...input,
        apellido: event.target.value,
      })
    );
  };
  const handleNacionalidad = (event) => {
    setInput({
      ...input,
      nacionalidad: event.target.value,
    });
    setError(
      validacion({
        ...input,
        nacionalidad: event.target.value,
      })
    );
  };
  const handleCedula = (event) => {
    setInput({
      ...input,
      cedula: event.target.value,
    });
    setError(
      validacion({
        ...input,
        cedula: event.target.value,
      })
    );
  };
  const handleTelefono = (event) => {
    setInput({
      ...input,
      telefono: event.target.value,
    });
    setError(
      validacion({
        ...input,
        telefono: event.target.value,
      })
    );
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const handleFechaDeNacimiento = (date) => {
    setSelectedDate(date);
    const dateString = date
      ? date.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "";

    setInput({
      ...input,
      fechaDeNacimiento: dateString,
    });
    setError(
      validacion({
        ...input,
        fechaDeNacimiento: dateString,
      })
    );
  };

  const handleWhtsapp = (event) => {
    setInput({
      ...input,
      whatsapp: event.target.value,
    });
    setError(
      validacion({
        ...input,
        whatsapp: event.target.value,
      })
    );
  };
  const handleDireccion = (event) => {
    setInput({
      ...input,
      direccion: event.target.value,
    });
    setError(
      validacion({
        ...input,
        direccion: event.target.value,
      })
    );
  };

  const handleCrear = async (e) => {
    e.preventDefault();
    const errores = validacion(input);
    if (Object.keys(errores).length === 0) {
      dispatch(registroUser(input))
        .then(() => {
          setInput({
            nombre: "",
            apellido: "",
            nacionalidad: "",
            cedula: "",
            telefono: "",
            fechaDeNacimiento: "",
            whatsapp: "",
            direccion: "",
          });
          setShowForm(false);
          setConfirmacion("Usuario Registrado Con Exito.");

          
            if (user.id) {
              setConfirmacion("");
          }
        })
    }
    setError(errores);
  };

  const paises = [
    "Colombia",
    "Venezuela",
    "Ecuador",
    "Perú",
    "Panamá",
    "Argentina",
    "Belice",
    "Bolivia",
    "Brasil",
    "Chile",
    "Costa Rica",
    "El Salvador",
    "Guatemala",
    "Guyana",
    "Honduras",
    "Nicaragua",
    "Paraguay",
    "Surinam",
    "Uruguay",
  ];
  return (
    <div className="min-h-screen bg-fuchsia-400 top-0">
      {confirmacion && (
        <div>
          <h1>{confirmacion}</h1>
        </div>
      )}
      {showForm && (
        <div className="text-center flex flex-col items-center justify-center">
          <h1 className="bg-fuchsia-300 w-auto justify-center mt-2 m-1 p-1 px-4 rounded-xl font-bold text-3xl">
            Registro De Usuario
          </h1>
          <div>
            <form onSubmit={handleCrear}>
              <section className="border flex flex-col items-center px-10 border-black min-w-min mx-20 rounded-lg m-2 p-1 ">
                <h1 className=" font-bold text-black text-2xl">
                  Datos Personales
                </h1>
                <section className="grid grid-cols-1 text-right">
                  <section className=" grid grid-cols-2">
                    <label className="label">Nombre:</label>
                    <input
                      type="text"
                      placeholder="Casimira"
                      value={input.nombre}
                      name="nombre"
                      onChange={handleNombre}
                      className="input"
                    />
                  </section>
                  {error && (
                    <div className="text-center text-red-500 font-bold">
                      {error.nombre}
                    </div>
                  )}
                  <section className=" grid grid-cols-2">
                    <label className="label">Apellido:</label>
                    <input
                      type="text"
                      placeholder="La Visca"
                      value={input.apellido}
                      name="apellido"
                      onChange={handleApellido}
                      className="input"
                    />
                  </section>
                  {error && (
                    <div className="text-center text-red-500 font-bold">
                      {error.apellido}
                    </div>
                  )}
                  <section className=" grid grid-cols-2">
                    <label className="label">Nacionalidad:</label>
                    <select className="input" onChange={handleNacionalidad}>
                      <option value="">selecciones una opcion</option>
                      {paises.map((pais) => (
                        <option value={pais} name="nacionalidad" key={pais}>
                          {pais}
                        </option>
                      ))}
                    </select>
                  </section>
                  {error && (
                    <div className="text-center text-red-500 font-bold">
                      {error.nacionalidad}
                    </div>
                  )}
                  <section className=" grid grid-cols-2">
                    <label className="label">Numero De Cedula:</label>
                    <input
                      type="number"
                      placeholder="1234567890"
                      value={input.cedula}
                      name="cedula"
                      onChange={handleCedula}
                      className="input no-spin"
                    />
                  </section>
                  {error && (
                    <div className="text-center text-red-500 font-bold">
                      {error.cedula}
                    </div>
                  )}
                  <section className=" grid grid-cols-2">
                    <label className="label">Fecha De Nacimiento:</label>
                    <DatePicker
                      selected={selectedDate}
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
                          value={selectedDate}
                          onChange={handleFechaDeNacimiento}
                        />
                      }
                    />
                  </section>
                  {error && (
                    <div className="text-center text-red-500 font-bold">
                      {error.fechaDeNacimiento}
                    </div>
                  )}          
                </section>


              </section>
              <section className="border flex flex-col items-center px-10 border-black min-w-min mx-20 rounded-lg m-2 p-1">
                <h1 className=" font-bold text-black text-2xl">
                  Datos De Contacto:
                </h1>
                <section className="grid grid-cols-1 text-right">
                  <section className=" grid grid-cols-2">
                    <label className="label">Telefono:</label>
                    <input
                      type="number"
                      placeholder="310 000 00 00"
                      value={input.telefono}
                      name="telefono"
                      onChange={handleTelefono}
                      className="input no-spin"
                    />
                  </section>
                  {error && (
                    <div className="text-center text-red-500 font-bold">
                      {error.telefono}
                    </div>
                  )}
                  <section className="grid grid-cols-2">
                    <label className="label">WhatsApp:</label>
                    <input
                      type="number"
                      // readOnly='false'
                      placeholder="310 000 00 00"
                      value={input.whatsapp}
                      name="whatsapp"
                      onChange={handleWhtsapp}
                      className="input no-spin"
                    />
                  </section>
                  {error && (
                    <div className="text-center text-red-500 font-bold">
                      {error.whatsapp}
                    </div>
                  )}
                  <section className="grid grid-cols-2">
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
                  {error && (
                    <div className="text-center text-red-500 font-bold">
                      {error.direccion}
                    </div>
                  )}
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
      )}
    </div>
  );
};

export default RegisterUser;
