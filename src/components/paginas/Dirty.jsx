import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetError } from "../../redux/actions/paginas/adult.js";
import { pdi } from "../../redux/actions/paginas/dirty.js";
import TextareaForm from "../resource/Textarea";

const Dirty = () => {
  const [input, setInput] = useState([]);
  const [codi, setCodi] = useState(input);
  const dispatch = useDispatch();
  const reporte = useSelector((state) => state.spg);
  const errors = useSelector((state) => state.error);
  // const [error, setError] = useState(errors);

  useEffect(() => {
    // Llama a la acción de reinicio cuando el componente se desmonte
    return () => {
      dispatch(resetError());
    };
  }, [input, dispatch]);

  const handleTextarea = (event) => {
    setInput(event.target.value);
    setCodi(() => {
      const regex = /(\w+)\s+(\d+(?:,\d+)?)\s+(euro|dolar)/g;

      const matches = [...event.target.value.matchAll(regex)];

      const result = matches
        .map((match) => ({
          user: match[1],
          plata: parseFloat(match[2].replace(",", ".")),
          moneda: match[3],
        }))
        .filter((item) => item.plata !== 0.0)
        .sort((a, b) => a.user.localeCompare(b.user));
      return result;
    });
  };

  const handlerSubmit = () => {
    dispatch(pdi(codi));
    setInput([]);
    setCodi([]);
  };
  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <TextareaForm
          value={input}
          onChange={handleTextarea}
          onSubmit={handlerSubmit}
          placeholder="Pegue aquí el corte de Dirty"
          titulo="Corte De Dirty"
        />
        <div className="mt-24">
          {errors && <p className="error">{errors.message}</p>}
        </div>
      </div>

      <div className="contenedor3">
        <div className="contenedor4">
          <h2 className="titulo">Creditos a Subir</h2>
          {codi?.map((x, i) => {
            return (
              <div key={i}>
                <h3 className="mostrarcorte">
                  <p>{i + 1}</p>
                  <p>Nombre: {x.user} </p>
                  <p>Dinero: {x.plata} </p>
                  <p>Moneda: {x.moneda} </p>
                  <br />
                </h3>
                <br />
              </div>
            );
          })}
        </div>

        <div className="contenedor4">
          <h2 className="titulo">Creditos subidos</h2>
          {!errors && (
            <div>
              {reporte?.map((x, i) => {
                return (
                  <div key={x.id}>
                    <h3 className="mostrarcorte">
                      <p>{i + 1}</p>
                      <p>Nombre: {x.userName}</p>
                      <p>Dinero: {x.plata}</p>
                      <p>Modenda: {x.moneda}</p>
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

export default Dirty;
