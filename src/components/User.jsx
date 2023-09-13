import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../redux/actions/registro/registroUser.js';


const User = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  

  return (
    <div className='contenedor1'>
      <div className='contenedor2'>
        
            <div key={user.id}>
              <h1>{user.nombre}</h1>
            </div>
            <h1>xxx</h1>
            <p>baneada en pagina x la fecha xxx/xx/xxxx por taly tal cosa </p>
      </div>
    </div>
  )
}

export default User;
