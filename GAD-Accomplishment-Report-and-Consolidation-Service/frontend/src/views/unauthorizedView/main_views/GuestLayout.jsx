import React from 'react'
import Login from '../components/Login'
import { useStateContext } from '../../../context/ContextProvider';
import { Navigate } from 'react-router-dom';

export default function GuestLayout() {
  const { userToken, currentUser } = useStateContext();

  /**When the LOGIN is SUCCESS user token is used to redirect inside the webpage */
  if (userToken && currentUser.role === 'admin') {
    return <Navigate to="/admin" />
  } else if (userToken && currentUser.role === 'college') {
    return <Navigate to="/college" />
  }
  

  return (
    <div className='bg-red-800'>
      GuestLayout

        <div>
          <Login />
        </div>
    </div>
  )
}
