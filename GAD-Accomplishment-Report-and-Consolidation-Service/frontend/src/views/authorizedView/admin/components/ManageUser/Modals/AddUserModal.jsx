import { React, useState} from 'react'
import Submit from '../../../../../components/buttons/Submit'
import axiosClient from '../../../../../../axios'

export default function AddUserModal() {
    const [error, setError] = useState("");
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (ev) => {
      ev.preventDefault();
      setError({__html: ""});
    
      axiosClient
        .post('/adduser', {
          email,
          username: userName,
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
              type="text"
              autoComplete="password"
              required
              value={password}
              onChange={ev => setPassword(ev.target.value)}
          />
        {/**BUTTONS */}
        <div className='mt-5'>
          <Submit label="Add User" /*disabled={ your condition }*/ />
        </div>
      </form>
    </div>
  )
}
