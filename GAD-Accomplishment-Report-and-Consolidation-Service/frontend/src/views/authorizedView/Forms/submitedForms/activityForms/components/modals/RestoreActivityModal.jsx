import { React, useState } from 'react'
import Submit from '../../../../../../components/buttons/Submit';
import axiosClient from '../../../../../../axios/axios';

export default function RestoreActivityModal({selectedForm}) {
    const [error, setError] = useState("");

    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: "" });
    
        axiosClient
          .put(`/restore_form/${selectedForm.id}`)
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

        console.log(selectedForm);
  return (
    <div>
      <h1>
        Are you sure you want to Restore <b>{}</b>
      </h1>
      {/**BUTTONS */}
      <div className='mt-5'>
          <Submit label="Restore User" onClick={onSubmit}/*disabled={ your condition }*/ />
        </div>
    </div>
  )
}
