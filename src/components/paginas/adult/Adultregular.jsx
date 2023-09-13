import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pad, resetError } from "../../../redux/actions/paginas/adult.js";
import TextareaForm from "../../Textarea.jsx";

function Adultregular() {
  const reporte = useSelector((state) => state.spg);
  const errors = useSelector((state) => state.error);
  const [input, setInput] = useState([]);
  const [coad, setCoad] = useState(input);

  const dispatch = useDispatch();

  useEffect(() => {
    // Llama a la acción de reinicio cuando el componente se desmonte
    return () => {
      dispatch(resetError());
    };
  }, [input, dispatch]);

  const handleTextarea = (event) => {
    setInput(event.target.value),
      setCoad(() => {
        const regex =
          /Details\s+(\S+)\s+(\S+\s\S+)\s+Cosmo Payment\s+(\S+)\s+(\d+\.\d+)/g;
        const matches = event.target.value.matchAll(regex);

        const result = [];

        let key = 1;
        for (const match of matches) {
          key = key + 1;
          result.push({
            user: match[1],
            fecha: match[2],
            creditos: parseFloat(match[4], 2),
            parcial: false,
          });
          result.sort((a, b) => {
            return a.user.localeCompare(b.user);
          });
        }
        return result;
      });
  };

  const handlerSubmit = () => {
    dispatch(pad(coad));
    setInput([]);
    setCoad([]);
  };

  return (
    <div className="min-h-screen bg-fuchsia-400 top-0">
      <div className="pt-14 text-center ">
        <TextareaForm
          value={input}
          onChange={handleTextarea}
          onSubmit={handlerSubmit}
          placeholder="Pegue aquí el corte de Adult Regular"
          titulo="Corte De Adult Regular"
        />
        <div className="mt-24">
          {errors && (
            <p className="font-bold bg-black text-red-600 max-w-md m-auto">
              {errors.response.data.error}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="mt-8 font-bold m-6 px-10 py-3 bg-fuchsia-300 max-w-lg">
          <h2 className="f text-2xl text-center text-fuchsia-700">
            Creditos a subir
          </h2>
          {coad?.map((x, i) => {
            return (
              <div key={i}>
                <h3 className="border-b-2 border-black">
                  <p>Nombre: {x.user}</p>
                  <p>Parcial: {x.parcial}</p>
                  <p>Creditos: {x.creditos}</p>
                  <p>fecha Creditos: {x.fecha}</p>
                  <br />
                </h3>
                <br />
              </div>
            );
          })}
        </div>

        <div className="mt-8 m-10 px-6 py-3 bg-fuchsia-300 font-bold max-w-xl">
          <h2 className="f text-2xl text-center text-fuchsia-700">
            Creditos a subidos
          </h2>
          {!errors && (
            <div>
              {reporte?.map((x) => {
                return (
                  <div key={x.id}>
                    <h3 className="border-b-2 border-black">
                      <p>Nombre: {x.userName}</p>
                      <p>Parcial: {x.parcial}</p>
                      <p>Creditos: {x.creditos}</p>
                      <p>fecha Creditos: {x.fecha}</p>
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
}

export default Adultregular;
