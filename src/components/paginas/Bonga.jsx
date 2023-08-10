import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postBonga } from "../../redux/actionBonga.js";
import { resetError } from "../../redux/actionAdult.js";

const Bonga = () => {
  const [input, setInput] = useState([]);
  const [corteBonga, setCorteBonga] = useState(input);
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
    
    setCorteBonga(() => {
      const lines = event.target.value.split('\n');
      const data = [];
  
      for (const line of lines) {
        if (line.trim() !== '') {
          const [fecha, user, transacciones, tokens, pago] = line.split('\t');
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
    dispatch(postBonga(corteBonga));
    setInput([]);
    setCorteBonga([]);
  };

  return (
    <div className="min-h-screen bg-fuchsia-400 top-0">
      <div className="pt-14 text-center">
        <div className="w-full px-20 h-80 mb-8">
          <h2 className="font-bold">Corte Bonga</h2>
          <textarea
          className="text-m u"
            value={input}
            onChange={handleTextarea}
            name="adult"
            cols="100"
            rows="15"
            placeholder="
              Pege aqui el corte de Chaturbate"
          ></textarea>
        </div>
        <div>
          <div>
            <button onClick={handlerSubmit}  className='btn-w'>ENVIAR</button>
          </div>
          {errors && <p className="font-bold bg-black text-red-600 max-w-md m-auto">{errors}</p>}
        </div>
      </div>
<div className="flex">
      <div className="mt-8 font-bold m-10 px-10 py-3 bg-fuchsia-300 max-w-md">
        <h2 className="text-2xl text-center text-fuchsia-700">Creditos a subir</h2>
        {corteBonga?.map((x, i) => {
          return (
            <div key={i}>
              <h3 className="border-b-2 border-black">
              <p>{i=>1}</p>
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
  <h2 className="text-2xl text-center text-fuchsia-700">Creditos subidos</h2>
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
};
export default Bonga;

