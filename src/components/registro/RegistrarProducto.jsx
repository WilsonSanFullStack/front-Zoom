import React, { useEffect, useState } from "react";
import { BiSend } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getAllProductos,
  postProducto,
} from "../../redux/actions/registro/registroProductos.js";

const valida = (nombre, productos) => {
  let error = "";
  if (nombre.length < 3 || nombre.length === 0) {
    error = "El Nombre es requisito obligatorio";
  }
  if (
    productos &&
    productos.some((p) => p.nombre.toLowerCase() === nombre.toLowerCase())
  ) {
    error = "El nombre de la página ya existe";
  }

  return error;
};

const warninging = (producto) => {
  let warning = {};
  if (producto.descripcion.length < 3 || producto.descripcion.length === 0) {
    warning.descripcion =
      "No es obligatorio pero le puede servir para encontrar un producto mas rapido";
  }
  if (producto.imagen.length < 3 || producto.imagen.length === 0) {
    warning.imagen =
      "No es obligatorio pero le puede servir para encontrar un producto mas rapido";
  }
  return warning;
};
const RegistrarProducto = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productos = useSelector((state) => state.productos);
  const errorServer = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getAllProductos());
  }, [dispatch]);

  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [confirmacion, setConfirmacion] = useState("");

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
  });
  const [nombre, setNombre] = useState("");

  console.log(producto);
  const handleNombre = (event) => {
    const nombre = event.target.value; // Obtener el valor del campo
    setNombre(nombre); // Actualizar el estado de nombre de manera síncrona
    setProducto({
      ...producto,
      nombre: nombre, // Usar el valor actual de nombre
    });
    setError(valida(nombre, productos));
  };

  const handleDescripcion = (event) => {
    setProducto({
      ...producto,
      descripcion: event.target.value,
    });
    setWarning(
      warninging({
        ...producto,
        descripcion: event.target.value,
      })
    );
  };

  const handleImagen = (event) => {
    setProducto({
      ...producto,
      imagen: event.target.value,
    });
    setWarning(
      warninging({
        ...producto,
        imagen: event.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errores = valida(nombre, productos);
    console.log(errores);
    if (errores.length === 0) {
      dispatch(postProducto(producto));
      setProducto({
        nombre: "",
        descripcion: "",
        imagen: "",
      });
      setShowForm(false);
      setConfirmacion("se envio la solicitud.");
      setConfirmacion("");
      setError(errores);
      setWarning({
        descripcion: "",
        imagen: "",
      });
      navigate("/crear");
    }
  };
  console.log(errorServer);
  return (
    <div className="contenedor1">
      {confirmacion && (
        <div>
          <h1>{confirmacion}</h1>
        </div>
      )}
      {showForm && (
        <div className="contenedor2">
          <h1 className="titulo">Registro De Productos </h1>
          <form onSubmit={handleSubmit} className="flex justify-center">
            <section className="flex flex-col items-center  px-10 bg-indigo-300 max-w-min rounded-lg m-2 p-1 ">
            <section className="w-96 m-4">
              <label>Nombre Del Producto:</label>
              <input
                type="text"
                value={producto.nombre}
                onChange={handleNombre}
                name="nombre"
                placeholder="Escriba el nombre del producto"
                className="input"
              />
            </section>
            {error && (
              <div className="text-center text-red-500 font-bold">{error}</div>
            )}
            <section className="w-96 m-4">
              <label>Descripcion Del Producto:</label>
              <input
                type="text"
                value={producto.descripcion}
                onChange={handleDescripcion}
                name="descripcion"
                placeholder="Escriba un texto que describa el producto"
                className="input"
              />
            </section>
            {warning && (
              <div className="text-center text-red-500 font-bold">
                {warning.descripcion}
              </div>
            )}
            <section className="w-96 m-4">
              <label>Link De La Imagen Del Producto:</label>
              <input
                type="text"
                value={producto.imagen}
                onChange={handleImagen}
                name="imagen"
                placeholder="https://www.google.com/imagen/gatos"
                className="input"
              />
            </section>
            {warning && (
              <div className="text-center text-red-500 font-bold">
                {warning.imagen}
              </div>
            )}
            <section className="flex items-center justify-center">
              <button type="submit" className="btn-w w-auto font-bold text-4xl">
                <BiSend />
              </button>
            </section>
            </section>
          </form>
        </div>
      )}

      <section>
        <h1>compras</h1>
        <h1>una lista donde selecciona el producto a comprar </h1>
        <h1> cantida
        </h1>
        <h1>precio compra</h1>
        <h1>precio venta</h1>
        <h1>precio de venta diferido</h1>
        <select name="" id="">

        <option value="">selection</option>
        </select>

      </section>

      <section>
        <h1>ventas</h1>
        <h1>una lista de las modelos</h1>
        <h1>kista productos</h1>

      </section>
    </div>
  );
};

export default RegistrarProducto;
