import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pch } from "../../redux/actions/paginas/chaturbate.js";
import { resetError } from "../../redux/actions/paginas/adult.js";
import TextareaForm from "../Textarea.jsx";

const Chaturbate = () => {
  const [input, setInput] = useState([]);
  const [coch, setCoch] = useState(input);
  const dispatch = useDispatch();
  const reporte = useSelector((state) => state.spg);
  const errors = useSelector((state) => state.error);
  // const [error, setError] = useState(errors);

  useEffect(() => {
    // Llama a la acción de reinicio cuando el componente se desmonte
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  const handleTextarea = (event) => {
    setInput(event.target.value);
    setCoch(() => {
      const lines = event.target.value.split("\n");
      const data = [];

      for (const line of lines) {
        const [user, tokens, dolares] = line.split("\t");

        // Verificar si los datos son válidos y cumplen con el formato esperado
        if (
          user &&
          tokens &&
          dolares &&
          !isNaN(parseInt(tokens)) &&
          !isNaN(parseFloat(dolares.replace("$", "")))
        ) {
          const tokensValue = parseInt(tokens);
          const dolaresValue = parseFloat(dolares.replace("$", ""));
          data.push({
            user,
            tokens: tokensValue,
            dolares: dolaresValue,
          });
        }
      }

      return data;
    });
  };

  const handlerSubmit = () => {
    dispatch(pch(coch));
    setInput([]);
    setCoch([]);
  };

  return (
    <div className="min-h-screen bg-fuchsia-400 top-0">
      <div className="pt-14 text-center">
        <div className="w-full px-20 h-80 mb-8">
          <TextareaForm
            value={input}
            onChange={handleTextarea}
            onSubmit={handlerSubmit}
            placeholder="Pegue aquí el corte de Chaturbate"
            titulo="Corte De Chaturbate"
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
          {coch?.map((x, i) => {
            return (
              <div key={i}>
                <h3 className="border-b-2 border-black">
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
              {reporte?.map((x) => {
                return (
                  <div key={x.id}>
                    <h3 className="border-b-2 border-black">
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
export default Chaturbate;
