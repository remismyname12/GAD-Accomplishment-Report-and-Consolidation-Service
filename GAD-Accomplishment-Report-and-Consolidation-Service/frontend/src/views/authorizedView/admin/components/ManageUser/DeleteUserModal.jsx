import { React, useState } from 'react'
import Submit from '../../../../components/buttons/Submit';
import axiosClient from '../../../../../axios';

export default function DeleteUserModal({selectedUser}) {
  const [error, setError] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    axiosClient
      .put(`/deleteuser/${selectedUser.id}`)
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
    <div>
        Are you sure you want to delete? 
        This will delete the user permanently

      {/**BUTTONS */}
      <div className='mt-5'>
          <Submit label="Delete User" onClick={onSubmit}/*disabled={ your condition }*/ />
        </div>
    </div>
  )
}
