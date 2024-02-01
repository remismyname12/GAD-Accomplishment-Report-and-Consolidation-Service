import React from 'react'
import Login from '../components/Login'
import { useStateContext } from '../../../context/ContextProvider';
import { Navigate } from 'react-router-dom';

export default function GuestLayout() {
  const { userToken } = useStateContext();

  /**When the LOGIN is SUCCESS user token is used to redirect inside the webpage */
  if (userToken) {
    return <Navigate to="/admin" />
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
