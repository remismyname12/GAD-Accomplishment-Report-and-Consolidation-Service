import { React, useState } from 'react'
import Submit from '../../../components/buttons/Submit';
import axiosClient from '../../../axios/axios';

export default function InsetForm() {
  const [details, setDetails] = useState({
    title: '',
    purpose: '',
    legal_bases: '',
    date_of_LEAD_activity: '',
    venue: '',
    participants: '',
    learning_service_providers: '',
    expected_outputs: '',
    fund_source: '',
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axiosClient.post('/form_inset', details);
    } catch (error) {
      if (error.response) {
        const finalErrors = Object.values(error.response.data.errors).reduce(
          (accum, next) => [...accum, ...next],
          []
        );
        setError({ __html: finalErrors.join("<br>") });
      }
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <div className='bg-gray-300 m-5 p-3'>
      
      <h1 className='text-center'>
        Inset New Lead
      </h1>

      <form action="" className='flex flex-1 flex-col'>
          <label htmlFor="title">Title: </label>
            <input 
              id="title"
              name="title"
              type="text"
              autoComplete="title"
              required
              value={details.title}
              onChange={handleChange}
            />

          <label htmlFor="purpose">Purpose: </label>
            <input 
              id="purpose"
              name="purpose"
              type="text"
              autoComplete="purpose"
              required
              value={details.purpose}
              onChange={handleChange}
            />

          <label htmlFor="legal_bases">Legal Bases: </label>
            <input 
              id="legal_bases"
              name="legal_bases"
              type="text"
              autoComplete="legal_bases"
              required
              value={details.legal_bases}
              onChange={handleChange}
            />

          <label htmlFor="date_of_LEAD_activity">Date of lead Activity: </label>
            <input 
              id="date_of_LEAD_activity"
              name="date_of_LEAD_activity"
              type="text"
              autoComplete="date_of_LEAD_activity"
              required
              value={details.date_of_LEAD_activity}
              onChange={handleChange}
            />

          <label htmlFor="venue">Venue: </label>
            <input 
              id="venue"
              name="venue"
              type="text"
              autoComplete="venue"
              required
              value={details.venue}
              onChange={handleChange}
            />

          <label htmlFor="participants">Participants: </label>
            <input 
              id="participants"
              name="participants"
              type="text"
              autoComplete="participants"
              required
              value={details.participants}
              onChange={handleChange}
            />

          <label htmlFor="learning_service_providers">Learning service providers: </label>
            <input 
              id="learning_service_providers"
              name="learning_service_providers"
              type="text"
              autoComplete="learning_service_providers"
              required
              value={details.learning_service_providers}
              onChange={handleChange}
            />

          <label htmlFor="expected_outputs">Expected outputs: </label>
            <input 
              id="expected_outputs"
              name="expected_outputs"
              type="text"
              autoComplete="expected_outputs"
              required
              value={details.expected_outputs}
              onChange={handleChange}
            />

          <label htmlFor="fund_source">Fund Source: </label>
            <input 
              id="fund_source"
              name="fund_source"
              type="text"
              autoComplete="fund_source"
              required
              value={details.fund_source}
              onChange={handleChange}
            />
            
        <h1 className='text-center mt-3'>
        Budgetary Requirements
        </h1>
      
        <label htmlFor="items">Items: </label>
            <input 
              id="items"
              name="items"
              type="text"
              autoComplete="itmes"
              required
              //value={formData.items}
              //onChange={handleChange}
            />
        <label htmlFor="phpd">Per head/Per day: </label>
            <input 
              id="phpd"
              name="phpd"
              type="text"
              autoComplete="phpd"
              required
              //value={formData.title}
              //onChange={handleChange}
            />
        <label htmlFor="total">Total: </label>
            <input 
              id="total"
              name="total"
              type="text"
              autoComplete="total"
              required
              //value={formData.title}
              //onChange={handleChange}
            />
            <div className='mt-5'>
              <Submit label="Submit" onClick={handleSubmit}/>
            </div>
      </form>
    </div>
  )
}
