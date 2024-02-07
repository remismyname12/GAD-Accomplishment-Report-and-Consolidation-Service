import React, { useState } from 'react';
import Submit from '../../../../../../components/buttons/Submit';
import axiosClient from '../../../../../../axios/axios';

export default function EditActivityModal({ selectedForm }) {
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: selectedForm.title,
    purpose: selectedForm.purpose,
    legal_bases: selectedForm.legal_bases,
    //Change date_of_activity to date_of_LEAD_activity depending of the form_type
    ...(selectedForm.form_type !== "INSET" && { date_of_activity: selectedForm.date_of_activity }),
    ...(selectedForm.form_type === "INSET" && { date_of_LEAD_activity: selectedForm.date_of_LEAD_activity }),
    venue: selectedForm.venue,
    participants: selectedForm.participants,
    learning_service_providers: selectedForm.learning_service_providers,
    expected_outputs: selectedForm.expected_outputs,
    fund_source: selectedForm.fund_source,
    // Exclude no_of_target_participants if form type is INSET
    ...(selectedForm.form_type !== "INSET" && { no_of_target_participants: selectedForm.no_of_target_participants }),
  });
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    if(selectedForm.form_type === "EMPLOYEE"){
      //For EMPLOYEE UPDATE
      axiosClient
      .put(`/update_form_employee/${selectedForm.id}`, formData)
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
    } else {
      //For INSET UPDATE
      axiosClient
      .put(`/update_form_inset/${selectedForm.id}`, formData)
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
    }
  };

// For Unified Inputs 
const renderInput = (name, label) => {
  // Check if the input field should be required based on form type and field name
  const isRequired = selectedForm.form_type !== "INSET" && name == "no_of_target_participants";

  return (
    <div className='flex flex-1 flex-col'>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type="text"
        autoComplete={name}
        // Include "required" attribute only if it's not INSET and not no_of_target_participants
        {...(isRequired ? { required: true } : {})}
        value={formData[name]}
        onChange={handleChange}
        className="bg-gray-100"
      />
    </div>
  );
};




  console.log('This is the selected form', selectedForm);
  return (
    <>
      {error.__html && (
        <div
          className="bg-red-500 rounded py-2 px-3 text-white"
          dangerouslySetInnerHTML={error}
        ></div>
      )}

<form action="" className="flex flex-1 flex-col">
  {renderInput("title", "Title: ")}
  {renderInput("purpose", "Purpose: ")}
  {renderInput("legal_bases", "Legal Bases: ")}
  {renderInput(selectedForm.form_type === "INSET" ? "date_of_LEAD_activity" : "date_of_activity", "Date of Activity: ")}
  {renderInput("venue", "Venue: ")}
  {renderInput("participants", "Participants: ")}
  {selectedForm.form_type !== "INSET" && renderInput("no_of_target_participants", "Number of Target Participants: ")} {/**Render this only when the form is inset */}
  {renderInput("learning_service_providers", "Learning Service Providers: ")}
  {renderInput("expected_outputs", "Expected Outputs: ")}
  {renderInput("fund_source", "Fund Source: ")}
  <div className="mt-5">
    <Submit label="Submit" onClick={handleSubmit} />
  </div>
</form>

    </>
  );
}
