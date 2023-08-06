import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postParcial } from "../redux/actionAdult.js";

function Adultparcial() {
  const [input, setInput] = useState([]);
  const [parcial, setParcial] = useState(input);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const reporte = useSelector((state) => state.estadoInicial);

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
        }
        return extractedData;
      });
  };

  const handlerSubmit = () => {
    dispatch(postParcial(parcial)).catch((error) => {
      setError(error);
    });
    setInput([]);
    setParcial([]);
  };

  return (
    <>
      <div>
        <div>
          <h2>AdultWork Corte Parcial</h2>
          <textarea
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
            <button onClick={handlerSubmit}>ENVIAR</button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>

      <div>
        {parcial?.map((x, i) => {
          return (
            <div key={i}>
              <p>Nombre: {x.user}</p>
              <p>Parcial: {x.parcial}</p>
              <p>Creditos: {x.creditos}</p>
              <br />
            </div>
          );
        })}
      </div>

      <div>
        {reporte?.map((x) => {
          return (
            <div key={x.id}>
              <h3>
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
    </>
  );
}

export default Adultparcial;
