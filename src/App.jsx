import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
import Estadisticas from "./components/Estadisticas.jsx";
import Adultregular from "./components/paginas/adult/Adultregular";
import Adultparcial from "./components/paginas/adult/Adultparcial";
import Amateur from "./components/paginas/Amateur.jsx";
import Bonga from "./components/paginas/Bonga.jsx";
import Cam4 from "./components/paginas/Cam4.jsx";
import Chaturbate from "./components/paginas/Chaturbate.jsx";
import Dirty from "./components/paginas/Dirty.jsx";
import IsLive from "./components/paginas/IsLive.jsx";
import Sender from "./components/paginas/Sender.jsx";
import Skype from "./components/paginas/Skype.jsx";
import Stripchat from "./components/paginas/Stripchat.jsx";
import Vx from "./components/paginas/Vx.jsx";
import Xlove from "./components/paginas/Xlove.jsx";
import XloveNueva from "./components/paginas/XloveNueva.jsx";
import Registro from "./components/Registro";
import Login from "./components/Login";
import RegisterUser from "./components/RegisterUser";

function App() {
  const { pathname } = useLocation();
  return (
    <div className="font-mono text-xl">
      {pathname === "/" || pathname === '/registro' && <NavBar />}
      <Routes>
        <Route path="/" element={<Login component={Login} />} />
        <Route path="/registro" element={<RegisterUser component={RegisterUser} />} />
        <Route path="/home" element={<Home component={Home} />} />
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
          path="/estadisticas/carga/amateur"
          element={<Amateur component={Amateur} />}
        />
        <Route
          path="/estadisticas/carga/bonga"
          element={<Bonga component={Bonga} />}
        />
        <Route
          path="/estadisticas/carga/cam4"
          element={<Cam4 component={Cam4} />}
        />
        <Route
          path="/estadisticas/carga/chaturbate"
          element={<Chaturbate component={Chaturbate} />}
        />
        <Route
          path="/estadisticas/carga/dirty"
          element={<Dirty component={Dirty} />}
        />
        <Route
          path="/estadisticas/carga/islive"
          element={<IsLive component={IsLive} />}
        />
        <Route
          path="/estadisticas/carga/sender"
          element={<Sender component={Sender} />}
        />
        <Route
          path="/estadisticas/carga/skype"
          element={<Skype component={Skype} />}
        />
        <Route
          path="/estadisticas/carga/stripchat"
          element={<Stripchat component={Stripchat} />}
        />
        <Route path="/estadisticas/carga/vx" element={<Vx component={Vx} />} />
        <Route
          path="/estadisticas/carga/xlove"
          element={<Xlove component={Xlove} />}
        />
        <Route
          path="/estadisticas/carga/xlovenueva"
          element={<XloveNueva component={XloveNueva} />}
        />
        <Route path="/registro" element={<Registro component={Registro} />} />
      </Routes>
    </div>
  );
}

export default App;
