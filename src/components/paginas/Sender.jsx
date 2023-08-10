import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ps } from "../../redux/actionSender.js";
import { resetError } from "../../redux/actionAdult.js";
import TextareaForm from "../Textarea.jsx";

const Sender = () => {
  const dispatch = useDispatch();
  const reporte = useSelector((state) => state.spg);
  const errors = useSelector((state) => state.error);

  const [input, setInput] = useState([]);
  const [cs, setCs] = useState([]);

  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  const handleTextareaChange = (event) => {
    setInput(event.target.value);
    // Procesa la entrada aquí mismo y actualiza corteChat
    const lines = event.target.value.split("\n");
    const data = [];

    for (const line of lines) {
      const [user, coins, fecha, _, euros] = line.split("\t");
      if (user && coins && fecha && euros) {
        data.push({
          user: user.trim(),
          coins: parseInt(coins.trim()),
          fecha: fecha.trim(),
          euros: parseFloat(euros.trim().replace(",", ".")),
        });
      }
    }
    data.sort((a, b) => {
      return a.user.localeCompare(b.user);
    });
    setCs(data);
  };

  const handleTextareaSubmit = () => {
    dispatch(ps(cs));
    setInput([]);
    setCs([]);
  };

  return (
    <div className="min-h-screen bg-fuchsia-400 top-0">
      <div className="pt-14 text-center">
        <TextareaForm
          value={input}
          onChange={handleTextareaChange}
          onSubmit={handleTextareaSubmit}
          placeholder="Pegue aquí el corte de Sender"
          titulo="Corte De Sender"
        />
        <div>
          {errors && (
            <p className="font-bold bg-black text-red-600 max-w-md m-auto">
              {errors}
            </p>
          )}
        </div>
      </div>

      <div className="flex mt-24 justify-center">
        <div className="mt-8 font-bold m-10 px-10 py-3 bg-fuchsia-300 max-w-md">
          <h2 className="text-2xl text-center text-fuchsia-700">
            Creditos a subir
          </h2>
          {cs?.map((x, i) => {
            return (
              <div key={i}>
                <h3 className="border-b-2 border-black">
                  <p>{i+1}</p>
                  <p>Nombre: {x.user}</p>
                  <p>Coins: {x.coins}</p>
                  <p>Euros: {x.euros}</p>
                  <p>Fecha: {x.fecha}</p>
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
                      <p>{i+1}</p>
                      <p>Nombre: {x.userName}</p>
                      <p>Coins: {x.coins}</p>
                      <p>Euros: {x.euros}</p>
                      <p>Fecha: {x.fecha}</p>
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

export default Sender;
