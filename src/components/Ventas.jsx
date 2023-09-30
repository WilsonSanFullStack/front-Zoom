import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// iconos
// import { BiTrash } from "react-icons/bi"; eliminar
import { BiStoreAlt } from "react-icons/bi"; //tienda
import { TiPlusOutline } from "react-icons/ti"; //suma
import { TiTickOutline } from "react-icons/ti"; //add
import { TiMinusOutline } from "react-icons/ti"; //menos 
//iconos

import { getAllProductos } from "../redux/actions/registro/registroProductos.js";

const Ventas = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos);
  console.log(productos);
  useEffect(() => {
    dispatch(getAllProductos());
  }, [dispatch]);
  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <BiStoreAlt className=" justify-end right-0 absolute m-5 scale-150" />
        <h1 className="text-2xl font-bold">VENTAS DE PRODUCTOS</h1>
        <div className="flex grid-cols-4 justify-between p-5">
          {productos?.map((x) => {
            return (
              <div key={x.id}>
                <section
                  key={x.id}
                  className="bg-indigo-300 m-2 w-52 rounded-2xl flex justify-center items-center flex-col p-2"
                >
                  <h3 className="font-bold ">{x.nombre} </h3>
                  <p>{x.descripcion} </p>
                  <img
                    src={x.imagen}
                    alt={x.nombre}
                    className=" w-36 rounded-xl border-4 border-indigo-500 mt-2"
                  />
                  <div className="flex grid-cols-4 bg-indigo-500 mt-3 rounded-xl justify-between items-center h-8">
                  <TiPlusOutline className="btnStore"/>
                  <p className="mx-1 bg-indigo-200 rounded-md px-2">12</p>
                  <TiMinusOutline className="btnStore" />
                  <TiTickOutline className="btnStore" />
                  </div>
                </section>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ventas;
