import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postParcial, resetError } from "../../../redux/actionAdult.js";

function Adultparcial() {
  const reporte = useSelector((state) => state.parcialAdult);
const errors = useSelector((state) => state.error);
  const [input, setInput] = useState([]);
  const [parcial, setParcial] = useState(input);
  // const [error, setError] = useState(errors)
  const dispatch = useDispatch();

useEffect(() => {
  // Llama a la acción de reinicio cuando el componente se desmonte
  return () => {
    dispatch(resetError());
  };
}, [dispatch]);

  const handleTextarea = (event) => {
    setInput(event.target.value),
      setParcial(() => {
        const regex = /(\w+)\s+(?:Performs on a Webcam|Escorts).*?(\d+\.\d+)/g;
        const extractedData = [];

        let match;
        while ((match = regex.exec(event.target.value)) !== null) {
          const user = match[1];
          const creditos = parseFloat(match[2]);
          extractedData.push({ user, creditos, parcial:'si' });
          extractedData.sort((a, b) => {
            return a.user.localeCompare(b.user);
          });
        }
        return extractedData;
      });
  };

  const handlerSubmit = () => {
    dispatch(postParcial(parcial));
    setInput([]);
    setParcial([]);
  };

  return (
    <div className="min-h-screen bg-fuchsia-400 top-0">
      <div className="pt-14 text-center">
        <div className="w-full px-20 h-80 mb-8">
          <h2 className="font-bold">AdultWork Corte Parcial</h2>
          <textarea
          className="text-m u"
            value={input}
            onChange={handleTextarea}
            name="adult"
            cols="100"
            rows="15"
            placeholder="
                Pege aqui el corte parcial de AdultWork"
          ></textarea>
        </div>
        <div>
          <div>
            <button onClick={handlerSubmit} className="btn-w">ENVIAR</button>
          </div>
          {errors && <p className="font-bold bg-black text-red-600 max-w-md m-auto">{errors}</p>}
        </div>
      </div>
<div className="flex ">
      <div className="mt-8 font-bold m-10 px-20 py-3 bg-fuchsia-300 max-w-md ">
      <h2 className="f text-2xl text-center text-fuchsia-700">Creditos a subir</h2>
        {parcial?.map((x, i) => {
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
