import React from 'react'
import Login from '../../components/Login';
import imageSrc from '../../../../TMP/image.png';

export default function LandingPage1() {
  return (
    <div className='flex'>
        <div className='w-[40%]'>
          <Login />
        </div>
        <div className='w-[60%]'>
            {/* Add a function that allows the user to change this image */}
            <img src={imageSrc} alt="" className='w-[100%] h-screen' />
        </div>
    </div>
  )
}
