import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postChatur } from "../../redux/actionChatur.js";
import { resetError } from "../../redux/actionAdult.js";

const Chaturbate = () => {
  const [input, setInput] = useState([]);
  const [corteChat, setCorteChat] = useState(input);
  const dispatch = useDispatch();
  const reporte = useSelector((state) => state.corteChat);
  const errors = useSelector((state) => state.error);
  // const [error, setError] = useState(errors);

  useEffect(() => {
    // Llama a la acción de reinicio cuando el componente se desmonte
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  const handleTextarea = (event) => {
    setInput(event.target.value),
      setCorteChat(() => {
        const lines = event.target.value.trim().split("\n");
        const userData = [];

        for (const line of lines) {
          const [user, tokensStr, dolaresStr] = line.trim().split(/\s+/);
          const tokens = parseInt(tokensStr, 10);
          const dolares = parseFloat(dolaresStr?.substring(1));

          userData.push({ user, tokens, dolares });
        }
        return userData;
      });
  };

  const handlerSubmit = () => {
    dispatch(postChatur(corteChat));
    setInput([]);
    setCorteChat([]);
  };

  return (
    <>
      <div>
        <div>
          <h2>Corte Chaturbate</h2>
          <textarea
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
            <button onClick={handlerSubmit}>ENVIAR</button>
          </div>
          {errors && <p style={{ color: "red" }}>{errors}</p>}
        </div>
      </div>

      <div>
        {corteChat?.map((x, i) => {
          return (
            <div key={i}>
              <p>Nombre: {x.user}</p>
              <p>Tokens: {x.tokens}</p>
              <p>Dolares: {x.dolares}</p>
              <br />
            </div>
          );
        })}
      </div>

      {!errors && (
      <div>
        {reporte?.map((x) => {
          return (
            <div key={x.id}>
              <h3>
                <p>Nombre: {x.userName}</p>
                <p>Tokens: {x.tokens}</p>
                <p>Creditos: {x.creditos}</p>
                <p>fecha creacion: {x.createdAt}</p>
              </h3>
              <br />
            </div>
          );
        })}
      </div>
      )}
    </>
  );
};
export default Chaturbate;
