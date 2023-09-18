import React from 'react'
import { NavLink } from 'react-router-dom';

const Crear = () => {
  return (
    <div className='contenedor1'>
      <div className='contenedor2'>
        <h1>Que Desea Hacer Hoy</h1>
        <section className=' grid grid-cols-3'>
        <NavLink to='/crear/pagina'>
          <button className="btn-w h-20 w-48">Registrar Pagina</button>
        </NavLink>
        <NavLink to='/crear/producto'>
          <button className="btn-w h-20 w-48">Registrar Producto</button>
        </NavLink>
        <NavLink to='/crear/username'>
          <button className="btn-w h-20 w-48">Registrar UserName</button>
        </NavLink>
        <NavLink to='/crear/modelo'>
          <button className="btn-w h-20 w-48">Registrar Modelo</button>
        </NavLink>
        <NavLink to='/crear/quincena'>
          <button className="btn-w h-20 w-48">Registrar Quincena</button>
        </NavLink>
        <NavLink to='/crear/moneda'>
          <button className="btn-w h-20 w-48">Registrar Moneda</button>
        </NavLink>
        <NavLink to='/crear/estadisticas'>
          <button className="btn-w h-20 w-48">Registrar Estadisticas</button>
        </NavLink>
      
        </section>
      </div>
    </div>
  )
}

export default Crear;
