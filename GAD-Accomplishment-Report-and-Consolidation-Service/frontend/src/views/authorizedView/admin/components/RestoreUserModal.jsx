import { React, useState } from 'react'
import Submit from '../../../components/buttons/Submit'
import axiosClient from '../../../../axios';

export default function RestoreUserModal({selectedUser}) {
    const [error, setError] = useState("");

    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: "" });
    
        axiosClient
          .put(`/restoreuser/${selectedUser.id}`)
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

        console.log(selectedUser)
  return (
    <div>Restore User

      {/**BUTTONS */}
      <div className='mt-5'>
          <Submit label="Restore User" onClick={onSubmit}/*disabled={ your condition }*/ />
        </div>
    </div>
  )
}
