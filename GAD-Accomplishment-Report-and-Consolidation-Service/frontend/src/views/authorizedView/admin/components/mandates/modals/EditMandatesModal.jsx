import React, { useState, useEffect } from 'react';
import Submit from '../../../../../components/buttons/Submit';
import axiosClient from '../../../../../axios/axios';

//For Feedback
import Feedback from '../../../../../components/feedbacks/Feedback';
import Error from '../../../../../components/feedbacks/Error';

export default function EditMandatesModal({ mandateSelected }) {
    //--------For Feedback
    const [error, setError] = useState('');
    const [message, setAxiosMessage] = useState(''); // State for success message
    const [status, setAxiosStatus] = useState('');

  const [formData, setFormData] = useState(...mandateSelected, {
    gender_issue: '',
    cause_of_gender_issue: '',
    gad_result_statement: '',
    gad_activity: '',
    performance_indicators: '',
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderInput = (name, label) => (
    <div className="flex flex-1 flex-col">
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        autoComplete={name}
        required
        value={formData[name]}
        onChange={handleChange}
        className="bg-gray-200"
        rows={4}
      />
    </div>
  );

  //----------axiosClient
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axiosClient.put(`/updatemandate/${formData.id}`, {
            form_data: formData,
        });
        setAxiosMessage(response.data.message); // Set success message
        setAxiosStatus(response.data.success);
        setTimeout(() => {
            setAxiosMessage(''); // Clear success message
            setAxiosStatus('');
        }, 3000); // Timeout after 3 seconds
    } catch (error) {
        if (error.response) {
            const finalErrors = Object.values(error.response.data.errors).reduce(
                (accum, next) => [...accum, ...next],
                []
            );
            setError(finalErrors.join('<br>'));
        }
        console.error(error);
    }
  };

  return (
    <div>
        {/* Integrate the Success component */}
      <Feedback isOpen={message !== ''} onClose={() => setSuccess('')} successMessage={message}  status={status}/>

      <form onSubmit={handleSubmit}>
        {renderInput('gender_issue', 'Gender Issues/GAD Mandate')}
        {renderInput('cause_of_gender_issue', 'Cause of Gender Issues')}
        {renderInput('gad_result_statement', 'GAD Result Statements')}
        {renderInput('gad_activity', 'Gender Issues/GAD Mandate')}
        {renderInput('performance_indicators', 'Performance Indicator/Targets')}

        <div className='mt-5'>
          <Submit label="Submit"/>
        </div>
      </form>
    </div>
  );
}
