import React, { useState } from 'react';
import Submit from '../../../components/buttons/Submit';
import axiosClient from '../../../axios/axios';

export default function EmployeeForm() {

  //----------for exenditure

  const [inputFields, setInputFields] = useState([
    {item: '', phpd: '', total:''}
  ])// <><><>

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

  const submit = async (e) => {
    e.preventDefault();
    console.log(inputFields)
    try{
      const response = await axiosClient.post('/xpenditure_e', { xp_data: inputFields });
      console.log('Form submitted successfully:', response.data);
    } catch (error){
      console.error('Error submitting expenditure.', error);
    }
  }

  //----------

  //----------For submission
  const handleAllSubmit = () => {
    e.preventDefault();
    handleSubmit();
    submit();
  };
  //----------

  const [formData, setFormData] = useState({
    title: '',
    purpose: '',
    legalbases: '',
    dateofactivity: '',
    venue: '',
    participants: '',
    nooftargetparticipants: '',
    learningserviceproviders: '',
    expectedoutputs: '',
    fundsource: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axiosClient.post('/form_employee', formData);
        console.log('Form data submitted: ', response.data);
    } catch (error) {
        console.error('Error submitting form', error);
    }
  };

  return (
    <div className='bg-gray-300 m-5 p-3'>
      
      <h1 className='text-center'>
        Employee Activity Form
      </h1>

      <form action="" className='flex flex-1 flex-col'>
          <label htmlFor="title">Title: </label>
            <input 
              id="title"
              name="title"
              type="text"
              autoComplete="title"
              required
              value={formData.title}
              onChange={handleChange}
            />

          <label htmlFor="purpose">Purpose: </label>
            <input 
              id="purpose"
              name="purpose"
              type="text"
              autoComplete="purpose"
              required
              value={formData.purpose}
              onChange={handleChange}
            />

          <label htmlFor="legalbases">Legal Bases: </label>
            <input 
              id="legalbases"
              name="legalbases"
              type="text"
              autoComplete="legalbases"
              required
              value={formData.legalbases}
              onChange={handleChange}
            />

          <label htmlFor="dateofactivity">Date of Activity: </label>
            <input 
              id="dateofactivity"
              name="dateofactivity"
              type="text"
              autoComplete="dateofactivity"
              required
              value={formData.dateofactivity}
              onChange={handleChange}
            />

          <label htmlFor="venue">Venue: </label>
            <input 
              id="venue"
              name="venue"
              type="text"
              autoComplete="venue"
              required
              value={formData.venue}
              onChange={handleChange}
            />

          <label htmlFor="participants">Participants: </label>
            <input 
              id="participants"
              name="participants"
              type="text"
              autoComplete="participants"
              required
              value={formData.participants}
              onChange={handleChange}
            />

          <label htmlFor="nooftargetparticipants">Number of target participants: </label>
            <input 
              id="nooftargetparticipants"
              name="nooftargetparticipants"
              type="text"
              autoComplete="nooftargetparticipants"
              required
              value={formData.nooftargetparticipants}
              onChange={handleChange}
            />

          <label htmlFor="learningserviceproviders">Learning service providers: </label>
            <input 
              id="learningserviceproviders"
              name="learningserviceproviders"
              type="text"
              autoComplete="learningserviceproviders"
              required
              value={formData.learningserviceproviders}
              onChange={handleChange}
            />

          <label htmlFor="expectedoutputs">Expected outputs: </label>
            <input 
              id="expectedoutputs"
              name="expectedoutputs"
              type="text"
              autoComplete="expectedoutputs"
              required
              value={formData.expectedoutputs}
              onChange={handleChange}
            />

          <label htmlFor="fundsource">Fund Source: </label>
            <input 
              id="fundsource"
              name="fundsource"
              type="text"
              autoComplete="fundsource"
              required
              value={formData.fundsource}
              onChange={handleChange}
            />
           
        <h1 className='text-center m-3'>
          Budgetary Requirements
        </h1>
        <div>
          <form onSubmit={submit}>
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
            <button onClick={addFields} className='m-1'>Add More..</button>
            <button onClick={submit} className='m-1'>Submit</button>
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
