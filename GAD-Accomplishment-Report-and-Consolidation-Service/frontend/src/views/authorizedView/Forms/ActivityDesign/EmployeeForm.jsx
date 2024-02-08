import React, { useState } from 'react';
import Submit from '../../../components/buttons/Submit';
import axiosClient from '../../../axios/axios';
import NeutralButton from '../../../components/buttons/NeutralButton';

export default function EmployeeForm() {

  //----------for exenditure

  const [inputFields, setInputFields] = useState([
    {item: '', phpd: '', total:''}
  ])

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  }

  const addFields = () => {
    let newfield = { item: '', phpd: '', total:'' }

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
    date_of_LEAD_activity: '',
    venue: '',
    participants: '',
    no_of_target_participants: '',
    learning_service_providers: '',
    expected_outputs: '',
    fund_source: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //----------axiosClient
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axiosClient.post('/form_employee', formData);
        console.log('Form data submitted: ', response.data);
        const response2 = await axiosClient.post('/xpenditure_e', { xp_data: inputFields });
        console.log('Form submitted successfully:', response2.data);
    } catch (error) {
        console.error('Error submitting form', error);
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
        className="bg-gray-100"
      />
    </div>
  );

  return (
    <div className='bg-gray-300 m-5 p-3'>
      
      <h1 className='text-center'>
        Employee Activity Form
      </h1>

      <form action="" >
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
        <div className="mt-5">
          <Submit label="Submit" onClick={handleSubmit} />
        </div>   
        <h1 className='text-center m-3'>
          Budgetary Requirements
        </h1>
        <div>
          <form>
            {inputFields.map((input, index) => {
              return(
                <div key={index} className="flex space-x-4 mb-2">
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
                    id="phpd"
                    name="phpd"
                    type="text"
                    placeholder="Per Head/Per Day"
                    autoComplete="phpd"
                    required
                    className="flex-1 px-2 py-1"
                    value={input.phpd}
                    onChange={event => handleFormChange(index, event)}
                  />
                  <input
                    id="total"
                    name="total"
                    type="text"
                    placeholder="Total"
                    autoComplete="total"
                    required
                    className="flex-1 px-2 py-1"
                    value={input.total}
                    onChange={event => handleFormChange(index, event)}
                  />
                  <button onClick={() => removeFields(index)}>Remove</button>
                </div>
                
              )
            })}
            <div className="flex justify-center">
            {/*<button>
              <NeutralButton label="Add more.." onClick={() => {addFields}} />
            </button>
            <button>
              <Submit label="Submit" onClick={() => {Submit}} />
            </button>
            
            */}



            <button onClick={addFields} className='m-1'>Add More..</button>
            {/*<button onClick={submit} className='m-1'>Submit</button>*/}
            </div>
          </form>
          
        </div>
        
      
        
        <div className='mt-5'>
          <Submit label="Submit" onClick={handleSubmit}/>
        </div>
      </form>
    </div>
  )
  
}
