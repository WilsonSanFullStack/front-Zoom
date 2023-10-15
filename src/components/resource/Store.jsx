import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import { useDispatch } from "react-redux";

import { postVenta } from "../../redux/actions/registro/registerVenta.js";

const Store = ({ props }) => {
  const dispatch = useDispatch();
  const [venta, setVentas] = useState(props);
  console.log(venta);

  const handleSubmit = (venta) => {
    dispatch(postVenta(venta));
  };

  return (
    <div className="flex max-w-2xl justify-end  mx-auto">
      <div className=" min-w-fit bg-indigo-300 border-2 border-indigo-500 p-2 m-1">
        <div className=" bg-indigo-200 grid font-bold text-lg grid-cols-2 border boder-1 border-black m-1 justify-between items-center">
          <h1 className=" text-left pl-2">Producto</h1>
          <h2>Cantidad</h2>
        </div>
        {props?.map((producto) => {
          if (producto.count !== 0) {
            return (
              <div
                key={producto.nombre}
                className=" bg-indigo-200 grid grid-cols-2 border boder-1 border-black m-1 justify-between items-center"
              >
                <h1 className=" text-left pl-2">{producto.nombre}</h1>
                <h2>{producto.count}</h2>
              </div>
            );
          }
        })}
      </div>
      <section className="flex justify-center items-center">
        <button className="btn-w" onSubmit={handleSubmit()}>
          <BiSend className="BiSend" />
        </button>
      </section>
    </div>
  );
};

export default Store;
