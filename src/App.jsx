import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Adultregular from "./components/Adultregular.jsx";
import Adultparcial from "./components/Adultparcial.jsx";
import Home from "./components/Home.jsx";
import Estadisticas from "./components/Estadisticas.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/estadisticas"
          element={<Estadisticas component={Estadisticas} />}
        />
        <Route
          path="/estadisticas/carga/adultparcial"
          element={<Adultparcial component={Adultparcial} />}
        />
        <Route
          path="/estadisticas/carga/adultregular"
          element={<Adultregular component={Adultregular} />}
        />
        <Route path="/" element={<Home component={Home} />} />
      </Routes>
    </div>
  );
}

export default App;
