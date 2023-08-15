import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { psk } from "../../redux/actionSkype.js";
import { resetError } from "../../redux/actionAdult.js";

import TextareaForm from '../Textarea.jsx';

const Skype = () => {
  const [input, setInput] = useState([]);
  const [cosk, setCosk] = useState(input);
  const dispatch = useDispatch();
  const reporte = useSelector((state) => state.spg);
  const errors = useSelector((state) => state.error);

  useEffect(() => {
    // Llama a la acción de reinicio cuando el componente se desmonte
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  const handleTextarea = (event) => {
    setInput(event.target.value);

    setCosk(() => {
      const lines = event.target.value.split("\n");
      const data = [];

      for (const line of lines) {
        if (line.trim() !== "") {
          const [fecha, user, transacciones, tokens, pago] = line.split("\t");
          if (fecha && user && transacciones && tokens && pago) {
            const dolares = parseFloat(pago.substring(1));
            data.push({
              user,
              fecha,
              dolares,
            });
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
    dispatch(psk(cosk));
    setInput([]);
    setCosk([]);
  };
  return (
    <div className="min-h-screen bg-fuchsia-400 top-0">
      <div className="pt-14 text-center">
        <div className="w-full px-20 h-80 mb-8">
          <TextareaForm
            value={input}
            onChange={handleTextarea}
            onSubmit={handlerSubmit}
            placeholder="Pegue aquí el corte de Skype"
            titulo="Corte De Skype"
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
          {cosk?.map((x, i) => {
            return (
              <div key={i}>
                <h3 className="border-b-2 border-black">
                  <p>{i + 1}</p>
                  <p>Nombre: {x.user}</p>
                  <p>Fecha: {x.fecha}</p>
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
                      <p>{i}</p>
                      <p>Nombre: {x.userName}</p>
                      <p>Fecha: {x.fecha}</p>
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
}

export default Skype;
