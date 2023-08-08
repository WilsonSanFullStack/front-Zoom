import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCorte, resetError } from "../../../redux/actionAdult.js";

function Adultregular() {
  const reporte = useSelector((state) => state.corteAdult);
  const errors = useSelector((state) => state.error);
  const [input, setInput] = useState([]);
  const [corte, setCorte] = useState(input);
  // const [error, setError] = useState(errors);
  const dispatch = useDispatch();

  useEffect(() => {
    // Llama a la acción de reinicio cuando el componente se desmonte
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  const handleTextarea = (event) => {
    setInput(event.target.value),
      setCorte(() => {
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
            parcial: "no",
          });
        }
        return result;
      });
  };

  const handlerSubmit = () => {
    dispatch(postCorte(corte));
    setInput([]);
    setCorte([]);
  };

  return (
    <div className="min-h-screen bg-fuchsia-400 top-0">
      <div className="pt-14 text-center ">
        <div className="w-full px-20 h-80 mb-8">
          <h2 >AdultWork Corte Regular</h2>
          <textarea
            className="text-m u "
            value={input}
            onChange={handleTextarea}
            name="adult"
            placeholder="Pege aqui el o los cortes de AdultWork"
          ></textarea>
        </div>
        <div>
          <div>
            <button onClick={handlerSubmit} className="btn-w">ENVIAR</button>
          </div>
          {errors && <p className="font- bold bg-back text-red-600 max-w-md m-auto">{errors}</p>}
        </div>
      </div>

<div className="flex">
      <div className="mt-8 font-bold m-6 px-10 py-3 bg-fuchsia-300 max-w-lg">
        <h2 className="f text-2xl text-center text-fuchsia-700">Creditos a subir</h2>
        {corte?.map((x, i) => {
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
      <h2 className="f text-2xl text-center text-fuchsia-700">Creditos a subidos</h2>
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
