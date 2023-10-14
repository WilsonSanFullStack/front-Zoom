import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// iconos
// import { BiTrash } from "react-icons/bi"; eliminar
import { BiStoreAlt } from "react-icons/bi"; //tienda
import { TiPlusOutline } from "react-icons/ti"; //suma
import { TiTickOutline } from "react-icons/ti"; //add
import { TiMinusOutline } from "react-icons/ti"; //menos
//iconos

import Producto from "./Producto.jsx";
import Descripcion from "./Descripcion.jsx";
import Store from "./Store.jsx";

import { getAllProductos } from "../redux/actions/registro/registroProductos.js";

const Ventas = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos);
  console.log(productos);
  const [showProduct, setShowProduct] = useState({});
  const [counters, setCounters] = useState([]);
  const [showStore, setShowStore] = useState(false);

  const handleStore = () => {
    setShowStore((showStore) => !showStore);
  };

  const toggleProduct = (productId) => {
    // Use a copy of the current state to avoid mutating the state directly
    setShowProduct((prevShowProduct) => ({
      ...prevShowProduct,
      [productId]: !prevShowProduct[productId], // Toggle the visibility
    }));
  };

  useEffect(() => {
    const initialVisibleProducts = {};
    // For example, make the product with ID 'someProductId' initially visible
    initialVisibleProducts["someProductId"] = true;
    setShowProduct(initialVisibleProducts);
  }, []);

  const incrementCounter = (productId) => {
    // Find the counter object for the given product ID
    const updatedCounters = [...counters];
    const counterIndex = updatedCounters?.findIndex((counter) => counter.nombre === productId);

    if (counterIndex !== -1) {
      updatedCounters[counterIndex].count += 1;
    } else {
      updatedCounters.push({ nombre: productId, count: 1 });
    }

    setCounters(updatedCounters);
  };

  const decrementCounter = (productId) => {
    const updatedCounters = [...counters];
    const counterIndex = updatedCounters.findIndex((counter) => counter.nombre === productId);

    if (counterIndex !== -1 && updatedCounters[counterIndex].count > 0) {
      updatedCounters[counterIndex].count -= 1;
    }

    setCounters(updatedCounters);
  };

  useEffect(() => {
    dispatch(getAllProductos());
  }, [dispatch]);

  console.log(counters);

  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <div onClick={handleStore} className="w-10 h-10">
          <BiStoreAlt className="btn-w w-10 h-8 justify-end right-4 absolute m-5 scale-150" />
        </div>
        <h1 className="text-2xl font-bold">VENTAS DE PRODUCTOS</h1>
        {showStore && <Store props={counters}/>}

        <div className="grid grid-cols-5 justify-between p-5">
          {productos?.map((x) => {
            return (
              <div key={x.id}>
                <section onClick={() => toggleProduct(x.id)}>
                  <div>
                    <Producto props={x} />
                  </div>

                  {showProduct[x.id] && (
                    <div>
                      <Descripcion props={x} />
                    </div>
                  )}
                </section>
                <div className="divButtonP">
                  <TiMinusOutline
                    className="btnStore"
                    onClick={() => decrementCounter(x.nombre)}
                  />
                  <p className="mx-1 bg-indigo-200 rounded-md px-2">
                    {counters && counters.find((counter) => counter.nombre === x.nombre)?.count || 0}
                  </p>
                  <TiPlusOutline
                    className="btnStore"
                    onClick={() => incrementCounter(x.nombre)}
                  />
                  <TiTickOutline className="btnStore" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ventas;
