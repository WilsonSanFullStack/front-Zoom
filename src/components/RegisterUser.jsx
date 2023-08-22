import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiSend } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registroUser } from "../redux/actionRegistroUser.js";

// const cedulaColombianaRegex = /^(?:\d{7,11}|\d{1,2}-\d{3,7}-\d{1})$/;
// const cedulaVenezolanaRegex = /^(V|E|P|G|J)-\d{7,9}$/;

// const cedulaColombiana = "12345678";
// const cedulaVenezolana = "V-12345678";

// if (cedulaColombianaRegex.test(cedulaColombiana)) {
//   console.log("Cédula colombiana válida");
// } else {
//   console.log("Cédula colombiana inválida");
// }

// if (cedulaVenezolanaRegex.test(cedulaVenezolana)) {
//   console.log("Cédula venezolana válida");
// } else {
//   console.log("Cédula venezolana inválida");
// }

const validacion = (input) => {
  let error = {};

  if (input.nombre.length < 3 || input.nombre.length === 0) {
    error.nombre = "El nombre es requisito obligatorio";
  }
  if (input.apellido.length < 3 || input.apellido === 0) {
    error.apellido = "El apellido es requisito obligatorio";
  }
  if (input.cedula.length < 3 || input.cedula === 0) {
    error.cedula = "El apellido es requisito obligatorio";
  }
  return error;
};

const RegisterUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    contrasena: "",
    vContrasena: "",
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
      fechaDeNacimiento: date,
    });
  };
  const handleContrasena = (event) => {
    setInput({
      ...input,
      contrasena: event.target.value,
    });
  };
  const handleVContrasena = (event) => {
    setInput({
      ...input,
      vContrasena: event.target.value,
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
  console.log(error.nombre);
  console.log(input.nombre);
  const handleCrear = (data) => {
    data.preventDefault();
    const errores = validacion(input);
    if (Object.keys(errores).length === 0) {
      dispatch(registroUser(input));
      setInput({
        nombre: "",
        apellido: "",
        nacionalidad: "",
        cedula: "",
        telefono: "",
        fechaDeNacimiento: "",
        whatsapp: "",
        direccion: "",
        contrasena: "",
        vContrasena: "",
      });
      setConfirmacion("Usuario Registrado Con Exito.");
      setShowForm(false);
      setTimeout(() => {
        setConfirmacion("");
        navigate("/home");
      }, 2000);
    }
    setError(errores);
  };
  console.log(error.nombre);
  const paises = [
    "Argentina",
    "Bolivia",
    "Brasil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Guyana",
    "Paraguay",
    "Perú",
    "Surinam",
    "Uruguay",
    "Venezuela",
    "Belice",
    "Costa Rica",
    "El Salvador",
    "Guatemala",
    "Honduras",
    "Nicaragua",
    "Panamá",
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
                    <input
                      type="text"
                      placeholder="Colombia"
                      value={input.nacionalidad}
                      name="nacionalidad"
                      onChange={handleNacionalidad}
                      className="input"
                    />
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
                  {error && (
                    <div className="text-center text-red-500 font-bold">
                      {error.fechaDeNacimiento}
                    </div>
                  )}
                  <section className=" grid grid-cols-2">
                    <label className="label">Contraseña:</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Abcd#1234"
                      value={input.contrasena}
                      name="contrasena"
                      onChange={handleContrasena}
                      className="input"
                    />
                    <button
      className="show-password-button"
      onMouseDown={() => setShowPassword(true)}
      onMouseUp={() => setShowPassword(false)}
    >
      Mostrar
    </button>
                  </section>
                  {error && (
                    <div className="text-center text-red-500 font-bold">
                      {error.contrasena}
                    </div>
                  )}
                  <section className=" grid grid-cols-2">
                    <label className="label">Repita Contraseña:</label>
                    <input
                      type="password"
                      placeholder="Abcd#1234"
                      value={input.vContrasena}
                      name="vContrasena"
                      onChange={handleVContrasena}
                      className="input"
                    />
                    <button
      className="show-password-button"
      onMouseDown={() => setShowPassword(true)}
      onMouseUp={() => setShowPassword(false)}
    >
      Mostrar
    </button>
                  </section>
                  {error && (
                    <div className="text-center text-red-500 font-bold">
                      {error.vContrasena}
                    </div>
                  )}
                </section>
              </section>
              <section className="border px-10 border-black min-w-min mx-20 rounded-lg m-1 p-1">
                <h1 className=" font-bold text-black text-2xl">
                  Datos De Contacto:
                </h1>
                <section className="grid grid-cols-2 text-right">
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
                <button className="btn-w w-auto font-bold text-4xl">
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
