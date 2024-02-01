import { React, useState } from 'react';
import Submit from '../../../components/buttons/Submit';
import axiosClient from '../../../../axios';

export default function EditUserModal({ selectedUser }) {
  const [error, setError] = useState("");
  
  const [updatedUser, setUpdatedUser] = useState({
    username: selectedUser.username,
    email: selectedUser.email
  });

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    axiosClient
      .put(`/updateuser/${selectedUser.id}`, updatedUser)
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

  console.log(selectedUser);

  return (
    <>
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
          value={updatedUser.email}
          onChange={ev => setUpdatedUser({ ...updatedUser, email: ev.target.value })}
        />

        <label htmlFor="username">User Name: </label>
        <input
          placeholder={'Name of College'}
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          value={updatedUser.username}
          onChange={ev => setUpdatedUser({ ...updatedUser, username: ev.target.value })}
        />

        {/**BUTTONS */}
        <div className='mt-5'>
          <Submit label="Add User" /*disabled={ your condition }*/ />
        </div>
      </form>
    </>
  );
}
