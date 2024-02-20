import React, { useState } from 'react';
import Submit from '../../../components/buttons/Submit';
import axiosClient from '../../../axios/axios';
import NeutralButton from '../../../components/buttons/NeutralButton';

//For Feedback
import Feedback from '../../../components/feedbacks/Feedback';
import Error from '../../../components/feedbacks/Error';

export default function EmployeeForm() {
  //For feedback
  const [error, setError] = useState('');
  const [message, setAxiosMessage] = useState('');
  const [status, setAxiosStatus] = useState('');

  //----------for exenditure

  const [inputFields, setInputFields] = useState([
    {type: '', item: '', per_item: '', no_item: '', total: ''}
  ])

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  }

  const addFields = () => {
    let newfield = {type: '', item: '', per_item: '', no_item: '', total: ''}

    setInputFields([...inputFields, newfield])
  }

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1)
    setInputFields(data)
}

  const [formData, setFormData] = useState({
    title: '',
    purpose: '',
    legal_bases: '',
    date_of_activity: '',
    venue: '',
    participants: '',
    no_of_target_participants: '',
    learning_service_providers: '',
    expected_outputs: '',
    fund_source: '',
    proponents_implementors: '',
  });

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //----------axiosClient
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axiosClient.post('/form_employee', {
            form_data: formData,
            xp_data: inputFields
        });
        setAxiosMessage(response.data.Message); // Set success message
        setAxiosStatus(response.data.Success);
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

  //----------

  //For Unified Inputs 
  const renderInput = (name, label) => (
    <div className="flex flex-1 flex-col">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type="text"
        autoComplete={name}
        required
        value={formData[name]}
        onChange={handleChange}
        className="bg-white"
      />
    </div>
  );

  return (
    <div className='bg-gray-100 m-5 p-3'>
      {/**For Feedback */}
      <Error isOpen={error !== ''} onClose={() => setError('')} errorMessage={error} />
      <Feedback isOpen={message !== ''} onClose={() => setSuccess('')} successMessage={message}  status={status}/>

      <h1 className='text-center'>
        Employee Activity Form
      </h1>

      <form onSubmit={handleSubmit} >
        {renderInput("title", "Title: ")}
        {renderInput("purpose", "Purpose: ")}
        {renderInput("legal_bases", "Legal Bases: ")}
        {renderInput("date_of_activity", "Date of Activity: ")}
        {renderInput("venue", "Venue: ")}
        {renderInput("participants", "Participants: ")}
        {renderInput("no_of_target_participants", "Number of Target Participants: ")}
        {renderInput("learning_service_providers", "Learning Service Providers: ")}
        {renderInput("expected_outputs", "Expected Outputs: ")}
        {renderInput("fund_source", "Fund Source: ")}
        {renderInput("proponents_implementors", "Proponents/Implementors: ")}
        <h1 className='text-center m-3'>
          Budgetary Requirements
        </h1>
        <div>
            {inputFields.map((input, index) => {
              return(
                
                <div key={index} className="space-x-4 space-y-2">
                  <select
                    id="type"
                    name="type"
                    autoComplete="type"
                    required
                    className="flex-1 px-2 py-1"
                    value={input.type}
                    onChange={event => handleFormChange(index, event)}
                  >
                    <option value="" disabled selected>Select Type</option>
                    <option value="Meals and Snacks">Meals and Snacks</option>
                    <option value="Function Room/Venue">Venue</option>
                    <option value="Accomodation">Accomodation</option>
                    <option value="Equipment Rental">Equipment Rental</option>
                    <option value="Professional Fee/Honoria">Professional Fee/Honoria</option>
                    <option value="Token/s">Token/s</option>
                    <option value="Materials and Supplies">Materials and Supplies</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Others">Others...</option>
                  </select>
                  <input
                    id="item"
                    name="item"
                    type="text"
                    placeholder="Item"
                    autoComplete="item"
                    required
                    className="flex-1 px-2 py-1"
                    value={input.item}
                    onChange={event => handleFormChange(index, event)}
                  />
                  <input
                    id="per_item"
                    name="per_item"
                    type="text"
                    variant="filled"
                    placeholder="Cost Per Item"
                    autoComplete="per_item"
                    required
                    className="appearance-none flex-1 px-2 py-1"
                    value={input.per_item}
                    onChange={event => handleFormChange(index, event)}
                  />
                  <input
                    id="no_item"
                    name="no_item"
                    type="text"
                    variant="filled"
                    placeholder="Number of Items"
                    autoComplete="no_item"
                    required
                    className="appearance-none flex-1 px-2 py-1"
                    value={input.no_item}
                    onChange={event => handleFormChange(index, event)}
                  />
                  <input
                    id="total"
                    name="total"
                    type="text"
                    placeholder="Total"
                    autoComplete="total"
                    //required
                    disabled
                    className="flex-1 px-2 py-1"
                    value={input.total}
                    onChange={event => handleFormChange(index, event)}
                  />
                  <button onClick={() => removeFields(index)}>Remove</button>
                </div>
                
              )
            })}
            <div className="flex justify-center">
              <NeutralButton label="Add more.." onClick={() => addFields()} />
            </div>
          
        </div>
        
        <div className='mt-5'>
          <Submit label="Submit"/>
        </div>
      </form>
    </div>
  )
  
}
