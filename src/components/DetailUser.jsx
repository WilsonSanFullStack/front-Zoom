import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBI } from "../redux/actions/registro/registroUser.js";
import { useParams, Link } from "react-router-dom";
import { AiOutlineContainer } from "react-icons/ai";
import { getAllPagina } from "../redux/actions/registro/registroPaginas.js";

const DetailUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userBI = useSelector((state) => state.userB);
  const error = useSelector((state) => state.error);
  const paginas = useSelector((state) => state.paginas);

  useEffect(() => {
    dispatch(getUserBI(id));
    dispatch(getAllPagina());
  }, [dispatch]);

  console.log(userBI);
  console.log(error);
  console.log(paginas);

  return (
    <div className="contenedor1 pt-7 px-10">
      <div className="flex grid-cols-2 justify-between text-center items-center">
        <section className="absolute ml-2 left-0 top-20 font-bold">
          <Link to={`/modelo/comment/${userBI.id}`}>
            <p>comentario</p>
            <div className="flex items-center justify-center">
              <AiOutlineContainer className=" text-5xl btn-n" />
            </div>
          </Link>
        </section>
        <div key={userBI?.id} className="m-2">
          <img src={userBI?.image} alt="imagen" className="img-d" />
        </div>
        <section className="m-5 text-right">
          <div className="divDetail">
            Nombre:
            <p className=" detalles">{userBI?.nombre}</p>
          </div>
          <div className="divDetail">
            Apellido:
            <p className="detalles">{userBI?.apellido}</p>
          </div>
          <div className="divDetail">
            Correo:
            <p className="detalles">{userBI?.correo}</p>
          </div>
          <div className="divDetail">
            Cedula:
            <p className="detalles">{userBI?.cedula}</p>
          </div>
          <div className="divDetail">
            Direccion:
            <p className="detalles">{userBI?.direccion}</p>
          </div>
          <div className="divDetail">
            Fecha De Nacmiento:
            <p className="detalles">{userBI?.fechaDeNacimiento}</p>
          </div>
          <div className="divDetail">
            Nacionalidad:
            <p className="detalles">{userBI?.nacionalidad}</p>
          </div>
          <div className="divDetail">
            Telefono:
            <p className="detalles">{userBI?.telefono}</p>
          </div>
          <div className="divDetail">
            WhatsApp:
            <p className="detalles">{userBI?.whatsapp}</p>
          </div>
          <div className="divDetail">
            Fecha De Registro:
            <p className="detalles">{userBI?.createdAt}</p>
          </div>
        <div>
          
          {userBI.useres?.map((x) => {
            return (
              <div key={x.id}>
                <div className="divDetail">
                  {paginas.map((pagina) => {
            if (pagina.id === x.pagina) {
              return (
                <div key={pagina.id}>
                {pagina.nombrePagina}:
                </div>
                );
              }
              return null;
            })} <p className=" text-left mx-5 detalles">{x.userName} </p>
                </div>
              </div>
            );
          })}
          {userBI.comments?.map((x) => {
            return (
              <div key={x.id}>
                <div className="divDetail ">
                  Cometario creado: {x.createdAt}:
                  <p className=" text-left mx-5 detalles">{x.comment}</p>
                </div>
              </div>
            );
          })}
        </div>
          </section>
      </div>
    </div>
  );
};

export default DetailUser;
