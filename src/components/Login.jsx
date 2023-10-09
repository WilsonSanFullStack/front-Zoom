import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

const INIT = import.meta.env.VITE_REACT_APP_URL_INIT;

const Login = () => {

  return (
    <div className="min-h-screen bg-indigo-200">
      <div className="pt-48 flex flex-col justify-between items-center  ">
        <h1 className=" text-5xl font-bold animate-bounce">
          BIENVENIDO A ZOOM VIRTUEL
        </h1>
        <h1 className="m-10 text-3xl font-bold">POR FAVOR INICIE SESION</h1>
        
        <Link to={INIT}>
          <button className="btn-w justify-between items-center border-2 border-black border-b-8 border-l-8 hover:scale-125">
            <FcGoogle className=" text-9xl p-1 justify-between items-center" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
