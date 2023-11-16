import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TiPlusOutline, TiMinusOutline } from "react-icons/ti";
import { searchProducto } from "../../redux/actions/registro/registerProductos.js";
import { getAllUserIdName } from "../../redux/actions/registro/registerUser.js";
import { getAllQuincena } from "../../redux/actions/registro/registerQuincena.js";

const Ventas = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos);
  const allUserIdName = useSelector((state) => state.allUserIdName);
  const quincenas = useSelector((state) => state.quincenas);
  const [quincenaId, setQuincenaId] = useState("");
  const [userId, setUserId] = useState("");
  const [venta, setVenta] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const [maxCuotas, setMaxCuotas] = useState(0);
  const [cuotas, setCuotas] = useState({});

  useEffect(() => {
    dispatch(searchProducto());
    dispatch(getAllQuincena());
    dispatch(getAllUserIdName());
  }, [dispatch]);

  const handleVentas = (producto) => {
    const nuevaCantidad = cantidades[producto.id] || 0;
    const nuevasCuota = cuotas[producto.id] || 0;
  
    // Verifica que la cantidad y las cuotas sean mayores a cero
    if ((nuevaCantidad === 0 || nuevaCantidad > 0) && (nuevasCuota === 0 || nuevasCuota > 0)) {
      // Agrega los detalles a la venta
      const ventaItem = {
        productoId: producto.id,
        userId,
        quincenaId,
        cantidad: nuevaCantidad,
        cuotas: nuevasCuota,
      };
  
      // Verifica si el producto ya está en la lista de ventas
      if (!venta.find((item) => item.productoId === producto.id)) {
        setVenta([...venta, ventaItem]);
      }
    }
    const nuevasCantidades = { ...cantidades };
  
    if (producto.id in nuevasCantidades) {
      if (nuevasCantidades[producto.id] < producto.existencia) {
        nuevasCantidades[producto.id] += 1;
      } else {
        return;
      }
    } else {
      nuevasCantidades[producto.id] = 0;
    }
  
    setCantidades(nuevasCantidades);
  
    const nuevasCuotas = { ...cuotas };
  
    if (producto.id in nuevasCuotas) {
      if (nuevasCantidades[producto.id] < producto.existencia) {
        nuevasCantidades[producto.id] += 1;
      } else {
        return;
      }
    } else {
      nuevasCuotas[producto.id] = 0;
    }
  
    setCuotas(nuevasCuotas);
  };

  useEffect(() => {
    if (quincenaId && quincenas) {
      const quincenaIndex = quincenas.findIndex((q) => q.id === quincenaId);

      if (quincenaIndex !== -1) {
        const quincenasRestantes = quincenas.length - quincenaIndex;
        setMaxCuotas(quincenasRestantes);
        // Resetea el número de cuotas cuando cambia la quincena
      }
    }
  }, [quincenaId, quincenas]);

  const handleModificarCantidad = (productoId, cantidad) => {
    const nuevasCantidades = { ...cantidades };

    if (productoId in nuevasCantidades) {
      nuevasCantidades[productoId] = Math.max(
        0,
        nuevasCantidades[productoId] + cantidad
      );
    }

    setCantidades(nuevasCantidades);

    // Actualiza la cantidad del producto en la lista de ventas
    const productoEnVenta = venta.find((x) => x.id === productoId);
    if (productoEnVenta) {
      productoEnVenta.cantidad = nuevasCantidades[productoId];
      setVenta([...venta]); // Actualiza la lista de ventas
    }
  };

  const handleModificarCuotas = (productoId, incremento) => {
    const nuevasCuotas = { ...cuotas };

    if (productoId in nuevasCuotas) {
      nuevasCuotas[productoId] = Math.max(
        0,
        nuevasCuotas[productoId] + incremento
      );
    }

    if (
      nuevasCuotas[productoId] >= 1 &&
      nuevasCuotas[productoId] <= maxCuotas
    ) {
      setCuotas(nuevasCuotas);

      // Actualiza las cuotas del producto en la lista de ventas
      const productoEnVenta = venta.find((x) => x.id === productoId);
      if (productoEnVenta) {
        productoEnVenta.cuotas = nuevasCuotas[productoId];
        setVenta([...venta]); // Actualiza la lista de ventas
      }
    }
  };

  const handleQuincena = (event) => {
    setQuincenaId(event.target.value);
  };

  const handleUser = (event) => {
    setUserId(event.target.value);
  };

  const handleEliminarProducto = (productoId) => {
    const nuevaVenta = venta.filter((x) => x.id !== productoId);
    setVenta(nuevaVenta);
  };
  console.log(venta);
  // console.log(cantidades);
  // console.log(cuotas);
  return (
    <div className="contenedorVentas pt-12">
      <div className="contenedorVentas2 overflow-x-auto">
        <h1 className="text-2xl font-bold">VENTAS DE PRODUCTOS</h1>

        {quincenaId && userId && (
          <div className="grid grid-cols-3 ">
            {productos?.map((x) => {
              if (x.existencia > 0) {
                return (
                  <div key={x.id}>
                    <section className="sectionProducto">
                      <section>
                        <img
                          src={x.imagen}
                          alt={x.nombre}
                          className="min-w-full  rounded-2xl"
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
                          <h1>Precio</h1>{" "}
                          <h2>
                            {Intl.NumberFormat("es-CP").format(x.precioVenta)}
                          </h2>
                        </section>
                        <section>
                          <h1>Diferido </h1>{" "}
                          <h2>
                            {Intl.NumberFormat("es-CP").format(
                              x.precioVentaDiferido
                            )}
                          </h2>
                        </section>
                        <section>
                          <h1>disponible</h1>{" "}
                          <h2>{Intl.NumberFormat().format(x.existencia)}</h2>
                        </section>
                      </section>
                      <div className="grid grid-cols-2 px-2 border-2 border-indigo-700 mx-4">
                        <h1>Cantidad</h1>
                        <section className="flex item-center justify-between w-24 mx-auto">
                          <button
                            onClick={() => handleModificarCantidad(x.id, -1)}
                            disabled={
                              !cantidades[x.id] || cantidades[x.id] === 0
                            }
                          >
                            <TiMinusOutline />
                          </button>

                          <h1>{cantidades[x.id] || 0}</h1>

                          <button
                            onClick={() => handleModificarCantidad(x.id, 1)}
                            disabled={cantidades[x.id] >= x.existencia}
                          >
                            <TiPlusOutline />
                          </button>
                        </section>

                        <h1>Cuotas</h1>
                        <section className="flex item-center justify-between w-24 mx-auto">
                          <button
                            onClick={() => handleModificarCuotas(x?.id, -1)}
                          >
                            <TiMinusOutline />
                          </button>

                          <h1>
                            {cuotas[x?.id] >= maxCuotas
                              ? maxCuotas
                              : cuotas[x?.id] || 0}
                          </h1>

                          <button
                            onClick={() => handleModificarCuotas(x?.id, 1)}
                          >
                            <TiPlusOutline />
                          </button>
                        </section>
                      </div>
                      <section className="flex justify-center">
                        <button
                          className="btn-n"
                          onClick={() => handleVentas(x)}
                          disabled={venta.find((p) => p.productoId === x.id)}
                        >
                          Agregar
                        </button>
                      </section>
                    </section>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
      <div className="contenedorVentas3">
        <div className="divTitulo">
          <h1 className="titulo">Pedido</h1>
        </div>
        <div className="flex justify-center items-center">
          <select className="select" onChange={handleQuincena}>
            <option value="">Seleccione Una Quincena</option>
            {quincenas &&
              quincenas?.map((x) => (
                <option value={x.id} key={x.id}>
                  {x?.nombre}
                </option>
              ))}
          </select>
        </div>
        <div className="flex justify-center items-center">
          <select className="select" onChange={handleUser}>
            <option value="" hidden>
              Seleccione El Usuario
            </option>
            {allUserIdName &&
              allUserIdName?.map((x) => (
                <option value={x?.id} key={x?.id}>
                  {x?.nombre.split(" ")[0]} {x?.apellido?.split(" ")[0]}
                </option>
              ))}
          </select>
        </div>
        <div className="text-center">
          {venta.length > 0 && (
            <table className="border-collapse border border-indigo-700 m-auto mt-4">
              <thead>
                <tr>
                  <th className="border border-indigo-700 p-2">Nombre</th>
                  <th className="border border-indigo-700 p-2">Cantidad</th>
                  <th className="border border-indigo-700 p-2">Cuotas</th>
                  <th className="border border-indigo-700 text-red-600 font-bold text-xl">
                    X
                  </th>
                </tr>
              </thead>
              <tbody>
                {venta.map((f) => (
                  <tr key={f?.productoId} className="bg-indigo-400">
                    <td className="border border-indigo-700 p-2">
                      {f?.productoId}
                    </td>
                    <td className="border border-indigo-700 p-2">
                      {f?.cantidad}
                    </td>
                    <td className="border border-indigo-700 p-2">
                      {f?.cuotas}
                    </td>
                    <td className="border border-indigo-700 p-2">
                      <TiMinusOutline
                        onClick={() => handleEliminarProducto(f?.productoId)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {quincenaId && userId && (
            <button className="btn-n mt-4">Comprar</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ventas;
