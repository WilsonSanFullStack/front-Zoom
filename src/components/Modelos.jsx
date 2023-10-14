import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../redux/actions/registro/registroUser.js";
import { Link } from "react-router-dom";

const Modelos = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.allUser);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <section className="bg-indigo-100 p-2 flex sm:grid-cols-1 md:grid-cols-3  justify-between">
          {user?.map((user) => {
            return (
              <Link to={`/modelo/${user.id}`} key={user.id}>
                <div
                  key={user.id}
                  className="bg-indigo-300 rounded-2xl m-2 max-w-sm text-left p-2 flex items-center "
                >
                  <p>
                    {user && user?.nombre?.split(" ")[0]} {' '}
                    {user && user?.apellido?.split(" ")[0]}
                  </p>
                  <img src={user.image} alt="imagen" className="img-u" />
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default Modelos;
