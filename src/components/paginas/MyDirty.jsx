// import React from 'react'
// import TextareaForm from '../Textarea';

// const MyDirty = () => {
//   const [input, setInput] = useState([]);
//   const [corteChat, setCorteChat] = useState(input);
//   const dispatch = useDispatch();
//   const reporte = useSelector((state) => state.spg);
//   const errors = useSelector((state) => state.error);
//   // const [error, setError] = useState(errors);

//   useEffect(() => {
//     // Llama a la acción de reinicio cuando el componente se desmonte
//     return () => {
//       dispatch(resetError());
//     };
//   }, [dispatch]);

//   const handleTextarea = (event) => {
//     setInput(event.target.value);
//     setCorteChat(() => {
//       const lines = event.target.value.split("\n");
//       const data = [];

//       for (const line of lines) {
//         const [user, tokens, dolares] = line.split("\t");

//         // Verificar si los datos son válidos y cumplen con el formato esperado
//         if (
//           user &&
//           tokens &&
//           dolares &&
//           !isNaN(parseInt(tokens)) &&
//           !isNaN(parseFloat(dolares.replace("$", "")))
//         ) {
//           const tokensValue = parseInt(tokens);
//           const dolaresValue = parseFloat(dolares.replace("$", ""));
//           data.push({
//             user,
//             tokens: tokensValue,
//             dolares: dolaresValue,
//           });
//         }
//       }

//       return data;
//     });
//   };

//   const handlerSubmit = () => {
//     dispatch(postChatur(corteChat));
//     setInput([]);
//     setCorteChat([]);
//   };
//   return (
//     <div>
//       <TextareaForm
//           value={input}
//           onChange={handleTextarea}
//           onSubmit={handlerSubmit}
//           placeholder="Pegue aquí el corte de Sender"
//           titulo="Corte De Sender"
//         />
//     </div>
//   )
// }

// export default MyDirty;
