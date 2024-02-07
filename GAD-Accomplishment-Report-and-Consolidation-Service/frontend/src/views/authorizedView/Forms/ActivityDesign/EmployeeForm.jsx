import React, { useState } from 'react';
import Submit from '../../../components/buttons/Submit';
import axiosClient from '../../../axios/axios';

export default function EmployeeForm() {

  const [formData1, setFormData1] = useState({
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

  const [formData2, setFormData2] = useState({
    item: '',
    phpd: '',
    total: '',
  });

  const handleChange = (e) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response1 = await axiosClient.post('/form_employee', formData1);
        console.log('Form data submitted: ', response1.data);
        const response2 = await axiosClient.post('/xpenditure_e', formData2);
        console.log('Form data submitted: ', response2.data);
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
              value={formData1.title}
              onChange={handleChange}
            />

          <label htmlFor="purpose">Purpose: </label>
            <input 
              id="purpose"
              name="purpose"
              type="text"
              autoComplete="purpose"
              required
              value={formData1.purpose}
              onChange={handleChange}
            />

          <label htmlFor="legalbases">Legal Bases: </label>
            <input 
              id="legalbases"
              name="legalbases"
              type="text"
              autoComplete="legalbases"
              required
              value={formData1.legalbases}
              onChange={handleChange}
            />

          <label htmlFor="dateofactivity">Date of Activity: </label>
            <input 
              id="dateofactivity"
              name="dateofactivity"
              type="text"
              autoComplete="dateofactivity"
              required
              value={formData1.dateofactivity}
              onChange={handleChange}
            />

          <label htmlFor="venue">Venue: </label>
            <input 
              id="venue"
              name="venue"
              type="text"
              autoComplete="venue"
              required
              value={formData1.venue}
              onChange={handleChange}
            />

          <label htmlFor="participants">Participants: </label>
            <input 
              id="participants"
              name="participants"
              type="text"
              autoComplete="participants"
              required
              value={formData1.participants}
              onChange={handleChange}
            />

          <label htmlFor="nooftargetparticipants">Number of target participants: </label>
            <input 
              id="nooftargetparticipants"
              name="nooftargetparticipants"
              type="text"
              autoComplete="nooftargetparticipants"
              required
              value={formData1.nooftargetparticipants}
              onChange={handleChange}
            />

          <label htmlFor="learningserviceproviders">Learning service providers: </label>
            <input 
              id="learningserviceproviders"
              name="learningserviceproviders"
              type="text"
              autoComplete="learningserviceproviders"
              required
              value={formData1.learningserviceproviders}
              onChange={handleChange}
            />

          <label htmlFor="expectedoutputs">Expected outputs: </label>
            <input 
              id="expectedoutputs"
              name="expectedoutputs"
              type="text"
              autoComplete="expectedoutputs"
              required
              value={formData1.expectedoutputs}
              onChange={handleChange}
            />

          <label htmlFor="fundsource">Fund Source: </label>
            <input 
              id="fundsource"
              name="fundsource"
              type="text"
              autoComplete="fundsource"
              required
              value={formData1.fundsource}
              onChange={handleChange}
            />
           
        
        <h1 className='text-center mt-3'>
        Budgetary Requirements
        </h1>
      
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <input 
                id="item"
                name="item"
                type="text"
                placeholder="Item"
                autoComplete="item"
                required
                value={formData2.item}
                onChange={handleChange}
              />
            </div>
            <div style={{ flex: 1 }}>
              <input 
                id="phpd"
                name="phpd"
                type="text"
                placeholder="Per Head/Per Day"
                autoComplete="phpd"
                required
                value={formData2.phpd}
                onChange={handleChange}
              />
            </div>
            <div style={{ flex: 1 }}>
              <input 
                id="total"
                name="total"
                type="text"
                placeholder="Total"
                autoComplete="total"
                required
                value={formData2.total}
                onChange={handleChange}
              />
            </div>
          </div>
        <div className='mt-5'>
          <Submit label="Submit" onClick={handleSubmit}/>
        </div>
      </form>
    </div>
  )
  
}
