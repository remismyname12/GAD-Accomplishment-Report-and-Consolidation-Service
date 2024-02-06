import { React, useState} from 'react'
import { Menu } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import Submit from '../../../../../components/buttons/Submit'
import axiosClient from '../../../../../axios/axios';

export default function AddUserModal() {
    const [error, setError] = useState("");
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const onSubmit = (ev) => {
      ev.preventDefault();
      setError({__html: ""});
    
      axiosClient
        .post('/adduser', {
          email,
          username: userName,
          role: role,
          password
        })
        .catch((error) => {
          if (error.response) {
            const finalErrors = Object.values(error.response.data.message).reduce(
              (accum, next) => [...accum, ...next],
              []
            );
            setError({ __html: finalErrors.join("<br>") });
          }
          console.error(error);
        });
    };
    
    console.log(role);
  return (
    <div className='bg-gray-400 p-5'>

    {/**For ERROR handling */}
    {error.__html && (
        <div
          className="bg-red-500 rounded py-2 px-3 text-white"
          dangerouslySetInnerHTML={error}
        ></div>
      )}
    
      <form onSubmit={onSubmit} className='flex flex-1 flex-col'>
        
        {/**For inputs */}
        <div className='flex flex-col'>
          <label htmlFor="email">Email: </label>
            <input 
                placeholder={'example@email.com'}
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                value={email}
                onChange={ev => setEmail(ev.target.value)}
            />
          <label htmlFor="username">User Name: </label>
            <input
                placeholder={'Name of College'}
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={userName}
                onChange={ev => setUserName(ev.target.value)}
            />
          <label htmlFor="password">Password: </label>
            <input
                placeholder={'Input Password'}
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                required
                value={password}
                onChange={ev => setPassword(ev.target.value)}
            />
        </div>

        {/**For Roles */}
        <div className='pt-3'>
          <Menu >
            {({ open }) => (
              <>
                <Menu.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <span>Select Role</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Menu.Button>

                <Menu.Items className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  <div className="flex flex-col">
                    <Menu.Item>
                      <button onClick={() => setRole('admin')}>
                        Admin
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <button onClick={() => setRole('college')}>
                        College
                      </button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </>
            )}
          </Menu >
        </div>
        
        {/**BUTTONS */}
        <div className='mt-5'>
          <Submit label="Add User" /*disabled={ your condition }*/ />
        </div>
      </form>
    </div>
  )
}
