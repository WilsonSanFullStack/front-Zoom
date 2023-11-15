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
  const [numCuotas, setNumCuotas] = useState(0);

  useEffect(() => {
    dispatch(searchProducto());
    dispatch(getAllQuincena());
    dispatch(getAllUserIdName());
  }, [dispatch]);

  const handleVentas = (producto) => {
    if (!(producto === venta.find((x) => x.id === producto.id))) {
      setVenta([...venta, producto]);
    }

    const nuevasCantidades = { ...cantidades };

    if (producto.id in nuevasCantidades) {
      if (nuevasCantidades[producto.id] < producto.existencia) {
        nuevasCantidades[producto.id] += 1;
      } else {
        return;
      }
    } else {
      nuevasCantidades[producto.id] = 1;
    }

    setCantidades(nuevasCantidades);
  };

  const handleModificarCantidad = (productoId, cantidad) => {
    const nuevasCantidades = { ...cantidades };

    if (productoId in nuevasCantidades) {
      nuevasCantidades[productoId] = Math.max(
        0,
        nuevasCantidades[productoId] + cantidad
      );
    }

    setCantidades(nuevasCantidades);
  };

  useEffect(() => {
    if (quincenaId && quincenas) {
      const quincenaIndex = quincenas.findIndex((q) => q.id === quincenaId);

      if (quincenaIndex !== -1) {
        const quincenasRestantes = quincenas.length - quincenaIndex;
        setMaxCuotas(quincenasRestantes);
        // Resetea el número de cuotas cuando cambia la quincena
        setNumCuotas(0);
      }
    }
  }, [quincenaId, quincenas]);

  const handleModificarCuotas = (incremento) => {
    if (numCuotas + incremento >= 0 && numCuotas + incremento <= maxCuotas) {
      setNumCuotas(numCuotas + incremento);
    }
  };

  const handleQuincena = (event) => {
    setQuincenaId(event.target.value);
  };

  const handleUser = (event) => {
    setUserId(event.target.value);
  };

  const [ventas, setVentas] = useState([]);

  const handlePedido = (productoId) => {
    // Crea el nuevo objeto con la información necesaria
    const nuevoPedido = {
      quincenaId: quincenaId,
      userId: userId,
      productoId: productoId,
      cantidad: cantidades[productoId],
      cuotas: numCuotas[productoId],
    };

    // Agrega el nuevo objeto al array usando setVentas
    setVentas([...ventas, nuevoPedido]);
  };

  console.log(cantidades);
  return (
    <div className="contenedorVentas pt-12">
      <div className="contenedorVentas2 overflow-x-auto">
        <h1 className="text-2xl font-bold">VENTAS DE PRODUCTOS</h1>

        <div className="grid grid-cols-3 ">
          {productos?.map((x) => {
            const productoId = x.id;
            if (x.existencia > 0) {
              return (
                <div key={x.id}>
                  <section
                    className="sectionProducto"
                    onClick={() => (handleVentas(x), handlePedido(productoId))}
                  >
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
        <div>
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
        <div>
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
          {venta?.map((x) => (
            <div key={x?.id}>
              <h1>{x?.nombre}</h1>
              <section className="flex item-center justify-between w-24 mx-auto">
                <button
                  onClick={() => handleModificarCantidad(x.id, -1)}
                  disabled={!cantidades[x.id] || cantidades[x.id] === 0}
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
                <button onClick={() => handleModificarCuotas(-1)}>
                  <TiMinusOutline />
                </button>

                <h1>{numCuotas}</h1>

                <button onClick={() => handleModificarCuotas(1)}>
                  <TiPlusOutline />
                </button>
              </section>
            </div>
          ))}
          <button className="btn-n">Comprar</button>
        </div>
      </div>
    </div>
  );
};

export default Ventas;
