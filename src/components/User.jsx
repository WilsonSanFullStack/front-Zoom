import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../redux/actionRegistroUser';


const User = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  

  return (
    <div className='contenedor1'>
      <div className='contenedor2'>
        
            <div key={user.id}>
              <h1>{user.nombre}</h1>
            </div>
      </div>
    </div>
  )
}

export default User;
