import React from 'react'
import Submit from '../components/buttons/Submit'

export default function Login() {
  return (
    <div className='bg-gray-400 p-5'>
        <form action="" className='flex flex-1 flex-col'>
          <label htmlFor="gmail">Gmail: </label>
            <input type="text" />
          <label htmlFor="password">Password: </label>
            <input type="text" />
        </form>

        <div className='mt-5'>
          <Submit />
        </div>
    </div>
  )
}
