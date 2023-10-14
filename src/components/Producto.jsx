import React, { useState } from "react";

const Producto = ({ props }) => {
  const { id, nombre, imagen } = props;

  return (
    <div>
      <section className="sectionProducto">
        <section>
          <h3 className="font-bold ">{nombre}</h3>
          <img
            src={imagen}
            alt={nombre}
            className=" w-36 rounded-xl border-4 border-indigo-500 mt-2"
          />
        </section>
      </section>
    </div>
  );
};

export default Producto;
