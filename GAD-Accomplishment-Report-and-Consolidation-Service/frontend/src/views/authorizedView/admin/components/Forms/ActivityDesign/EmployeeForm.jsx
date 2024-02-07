import React, { useState } from 'react';
import axiosClient from 'axios';
import Submit from '../../../../../components/buttons/Submit';

export default function EmployeeForm() {

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
            <div className='mt-5'>
              <Submit label="Submit" onClick={handleSubmit}/>
            </div>
        </form>
    </div>
  )
}
