import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pam } from "../../redux/actions/paginas/amateur.js";
import { resetError } from "../../redux/actions/paginas/adult.js";

import TextareaForm from "../Textarea.jsx";

const Amateur = () => {
  const [input, setInput] = useState([]);
  const [coam, setCoam] = useState(input);
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

    const exchangeRate = 2000; // 2000 tokens = 1 dolar

    const regex = /^(\w+)\s+[\d.,]+\s+([\d.]+)/gm;
const matches = [...event.target.value.matchAll(regex)];

const result = matches.map(match => {
  const [, user, tokens] = match;
  const tokensValue = parseFloat(tokens.replace(',', ''));
  const dolaresValue = parseFloat((tokensValue / exchangeRate).toFixed(2));
  return { user, tokens: tokensValue, dolares: dolaresValue };
});

    result.sort((a, b) => {
      return a.user.localeCompare(b.user);
    });

    setCoam(result); // Cambia setCoam(() => result);
  };

  const handlerSubmit = () => {
    dispatch(pam(coam));
    setInput([]);
    setCoam([]);
  };
  return (
    <div className="min-h-screen bg-fuchsia-400 top-0">
      <div className="pt-14 text-center">
        <div className="w-full px-20 h-80 mb-8">
          <TextareaForm
            value={input}
            onChange={handleTextarea}
            onSubmit={handlerSubmit}
            placeholder="Pegue aquí el corte de Amateur"
            titulo="Corte De Amateur"
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
          {coam?.map((x, i) => {
            return (
              <div key={i}>
                <h3 className="border-b-2 border-black">
                  <p>{i + 1}</p>
                  <p>Nombre: {x.user}</p>
                  <p>Tokens: {x.tokens}</p>
                  <p>Dolares: {x.dolares}</p>
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
                      <p>Tokens: {x.tokens}</p>
                      <p>Dolares: {x.dolares}</p>
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

export default Amateur;
