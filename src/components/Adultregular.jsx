import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCorte } from '../redux/actionAdult.js'

function Adult() {
  const [input, setInput] = useState([])
  const [datas, setDatas] = useState(input);
  const dispatch = useDispatch();
  const reporte = useSelector((state) => state.estadoInicial);


  const handleTextarea = (event) => {
    setInput(event.target.value),
    setDatas(() => {
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
          key: key,
        });
      }
      return result;
    });
  };

  
  
  const handlerSubmit = () => {
    dispatch(postCorte(datas))
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
            </div>
          </div>
          
          <div>{datas?.map((x) => {
            return (
              <div key={x.key}>
                <p>Nombre: {x.user}</p><p>Creditos: {x.creditos}</p><p>fecha Creditos: {x.fecha}</p>
                <br />
              </div>
            )
          })}</div>

          <div>{reporte?.map((x) => {
            return (
              <div key={x.id}>
                <h3><p>Nombre: {x.userName}</p><p>Creditos: {x.creditos}</p><p>fecha Creditos: {x.fecha}</p><p>fecha creacion: {x.createdAt}</p></h3>
                <br />
              </div>
            )
          })}</div>
    </>
  )
}

export default Adult;
