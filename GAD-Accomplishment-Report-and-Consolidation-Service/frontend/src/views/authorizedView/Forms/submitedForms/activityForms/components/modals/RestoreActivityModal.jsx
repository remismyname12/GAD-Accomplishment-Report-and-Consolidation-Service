import { React, useState } from 'react'
import Submit from '../../../../../../components/buttons/Submit';
import axiosClient from '../../../../../../axios/axios';

//For Feedback
import Feedback from '../../../../../../components/feedbacks/Feedback';
import Error from '../../../../../../components/feedbacks/Error';

export default function RestoreActivityModal({selectedForm}) {
  //For feedback
  const [error, setError] = useState('');
  const [message, setAxiosMessage] = useState('');
  const [status, setAxiosStatus] = useState('');  

    const onSubmit = async (ev) => {
        ev.preventDefault();
        setError({ __html: "" });
    
        try {
          const response = await axiosClient.put(`/restore_form/${selectedForm.id}`, {});
            setAxiosMessage(response.data.message); // Set success message
            setAxiosStatus(response.data.Success);
            setTimeout(() => {
                setAxiosMessage(''); // Clear success message
                setAxiosStatus('');
            }, 3000); // Timeout after 3 seconds
          } catch (error) {
            setAxiosMessage(error.response.data.message); // Set success message
          }
    };

  return (
    <div>
      {/**For Feedback */}
      <Feedback isOpen={message !== ''} onClose={() => setAxiosMessage('')} successMessage={message}  status={status}/>

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
