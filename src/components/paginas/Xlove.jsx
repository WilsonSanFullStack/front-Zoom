import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pxl } from "../../redux/actions/paginas/xlove.js";
import { resetError } from "../../redux/actions/paginas/adult.js";

import TextareaForm from "../resource/Textarea.jsx";

const Xlove = () => {
  const [input, setInput] = useState([]);
  const [coxl, setCoxl] = useState(input);
  const dispatch = useDispatch();
  const reporte = useSelector((state) => state.spg);
  const errors = useSelector((state) => state.error);

  useEffect(() => {
    // Llama a la acción de reinicio cuando el componente se desmonte
    return () => {
      dispatch(resetError());
    };
  }, [input, dispatch]);

  const handleTextarea = (event) => {
    setInput(event.target.value);

    setCoxl(() => {
      const lines = event.target.value.trim().split("\n");
      const data = [];

      for (let i = 0; i < lines.length; i++) {
        if (
          !lines[i].includes("*") &&
          !lines[i].includes("=") &&
          !lines[i].includes("TOTAL")
        ) {
          const parts = lines[i].split(/\s+/);
          if (parts.length >= 9) {
            const user = parts[0];
            const euros = parseFloat(parts[parts.length - 2]);
            if (!isNaN(euros) && euros !== 0) {
              data.push({ user, euros });
            }
          }
        }
      }

      data.sort((a, b) => {
        return a.user.localeCompare(b.user); // Cambia userName por user
      });

      return data;
    });
  };

  const handlerSubmit = () => {
    dispatch(pxl(coxl));
    setInput([]);
    setCoxl([]);
  };
  return (
    <div className="min-h-screen bg-fuchsia-400 top-0">
      <div className="pt-14 text-center">
        <div className="w-full px-20 h-80 mb-8">
          <TextareaForm
            value={input}
            onChange={handleTextarea}
            onSubmit={handlerSubmit}
            placeholder="Pegue aquí el corte de Xlove"
            titulo="Corte De Xlove"
          />
        </div>
        <div className="mt-24">
          {errors && (
            <p className="font-bold bg-black text-red-600 max-w-md m-auto">
              {errors.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mt-8 font-bold m-10 px-10 py-3 bg-fuchsia-300 max-w-md">
          <h2 className="text-2xl text-center text-fuchsia-700">
            Creditos a subir
          </h2>
          {coxl?.map((x, i) => {
            return (
              <div key={i}>
                <h3 className="border-b-2 border-black">
                  <p>{i + 1}</p>
                  <p>Nombre: {x.user}</p>
                  <p>Euros: {x.euros}</p>
                  <br />
                </h3>
                <br />
              </div>
            );
          })}
        </div>
        <div className="mt-8 font-bold m-10 px-10 py-3 bg-fuchsia-300 max-w-xl">
          <h2 className="text-2xl text-center text-fuchsia-700">
            Creditos subidos
          </h2>
          {!errors && (
            <div>
              {reporte?.map((x, i) => {
                return (
                  <div key={x.id}>
                    <h3 className="border-b-2 border-black">
                      <p>{i + 1}</p>
                      <p>Nombre: {x.userName}</p>
                      <p>Euros: {x.euros}</p>
                      <p>fecha creacion: {x.createdAt}</p>
                    </h3>
                    <br />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Xlove;
