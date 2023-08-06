import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to='/estadisticas'>
        <h3>Estadisticas</h3>
      </Link>
      <Link>
      <h3>Modelos</h3>
      </Link>
    </div>
  );
};
export default Home;
