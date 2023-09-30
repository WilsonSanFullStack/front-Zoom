import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ppad, resetError } from "../../../redux/actions/paginas/adult.js";
import TextareaForm from "../../Textarea.jsx";

function Adultparcial() {
  const reporte = useSelector((state) => state.spg);
  const errors = useSelector((state) => state.error);
  const [input, setInput] = useState([]);
  const [copad, setCopad] = useState(input);
  const dispatch = useDispatch();

  useEffect(() => {
    // Llama a la acción de reinicio cuando el componente se desmonte
    return () => {
      dispatch(resetError());
    };
  }, [input, dispatch]);

  const handleTextarea = (event) => {
    setInput(event.target.value),
      setCopad(() => {
        const regex = /(\w+)\s+(?:Performs on a Webcam|Escorts).*?(\d+\.\d+)/g;
        const extractedData = [];

        let match;
        while ((match = regex.exec(event.target.value)) !== null) {
          const user = match[1];
          const creditos = parseFloat(match[2]);
          extractedData.push({ user, creditos, parcial: true });
          extractedData.sort((a, b) => {
            return a.user.localeCompare(b.user);
          });
        }
        return extractedData;
      });
  };

  const handlerSubmit = () => {
    dispatch(ppad(copad));
    setInput([]);
    setCopad([]);
  };

  return (
    <div className="min-h-screen bg-fuchsia-400 top-0">
      <div className="pt-14 text-center">
        <div className="w-full px-20 h-80 mb-8">
          <TextareaForm
            value={input}
            onChange={handleTextarea}
            onSubmit={handlerSubmit}
            placeholder="Pegue aquí el corte de Adult Parcial"
            titulo="Corte De Adult Parcial"
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
        <div className="mt-8 font-bold m-10 px-20 py-3 bg-fuchsia-300 max-w-md ">
          <h2 className="f text-2xl text-center text-fuchsia-700">
            Creditos a subir
          </h2>
          {copad?.map((x, i) => {
            return (
              <div key={i}>
                <h3 className="border-b-2 border-black">
                  <p>Nombre: {x.user}</p>
                  <p>Parcial: {x.parcial}</p>
                  <p>Creditos: {x.creditos}</p>
                  <br />
                </h3>
                <br />
              </div>
            );
          })}
        </div>

        <div className="mt-8 font-bold m-10 px-6 py-3 bg-fuchsia-300 max-w-xl">
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

export default Adultparcial;
