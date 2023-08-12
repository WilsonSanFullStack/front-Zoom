import React from "react";
import { Link } from "react-router-dom";

const SeleccionarPagina = () => {
  return (
    <div className="">
      <h3 className="font-bold">
        Click en el Logo de la pagina que desea cargar
      </h3>

      <div className="font-bold grid grid-cols-5 ">
        <section className="w-25 img-e">
          <Link to="/estadisticas/carga/adultregular">
            <p>Corte</p>
            <img src="/AWLogo_on.png" alt="logo AdultWork" />
          </Link>
        </section>
        <section className="w-25 img-e">
          <Link to="/estadisticas/carga/adultparcial">
            <p>Parcial</p>
            <img src="/AWLogo_on.png" alt="logo AdultWork" />
          </Link>
        </section>
        <section className="w-48 img-e">
          <Link to="/estadisticas/carga/chaturbate">
            <p>Chaturbate</p>
            <img src="/Chaturbate_logo.svg" alt="logo Chaturbate" />
          </Link>
        </section>
        <section className="w-48 img-e">
          <Link to="/estadisticas/carga/bonga">
            <p>Bonga</p>
            <img src="/bonga.jpeg" alt="logo Bonga" className="mt-2 rounded-xl"/>
          </Link>
        </section>
        <section className="w-48 img-e">
          <Link to="/estadisticas/carga/sender">
            <p>Sender</p>
            <img src="/livestrip.webp" alt="logo Sender" />
          </Link>
        </section>
        <section className="w-48 img-e flex justify-center">
          <Link to="/estadisticas/carga/dirty">
            <p className='m-1 mb-6 ' >My Dirty</p>
            <img src="/mydirty.png" alt="logo Dirty" />
          </Link>
        </section>
        <section className="img-e w-48 flex justify-center">
          <Link to="/estadisticas/carga/stripchat">
            <p>Stripchat</p>
            <img src="/stripchat.png" alt="logo Stripchat" className='h-28'/>
          </Link>
        </section>
        <section className="w-48 img-e">
          <Link to="/estadisticas/carga/xlove">
            <p>Xlove</p>
            <div className="bg-red-600 mt-6 p-2 rounded-xl">
              <img src="/xlove.png" alt="logo Stripchat" />
            </div>
          </Link>
        </section>
        <section className="w-48 img-e ">
          <Link to="/estadisticas/carga/islive">
            <p>Club Is Live</p>
            <img src="/clubIsLive.png" alt="logo Club Is Live" className="mt-6 rounded-xl h-20"/>
          </Link>
        </section>
        <section className="w-48 img-e">
          <Link to="/estadisticas/carga/">
            <p>Siguiente pagina</p>
            <img src="/" alt="logo siguiente pagina" />
          </Link>
        </section>
      </div>
    </div>
  );
};
export default SeleccionarPagina;
