import React from "react";
import date from "../js/date.js";

const Fecha = () => {
  
  return (
    <div>
      <section>
        <span>Fecha Hoy: 📆{date()}</span>
      </section>
    </div>
  );
};

export default Fecha;
