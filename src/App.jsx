import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
  SignUp,
} from "@clerk/clerk-react";

import NavBar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
// import Estadisticas from "./components/Estadisticas.jsx";
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
import Registro from "./components/registro/RegistroUserName.jsx";
import Login from "./components/Login.jsx";
import RegisterUser from "./components/registro/RegisterUser.jsx";
import User from "./components/User.jsx";
import Loading from "./components/Loading.jsx";
import Crear from "./components/Crear.jsx";
import Editar from "./components/Editar";
import RegistrarPagina from "./components/registro/RegistrarPagina.jsx";
import RegistrarProducto from "./components/registro/RegistrarProducto.jsx";
import Modelos from "./components/Modelos.jsx";
import DetailUser from "./components/DetailUser.jsx";
import RegistrarComment from "./components/registro/RegistrarComment.jsx";
import RegistrarQuincena from "./components/registro/RegistrarQuincena.jsx";
import RegistrarMoneda from "./components/registro/RegisterMoneda.jsx";
import CargarEstadisticas from "./components/registro/CargarEstadisticas.jsx";
import Ventas from "./components/Ventas";
import RegisterPorcentaje from "./components/registro/RegisterPorcentaje.jsx";
import RegisterUbicacion from "./components/registro/RegisterUbicacion";

function App() {
  const { pathname } = useLocation();
  return (
    <div className="font-mono text-xl">
      {pathname !== "/" &&
        pathname !== "/registro" &&
        pathname !== "/sign-in" &&
        pathname !== "/loader" && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/loader" element={<Loading />} />
        <Route path="/registro" element={<RegisterUser />} />
        <Route path="/crear/username" element={<Registro />} />
        <Route path="/crear/pagina" element={<RegistrarPagina />} />
        <Route path="/crear/producto" element={<RegistrarProducto />} />
        <Route path="/crear/quincena" element={<RegistrarQuincena />} />
        <Route path="/crear/moneda" element={<RegistrarMoneda />} />
        <Route path="/crear/estadisticas" element={<CargarEstadisticas />} />
        <Route path="/crear/porcentaje" element={<RegisterPorcentaje />} />
        <Route path="/crear/ubicacion" element={<RegisterUbicacion />} />
        <Route path="/crear" element={<Crear />} />
        <Route path="/editar" element={<Editar />} />
        <Route path="/user" element={<User />} />
        <Route path="/modelo" element={<Modelos />} />
        <Route path="/modelo/:id" element={<DetailUser />} />
        <Route path="/modelo/comment/:id" element={<RegistrarComment />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />
        //* paginas
        {/* <Route path="/estadisticas" element={<Estadisticas />} /> */}
        <Route
          path="/estadisticas/carga/adultparcial"
          element={<Adultparcial />}
        />
        <Route
          path="/estadisticas/carga/adultregular"
          element={<Adultregular />}
        />
        <Route path="/estadisticas/carga/amateur" element={<Amateur />} />
        <Route path="/estadisticas/carga/bonga" element={<Bonga />} />
        <Route path="/estadisticas/carga/cam4" element={<Cam4 />} />
        <Route path="/estadisticas/carga/chaturbate" element={<Chaturbate />} />
        <Route path="/estadisticas/carga/dirty" element={<Dirty />} />
        <Route path="/estadisticas/carga/islive" element={<IsLive />} />
        <Route path="/estadisticas/carga/sender" element={<Sender />} />
        <Route path="/estadisticas/carga/skype" element={<Skype />} />
        <Route path="/estadisticas/carga/stripchat" element={<Stripchat />} />
        <Route path="/estadisticas/carga/vx" element={<Vx />} />
        <Route path="/estadisticas/carga/xlove" element={<Xlove />} />
        <Route path="/estadisticas/carga/xlovenueva" element={<XloveNueva />} />
        <Route path="/registrod" element={<Registro />} />
      </Routes>
    </div>
  );
}

export default App;
