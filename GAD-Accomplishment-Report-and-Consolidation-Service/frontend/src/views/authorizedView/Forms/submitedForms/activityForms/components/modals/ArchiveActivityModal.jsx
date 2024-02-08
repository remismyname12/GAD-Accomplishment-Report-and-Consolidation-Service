import { React, useState } from 'react'
import Submit from '../../../../../../components/buttons/Submit';
import axiosClient from '../../../../../../axios/axios';

export default function ArchiveActivityModal({selectedForm}) {
  const [error, setError] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    let archiveEndpoint;

    if (selectedForm.form_type === "EMPLOYEE") {
      archiveEndpoint = `/archive_form_employee/${selectedForm.id}`;
    } else {
      archiveEndpoint = `/archive_form_inset/${selectedForm.id}`;
    }

    axiosClient
      .put(archiveEndpoint)
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
      <h1>
        Are you sure you want to delete <b>{selectedForm.title}</b>
      </h1>
      {/**BUTTONS */}
      <div className='mt-5'>
          <Submit label="Archive Activity Design" onClick={onSubmit}/*disabled={ your condition }*/ />
        </div>
    </div>
  )
}
