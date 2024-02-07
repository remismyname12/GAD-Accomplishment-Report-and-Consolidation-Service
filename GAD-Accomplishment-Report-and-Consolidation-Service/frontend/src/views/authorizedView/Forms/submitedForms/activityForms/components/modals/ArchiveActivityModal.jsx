import { React, useState } from 'react';
import Submit from '../../../../../../components/buttons/Submit';
import axiosClient from '../../../../../../axios/axios';

export default function EditActivityModal({ selectedForm }) {
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    title: selectedForm.title,
    purpose: selectedForm.purpose,
    legalbases: selectedForm.legal_bases,
    dateofactivity: selectedForm.date_of_activity,
    venue: selectedForm.venue,
    participants: selectedForm.participants,
    nooftargetparticipants: selectedForm.no_of_target_participants,
    learningserviceproviders: selectedForm.learning_service_providers,
    expectedoutputs: selectedForm.expected_outputs,
    fundsource: selectedForm.fund_source,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    axiosClient
      .put(`/updateuser/${selectedForm.id}`, updatedUser)
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

  console.log('This is a test', selectedForm);
  return (
    <>
      {/**For ERROR handling */}
      {error.__html && (
        <div
          className="bg-red-500 rounded py-2 px-3 text-white"
          dangerouslySetInnerHTML={error}
        ></div>
      )}

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
    </>
  );
}
