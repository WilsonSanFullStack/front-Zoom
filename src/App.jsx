import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
import Adultregular from "./components/paginas/adult/Adultregular";
import Adultparcial from "./components/paginas/adult/Adultparcial";
import Bonga from "./components/paginas/Bonga.jsx";
import Chaturbate from "./components/paginas/Chaturbate.jsx";
import Dirty from "./components/paginas/Dirty.jsx";
import IsLive from "./components/paginas/IsLive.jsx";
import Sender from "./components/paginas/Sender.jsx";
import Estadisticas from "./components/Estadisticas.jsx";

function App() {
  const { pathname } = useLocation();
  return (
    <div className="font-mono text-xl">
      {pathname !== "*" && <NavBar />}
      <Routes>
        <Route path="/" element={<Home component={Home} />} />
        //* paginas
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
        <Route
          path="/estadisticas/carga/chaturbate"
          element={<Chaturbate component={Chaturbate} />}
        />
        <Route
          path="/estadisticas/carga/bonga"
          element={<Bonga component={Bonga} />}
        />
        <Route
          path="/estadisticas/carga/sender"
          element={<Sender component={Sender} />}
        />
        <Route
          path="/estadisticas/carga/islive"
          element={<IsLive component={IsLive} />}
        />
        <Route
          path="/estadisticas/carga/dirty"
          element={<Dirty component={Dirty} />}
        />
      </Routes>
    </div>
  );
}

export default App;
