import { React, useState } from 'react'
import Submit from '../../components/buttons/Submit'
import axiosClient from '../../../axios';
import { useStateContext } from '../../../context/ContextProvider';

export default function Login() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser, setUserToken } = useStateContext();
  
  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    axiosClient
      .post("/login", {
        email,
        password,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
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

        <form action="" className='flex flex-1 flex-col'>
          <label htmlFor="Email">Email: </label>
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

            <div className='mt-5'>
              <Submit label="Login" onClick={onSubmit} /*disabled={ your condition }*/ />
            </div>
        </form>
    </div>
  )
}
