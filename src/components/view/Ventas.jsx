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

import { searchProducto } from "../../redux/actions/registro/registerProductos.js";
import { getAllUserIdName } from "../../redux/actions/registro/registerUser.js";

const Ventas = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos);
  const allUserIdName = useSelector((state) => state.allUserIdName);
  const [venta, setVenta] = useState({});

  useEffect(() => {
    dispatch(searchProducto());
    dispatch(getAllUserIdName());
  }, [dispatch]);
  console.log(productos);
  console.log(allUserIdName)

  return (
    <div className="contenedorVentas pt-12">
      <div className="contenedorVentas2 overflow-x-auto">
        <h1 className="text-2xl font-bold">VENTAS DE PRODUCTOS</h1>

        <div className="grid grid-cols-3 ">
          {productos?.map((x) => {
            if (x.existencia >= 0) {
              return (
                <div key={x.id}>
                  <section className="sectionProducto">
                    <section>
                      <img
                        src={x.imagen}
                        alt={x.nombre}
                        className=" h-20 min-w-full  rounded-2xl"
                      />
                    </section>
                    <h3 className="font-bold text-left px-2">{x.nombre}</h3>
                    <p className="p-2 mx-1 font-semibold h-32 overflow-x-auto border-2 border-indigo-500 bg-indigo-200 rounded-lg">
                      {x.descripcion
                        ? x.descripcion
                        : "Sin descripcion del producto :)"}
                    </p>
                    <section className="grid grid-cols-3 text-center font-bold rounded-2xl">
                      <section>
                        <h1>Precio</h1> <h2>{x.precioVenta}</h2>
                      </section>
                      <section>
                        <h1>Diferido </h1> <h2>{x.precioVentaDiferido}</h2>
                      </section>
                      <section>
                        <h1>disponible</h1> <h2>{x.existencia}</h2>
                      </section>
                    </section>
                  </section>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="contenedorVentas3">
        <div className="divTitulo">
          <h1 className="titulo">Pedido</h1>
        </div>
      </div>
    </div>
  );
};

export default Ventas;
