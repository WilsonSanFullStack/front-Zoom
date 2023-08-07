import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCorte, resetError } from '../../../redux/actionAdult.js'

function Adultregular() {
  const reporte = useSelector((state) => state.corteAdult);
  const errors = useSelector((state) => state.error)
  const [input, setInput] = useState([])
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
      const regex =/Details\s+(\S+)\s+(\S+\s\S+)\s+Cosmo Payment\s+(\S+)\s+(\d+\.\d+)/g;
      const matches = event.target.value.matchAll(regex);
  
      const result = [];
  
      let key = 1;
      for (const match of matches) {
        key = key + 1;
        result.push({
          user: match[1],
          fecha: match[2],
          creditos: parseFloat(match[4], 2),
          parcial: 'no',
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
    <>
      <div>
            <div>
                <h2>AdultWork Corte Regular</h2>
                <textarea
                value={input}
                onChange={handleTextarea}
                  name="adult"
                  cols="100"
                  rows="15"
                  placeholder="
                Pege aqui el o los cortes de AdultWork
                Funcionalidad completa cortes listos trabajando en parciales 60% completo"
                ></textarea>
            </div>
            <div>
              <div><button onClick={handlerSubmit}>ENVIAR</button></div>
              {errors && <p style={{ color: 'red' }}>{errors}</p>}
            </div>
          </div>
          
          <div>{corte?.map((x, i) => {
            return (
              <div key={i}>
                <p>Nombre: {x.user}</p><p>Parcial: {x.parcial}</p><p>Creditos: {x.creditos}</p><p>fecha Creditos: {x.fecha}</p>
                <br />
              </div>
            )
          })}</div>

          {!errors && (
          <div>{reporte?.map((x) => {
            return (
              <div key={x.id}>
                <h3><p>Nombre: {x.userName}</p><p>Parcial: {x.parcial}</p><p>Creditos: {x.creditos}</p><p>fecha Creditos: {x.fecha}</p><p>fecha creacion: {x.createdAt}</p></h3>
                <br />
              </div>
            )
          })}</div>
          )}
    </>
  )
}

export default Adultregular;
