import React, { useState } from 'react';
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
      .put(`/updateuser/${selectedForm.id}`, formData) // Changed updatedUser to formData
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

  //For Unified Inputs 
  const renderInput = (name, label) => (
    <div>
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
    <>
      {/**For ERROR handling */}
      {error.__html && (
        <div
          className="bg-red-500 rounded py-2 px-3 text-white"
          dangerouslySetInnerHTML={error}
        ></div>
      )}

      <form action="" className="flex flex-1 flex-col">
        {renderInput("title", "Title: ")}
        {renderInput("purpose", "Purpose: ")}
        {renderInput("legalbases", "Legal Bases: ")}
        {renderInput("dateofactivity", "Date of Activity: ")}
        {renderInput("venue", "Venue: ")}
        {renderInput("participants", "Participants: ")}
        {renderInput("nooftargetparticipants", "Number of Target Participants: ")}
        {renderInput("learningserviceproviders", "Learning Service Providers: ")}
        {renderInput("expectedoutputs", "Expected Outputs: ")}
        {renderInput("fundsource", "Fund Source: ")}
        <div className="mt-5">
          <Submit label="Submit" onClick={handleSubmit} />
        </div>
      </form>
    </>
  );
}
