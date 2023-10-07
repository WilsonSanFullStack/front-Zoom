import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiSend } from "react-icons/bi";

import { getAllUser } from "../../redux/actions/registro/registroUser.js";
import {
  postLocation,
  getAllLocation,
} from "../../redux/actions/registro/registerLocation.js";
import { useNavigate } from "react-router-dom";

const validationsError = (locations, users) => {
  let error = {};

  // if (!locations.departamento) {
  //   error.departamento = "Error debe elegir un departamento";
  // }

  // if (!locations.city) {
  //   error.city = "Error debe elegir una ciudad";
  // }

  if (!locations.ubicacion) {
    error.ubicacion = "Error debe seleccionar una ubicación";
  }

  if (!locations.porcentaje) {
    error.porcentaje = "Error usted debe elegir un porcentaje para el usuario";
  }

  if (!locations.userId) {
    error.userId = "Error debe seleccionar un usuario";
  } else {
    const userWithPorcentaje = users.find(
      (user) => user.id === locations.userId
    );
    if (userWithPorcentaje.p_u !== null){
      if (userWithPorcentaje && userWithPorcentaje.p_u.porcentaje !== null) {
      error.p_u =
        "El usuario ya tiene un porcentaje asignado por favor diríjase a la parte de edición de porcentaje.";
    }}
  }

  if (!locations.inicial || !locations.meta) {
    error.numeros =
      "Error el porcentaje elegido debe tener un número inicial y un número en la meta, gracias";
  }

  return error;
};

const departamentAndMunicipios = {
  Amazonas: ["Leticia", "Puerto Nariño"],
  Antioquia: ["Medellín", "Bello", "Envigado", "Itagüí", "Rionegro"],
  Arauca: ["Arauca", "Saravena", "Arauquita"],
  Atlántico: ["Barranquilla", "Soledad", "Malambo"],
  Bolívar: ["Cartagena", "Barranquilla", "Soledad"],
  Boyacá: ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá"],
  Caldas: ["Manizales", "La Dorada", "Chinchiná"],
  Caquetá: ["Florencia", "San Vicente del Caguán", "Belén de los Andaquíes"],
  Casanare: ["Yopal", "Villanueva", "Aguazul"],
  Cauca: ["Popayán", "Santander de Quilichao", "Piendamó"],
  Cesar: ["Valledupar", "Aguachica", "La Jagua de Ibirico"],
  Chocó: ["Quibdó", "Nuquí", "Istmina"],
  Córdoba: ["Montería", "Planeta Rica", "Sahagún"],
  Cundinamarca: ["Soacha", "Zipaquirá", "Girardot"],
  Guainía: ["Inírida", "Barranco Minas"],
  Guaviare: ["San José del Guaviare", "El Retorno"],
  Huila: ["Neiva", "Pitalito", "Garzón"],
  "La Guajira": ["Riohacha", "Maicao", "Uribia"],
  Magdalena: ["Santa Marta", "Ciénaga", "Fundación"],
  Meta: ["Villavicencio", "Puerto López", "Granada"],
  Nariño: ["Pasto", "Tumaco", "Ipiales"],
  "Norte De Santander": ["Cúcuta", "Ocaña", "Pamplona"],
  Putumayo: ["Mocoa", "Puerto Asís", "Sibundoy"],
  Quindío: ["Armenia", "Calarcá", "La Tebaida"],
  Risaralda: ["Pereira", "Dosquebradas", "Santa Rosa de Cabal"],
  Santander: ["Bucaramanga", "Floridablanca", "Girón"],
  Sucre: ["Sincelejo", "Corozal", "San Marcos"],
  Tolima: ["Ibagué", "Espinal", "Chaparral"],
  "Valle Del Cauca": ["Cali", "Buenaventura", "Palmira"],
  Vaupés: ["Mitú", "Caruru"],
  Vichada: ["Puerto Carreño", "La Primavera"],
  Bogotá: ["Bogota"],
  Exterior: ["Exterior"],
};

const location = ["Concordia", "Casa"];

const porcentaje = [{ nombre: "Casa 80% - 90% ", inicial: 80, meta: 90 }];

const RegisterLocation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUser);
  const globalLocation = useSelector((state) => state.locations);

  console.log(users);
  const [error, setError] = useState({});

  console.log(error);
  // console.log(validationsError(locations))
  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllLocation());
  }, [dispatch]);

  const [locations, setLocations] = useState({
    // departamento: "",
    // city: "",
    ubicacion: "",
    porcentaje: "",
    inicial: "",
    meta: "",
    userId: "",
  });
  console.log(locations);

  const handleUserId = (event) => {
    setLocations({
      ...locations,
      userId: event.target.value,
    });
    setError(
      validationsError(
        {
          ...locations,
          userId: event.target.value,
        },
        users
      )
    );
  };

  // const handleDepartament = (event) => {
  //   const selectDepartament = event.target.value;
  //   setLocations({
  //     ...locations,
  //     departamento: selectDepartament,
  //     city: "",
  //   });

  //   setError(
  //     validationsError(
  //       {
  //         ...locations,
  //         departamento: event.target.value,
  //       },
  //       users
  //     )
  //   );
  // };

  // const handleCity = (event) => {
  //   const selectCity = event.target.value;
  //   setLocations({
  //     ...locations,
  //     city: selectCity,
  //   });

  //   setError(
  //     validationsError(
  //       {
  //         ...locations,
  //         city: event.target.value,
  //       },
  //       users
  //     )
  //   );
  // };

  const handlePorcentaje = (event) => {
    const selectPorcentaje = event.target.value;
    const porcentajeObject = porcentaje.find(
      (porcentaje) => porcentaje.nombre === selectPorcentaje
    );
    setLocations({
      ...locations,
      porcentaje: selectPorcentaje,
      inicial: porcentajeObject ? porcentajeObject.inicial : "",
      meta: porcentajeObject ? porcentajeObject.meta : "",
    });

    setError(
      validationsError(
        {
          ...locations,
          porcentaje: selectPorcentaje,
          inicial: porcentajeObject ? porcentajeObject.inicial : "",
          meta: porcentajeObject ? porcentajeObject.meta : "",
        },
        users
      )
    );
  };

  const handleUbicacion = (event) => {
    setLocations({
      ...locations,
      ubicacion: event.target.value,
    });

    setError(
      validationsError(
        {
          ...locations,
          ubicacion: event.target.value,
        },
        users
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validacionFinal = validationsError(locations, users);
    if (Object.keys(validacionFinal).length === 0) {
      console.log(locations);
      dispatch(postLocation(locations));
      setLocations({
        // departamento: "",
        // city: "",
        ubicacion: "",
        porcentaje: "",
        inicial: "",
        meta: "",
        userId: "",
      });
      navigate("/crear");
    }
    setError(validacionFinal);
  };

  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <form onSubmit={handleSubmit}>
          <section className="flex flex-col items-center px-10 bg-indigo-300 minw-min mx-20 rounded-lg m-2 p-1">
            <h1 className="font-bold text-black text-2xl">
              Registro De Ubicacion Porcentaje Y Ciudad
            </h1>

            <section className="setionLocation">
              <h1 className="sectionH1">Modelo:</h1>
              <select
                value={locations.userId}
                onChange={handleUserId}
                className="sectionSelect"
              >
                <option value="" hidden>
                  Seleccione Un Usuario
                </option>
                {users &&
                  users.map((user) => {
                    return (
                      <option value={user.id} key={user.id}>
                        {user.nombre}
                      </option>
                    );
                  })}
              </select>
            </section>
            {error.userId && (
              <div className="text-center text-red-500 font-bold">
                {error.userId}
              </div>
            )}

            {error.p_u && (
              <div className="text-center text-red-500 font-bold">
                {error.p_u}
              </div>
            )}

            {/* <section className="setionLocation">
              <h1 className="sectionH1">Departamento:</h1>
              <select
                value={locations.departamento}
                onChange={handleDepartament}
                className="sectionSelect"
              >
                <option value="" hidden>
                  Seleccione Un Departamento
                </option>
                {Object.keys(departamentAndMunicipios).map((department) => {
                  return (
                    <option value={department} key={department}>
                      {department}
                    </option>
                  );
                })}
              </select>
            </section>
            {error.departamento && (
              <div className="text-center text-red-500 font-bold">
                {error.departamento}
              </div>
            )}

            <section className="setionLocation">
              <h1 className="sectionH1">Ciudad:</h1>
              <select
                value={locations.city}
                onChange={handleCity}
                className="sectionSelect"
              >
                <option value="" hidden>
                  Seleccione Municipio
                </option>
                {departamentAndMunicipios[locations.departamento] &&
                  departamentAndMunicipios[locations.departamento].map(
                    (municipio) => {
                      return (
                        <option value={municipio} key={municipio}>
                          {municipio}
                        </option>
                      );
                    }
                  )}
              </select>
            </section>
            {error.city && (
              <div className="text-center text-red-500 font-bold">
                {error.city}
              </div>
            )} */}

            <section className="setionLocation">
              <h1 className="sectionH1">Locacion:</h1>
              <select
                value={locations.ubicacion}
                onChange={handleUbicacion}
                className="sectionSelect"
              >
                <option value="" hidden>
                  Seleccione Lugar
                </option>
                {location.map((location) => {
                  return (
                    <option value={location} key={location}>
                      {location}
                    </option>
                  );
                })}
              </select>
            </section>
            {error.ubicacion && (
              <div className="text-center text-red-500 font-bold">
                {error.ubicacion}
              </div>
            )}

            <section className="setionLocation">
              <h1 className="sectionH1">Porcentaje:</h1>
              <select
                className="sectionSelect"
                value={locations.porcentaje}
                onChange={handlePorcentaje}
              >
                <option value="" hidden>
                  Seleccione Un Porcentaje
                </option>
                {porcentaje.map((porcentaje) => {
                  return (
                    <option value={porcentaje.nombre} key={porcentaje.nombre}>
                      {porcentaje.nombre}
                    </option>
                  );
                })}
              </select>
            </section>
            {error.porcentaje && (
              <div className="text-center text-red-500 font-bold">
                {error.porcentaje}
              </div>
            )}
            {error.numeros && (
              <div className="text-center text-red-500 font-bold">
                {error.numeros}
              </div>
            )}
          </section>
          <section className="flex items-center justify-center">
            <button className="btn-w w-auto font-bold text-4xl" type="submit">
              <BiSend />
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default RegisterLocation;
