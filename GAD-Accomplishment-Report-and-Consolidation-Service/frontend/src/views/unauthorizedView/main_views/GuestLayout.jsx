import React, { useState } from 'react'
import ReactModal from 'react-modal'
import Login from '../components/Login'

export default function GuestLayout() {
  const [isLoginOpen, setIsLoginOpen] = useState('true');

  return (
    <div className='bg-red-800'>
      GuestLayout

        <div>
          <Login />
        </div>
    </div>
  )
}
