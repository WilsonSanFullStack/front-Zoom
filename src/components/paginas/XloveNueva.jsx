import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pxln } from "../../redux/actionXloveNueva.js";
import { resetError } from "../../redux/actionAdult.js";

import TextareaForm from "../Textarea.jsx";

const XloveNueva = () => {
  const [input, setInput] = useState([]);
  const [coxln, setCoxln] = useState(input);
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

    setCoxln(() => {
      const pattern =
        /(\w+)\s+(\d{2}-\d{2}-\d{4})\s+(\d{2}-\d{2}-\d{4})\s+Profits:\s+([\d.]+)\s+€[\s\S]*?-5%\s+recovery\s+\(([\d.]+)\s+€\)[\s\S]*?([\d.]+)\s*$/gm;

      const matches = [...event.target.value.matchAll(pattern)];

      const result = matches
        .map((match) => ({
          user: match[1],
          fecha: `${match[2]}-${match[3]}`,
          euros: parseFloat(match[6]),
        }))
        .filter((item) => item.euros !== 0);

      result.sort((a, b) => {
        return a.user.localeCompare(b.user); // Cambia userName por user
      });

      return result;
    });
  };

  const handlerSubmit = () => {
    dispatch(pxln(coxln));
    setInput([]);
    setCoxln([]);
  };
  return (
    <div className="min-h-screen bg-fuchsia-400 top-0">
      <div className="pt-14 text-center">
        <div className="w-full px-20 h-80 mb-8">
          <TextareaForm
            value={input}
            onChange={handleTextarea}
            onSubmit={handlerSubmit}
            placeholder="Pegue aquí el corte de Xlove Nueva"
            titulo="Corte De Xlove Nueva"
          />
        </div>
        <div className="mt-24">
          {errors && (
            <p className="font-bold bg-black text-red-600 max-w-md m-auto">
              {errors}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mt-8 font-bold m-10 px-10 py-3 bg-fuchsia-300 max-w-md">
          <h2 className="text-2xl text-center text-fuchsia-700">
            Creditos a subir
          </h2>
          {coxln?.map((x, i) => {
            return (
              <div key={i}>
                <h3 className="border-b-2 border-black">
                  <p>{i + 1}</p>
                  <p>Nombre: {x.user}</p>
                  <p>Euros: {x.euros}</p>
                  <p>Fecha: {x.fecha}</p>
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
                      <p>{i}</p>
                      <p>Nombre: {x.userName}</p>
                      <p>Fecha: {x.fecha}</p>
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

export default XloveNueva;