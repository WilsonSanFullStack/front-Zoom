import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pil } from "../../redux/actionIsLive.js";
import { resetError } from "../../redux/actionAdult.js";
import TextareaForm from "../Textarea.jsx";

const IsLive = () => {
  const dispatch = useDispatch();
  const reporte = useSelector((state) => state.cil);
  const errors = useSelector((state) => state.error);

  const [input, setInput] = useState([]);
  const [coil, setCoil] = useState(input);

  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  const handleTextarea = (event) => {
    setInput(event.target.value);
    // Procesa la entrada aquí mismo y actualiza corteChat
    const lines = event.target.value.split("\n");
  const promocodePattern = /Promocode:\s+(\d+)/;


  const subtotalPattern = /Subtotaal\s+([\d,]+)/;

  const promocodes = [];
  let currentPromocode = null;
  let currentSubtotal = null;

  for (const line of lines) {
    const promocodeMatch = line.match(promocodePattern);
    const subtotalMatch = line.match(subtotalPattern);

    if (promocodeMatch) {
      currentPromocode = promocodeMatch[1];
    } else if (subtotalMatch) {
      currentSubtotal = parseFloat(subtotalMatch[1].replace(",", "."));
      if (currentPromocode !== null && currentSubtotal !== null) {
        promocodes.push({
          codigo: currentPromocode,
          euros: currentSubtotal,
        });
        currentPromocode = null;
        currentSubtotal = null;
      }
    }
  }
  promocodes.sort((a, b) => {
    return a.codigo.localeCompare(b.codigo);
  })
    setCoil(promocodes);
  };
  const handlerSubmit = () => {
    dispatch(pil(coil));
    setInput([]);
    setCoil([]);
  };

  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <TextareaForm
          value={input}
          onChange={handleTextarea}
          onSubmit={handlerSubmit}
          placeholder="Pegue aquí el Corte De Is Live"
          titulo="Corte De Is Live"
        />
        <div className="mt-24">
          {errors && <p className="error">{errors}</p>}
        </div>
      </div>

      <div className="contenedor3">
        <div className="contenedor4">
          <h2 className="titulo">
            Creditos a subir
          </h2>
          {coil?.map((x, i) => {
            return (
              <div key={i}>
                <h3 className="mostrarcorte">
                  <p>{i + 1}</p>
                  <p>Codigo: {x.codigo}</p>
                  <p>Euros: {x.euros}</p>
                  <br />
                </h3>
                <br />
              </div>
            );
          })}
        </div>
        <div className="contenedor4">
          <h2 className="titulo">
            Creditos subidos
          </h2>
          {!errors && (
            <div>
              {reporte?.map((x, i) => {
                return (
                  <div key={x.id}>
                    <h3 className="mostrarcorte">
                      <p>{i + 1}</p>
                      <p>Codigo: {x.codigo}</p>
                      <p>Euros: {x.euros}</p>
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

export default IsLive;
