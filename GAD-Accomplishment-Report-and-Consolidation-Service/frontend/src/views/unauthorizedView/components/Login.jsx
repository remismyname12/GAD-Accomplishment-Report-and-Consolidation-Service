import React, { useState } from 'react';
import Submit from '../../components/buttons/Submit';
import axiosClient from '../../axios/axios';
import { useStateContext } from '../../../context/ContextProvider';
import Error from '../../components/feedbacks/Error';
import Success from '../../components/feedbacks/Success'; // Import the Success component
import Feedback from '../../components/feedbacks/Feedback';
import ReactModal from 'react-modal';

export default function Login() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State for success message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser, setUserToken } = useStateContext();

  const [axiosRes, setAxiosRes] = useState('');

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError('');
    setSuccess(''); // Clear success message as well

    axiosClient
      .post('/login', {
        email,
        password,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
        setIsFeedbackModalOpen(true);
        setAxiosRes(data);
        setSuccess('Login successful!'); // Set success message
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          setError(finalErrors.join('<br>'));
        }
        console.error(error);
      });
  };

  return (
    <div className="bg-gray-400 p-5">
      <Error isOpen={error !== ''} onClose={() => setError('')} errorMessage={error} />
      
      {/* Integrate the Success component */}
      <Success isOpen={success !== ''} onClose={() => setSuccess('')} successMessage={success} />

      <form action="" className="flex flex-1 flex-col">
        <label htmlFor="Email">Email: </label>
        <input
          placeholder={'example@email.com'}
          id="email"
          name="email"
          type="text"
          autoComplete="email"
          required
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
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
          onChange={(ev) => setPassword(ev.target.value)}
        />

        <div className="mt-5">
          <Submit label="Login" onClick={onSubmit} /*disabled={ your condition }*/ />
        </div>
      </form> 
    </div>
  );
}
