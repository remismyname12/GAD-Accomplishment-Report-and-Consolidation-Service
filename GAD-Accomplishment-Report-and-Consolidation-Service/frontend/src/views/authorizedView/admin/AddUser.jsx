import { React, useState} from 'react'
import Submit from '../../components/buttons/Submit'
import axiosClient from './../../../axios'

export default function AddUser() {
    const [error, setError] = useState({_html: ""});
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (ev) => {
        ev.preventDefault();
        setError({_html: ""});

        axiosClient
        .post('/adduser', {
            email,
            username: userName,
            password
        })
      };

  return (
    <div className='bg-gray-400 p-5'>
        <form action="" className='flex flex-1 flex-col'>
          <label htmlFor="email">Email: </label>
            <input placeholder={'example@email.com'}
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
        </form>

        <div className='mt-5'>
          <Submit label="Sign in" onClick={handleSubmit} /*disabled={ your condition }*/ />
        </div>
    </div>
  )
}
