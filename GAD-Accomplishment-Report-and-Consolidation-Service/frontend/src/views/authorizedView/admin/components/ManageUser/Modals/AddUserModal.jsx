import { React, useState} from 'react'
import { Menu } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import Submit from '../../../../../components/buttons/Submit'
import postAxios from '../../../../../axios/axiosMethods/postAxios';

//For Feedback
import Feedback from '../../../../../components/feedbacks/Feedback';
import Error from '../../../../../components/feedbacks/Error';

export default function AddUserModal() {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

      //For feedback
    const [error, setError] = useState('');
    const [message, setAxiosMessage] = useState('');
    const [status, setAxiosStatus] = useState('');

    const onSubmit = async (ev) => {
      ev.preventDefault();
      setError({ __html: "" });
  
          // Call getAxios to make the POST request
          const response = await postAxios({
              endPoint: "adduser",
              data: { email, username: userName, password, role: role },
          })
          if (response.status === true) { // Check status for success
              setAxiosMessage(response.response.data.message); // Set success message
              setAxiosStatus(response.response.data.status);
              setTimeout(() => {
                  setAxiosMessage(''); // Clear success message
                  setAxiosStatus('');
              }, 3000); // Timeout after 3 seconds
          } else { // Handle failure
              setError(response.error); // Set error message
              
          console.log('This is the ERROR',error);
          }
      }
  
    
  return (
    <div className='bg-gray-400 p-5'>

    {/**For ERROR handling */}
    <div>
        {error && error.__html && (
            <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error} />
        )}
    </div>
    
      <Feedback isOpen={message !== ''} onClose={() => setSuccess('')} successMessage={message}  status={status}/>
    
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
