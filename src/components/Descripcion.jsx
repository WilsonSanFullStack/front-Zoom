import React from "react";

const Descripcion = ({ props }) => {
  const { descripcion } = props;
  return (
    <div>
      <section className="sectionProducto">
        <p>{descripcion}</p>
      </section>
    </div>
  );
};

export default Descripcion;
