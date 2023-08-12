import React from 'react'

const Adultcorte = ({ ca }) => {

  const groupDataByName = (data) => {
    const groupedData = {};
    data.forEach((item) => {
      if (!groupedData[item.userName]) {
        groupedData[item.userName] = [];
      }
      groupedData[item.userName].push(item);
    });
    return groupedData;
  };
  const caGrouped = groupDataByName(ca)
  console.log(caGrouped)

  return (
    <div>
      <section className="bg-blue-300">
        {Object.keys(caGrouped).map((userName, index) => (
          <div key={index}>
            <h2>corte para {userName}</h2>
            <div>
              {caGrouped[userName].map((x, i) => (
                <div key={i}>
                  <p>Numero: {i + 1}</p>
                  <p>Nombre: {x.userName}</p>
                  <p>Parcial: {x.parcial}</p>
                  <p>Creditos: {x.creditos}</p>
                  <p>fecha Creditos: {x.fecha}</p>
                  <p>fecha creacion: {x.createdAt}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Adultcorte;
