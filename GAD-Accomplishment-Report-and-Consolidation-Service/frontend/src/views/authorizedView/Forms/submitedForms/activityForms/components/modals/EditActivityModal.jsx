import React, { useState } from 'react';
import Submit from '../../../../../../components/buttons/Submit';
import NeutralButton from '../../../../../../components/buttons/NeutralButton';
import axiosClient from '../../../../../../axios/axios';

export default function EditActivityModal({ selectedForm }) {

  console.log('All: ', selectedForm);
  console.log('EXP: ', selectedForm.expenditures);
  console.log('Type: ', selectedForm.expenditures[0]);

  const expendituresArray = selectedForm.expenditures;

  //const numSets = 3;
  const numSets = expendituresArray.length;

  const inputSets = Array.from({ length: numSets }, (_, index) => index);
  
  console.log('Array: ', expendituresArray.length); //array size

  const [error, setError] = useState("");
  const [inputFields, setInputFields] = useState([
    {type: 'Meals and Snacks', item: '', phpd: '', total: ''}
  ])
  
  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  }
  
  const addFields = () => {
    let newfield = { type: 'Meals and Snacks', item: '', phpd: '', total:'' }
  
    setInputFields([...inputFields, newfield])
  }
  
  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1)
    setInputFields(data)
  }

  const [formData, setFormData] = useState({
    title: selectedForm.title,
    purpose: selectedForm.purpose,
    legal_bases: selectedForm.legal_bases,
    //Change date_of_activity to date_of_LEAD_activity depending of the form_type
    ...(selectedForm.form_type !== "INSET" && { date_of_activity: selectedForm.date_of_activity }),
    ...(selectedForm.form_type === "INSET" && { date_of_activity: selectedForm.date_of_activity }),
    venue: selectedForm.venue,
    participants: selectedForm.participants,
    learning_service_providers: selectedForm.learning_service_providers,
    expected_outputs: selectedForm.expected_outputs,
    fund_source: selectedForm.fund_source,
    proponents_implementors: selectedForm.proponents_implementors,
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
      .put(`/update_form_employee/${selectedForm.id}`, {form_data: formData})
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
      .put(`/update_form_inset/${selectedForm.id}`, {form_data: formData})
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
    <div>
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
      {renderInput(selectedForm.form_type === "INSET" ? "date_of_activity" : "date_of_activity", "Date of Activity: ")}
      {renderInput("venue", "Venue: ")}
      {renderInput("participants", "Participants: ")}
      {selectedForm.form_type !== "INSET" && renderInput("no_of_target_participants", "Number of Target Participants: ")} {/**Render this only when the form is inset */}
      {renderInput("learning_service_providers", "Learning Service Providers: ")}
      {renderInput("expected_outputs", "Expected Outputs: ")}
      {renderInput("fund_source", "Fund Source: ")}
      {renderInput("proponents_implementors", "Proponents/Implementors ")}
      <h1 className='text-center m-3'>
        Budgetary Requirements
      </h1>
      <div>
        
          {/*------------------------------------------------------------------------------*/}

        {/*now how to map?*/}
        
        {inputSets.map(setIndex => (
          <div key={setIndex} className="space-x-4 space-y-2">
            {/* Select field */}
            <select
              id={`type${setIndex}`}
              name={`type${setIndex}`}
              autoComplete={`type${setIndex}`}
              required
              className="flex-1 px-2 py-1"
              value={inputFields[setIndex] ? inputFields[setIndex].type : ''}
              onChange={event => handleFormChange(setIndex, event)}
            >
              <option value="Meals and Snacks">Meals and Snacks</option>
              <option value="Function Room/Venue">Venue</option>
              <option value="Accomodation">Accomodation</option>
              <option value="Equipment Rental">Equipment Rental</option>
              <option value="Professional Fee/Honoria">Professional Fee/Honoria</option>
              <option value="Token/s">Token/s</option>
              <option value="Materials and Supplies">Materials and Supplies</option>
              <option value="Transportation">Transportation</option>
              <option value="Others">Others...</option>
              {/* Other options */}
            </select>
            
            {/* Input fields for expenditure */}
            <input
              id={`item${setIndex}`}
              name={`item${setIndex}`}
              type="text"
              placeholder="Item"
              autoComplete={`item${setIndex}`}
              required
              className="flex-1 px-2 py-1"
              value={inputFields[setIndex] ? inputFields[setIndex].item : ''}
              onChange={event => handleFormChange(setIndex, event)}
            />
            <input
              id={`phpd${setIndex}`}
              name={`phpd${setIndex}`}
              type="text"
              placeholder="Per Head/Per Day"
              autoComplete={`phpd${setIndex}`}
              required
              className="flex-1 px-2 py-1"
              value={inputFields[setIndex] ? inputFields[setIndex].phpd : ''}
              onChange={event => handleFormChange(setIndex, event)}
            />
            <input
              id={`total${setIndex}`}
              name={`total${setIndex}`}
              type="text"
              placeholder="Total"
              autoComplete={`total${setIndex}`}
              required
              className="flex-1 px-2 py-1"
              value={inputFields[setIndex] ? inputFields[setIndex].total : ''}
              onChange={event => handleFormChange(setIndex, event)}
            />
            <button onClick={() => removeFields(setIndex)}>Remove</button>
          </div>
        ))}
          {/*------------------------------------------------------------------------------*/}
          <div className="flex justify-center">

          <NeutralButton label="Add more.." onClick={() => addFields()} />
          {/* <button onClick={addFields} className='m-1'>Add More..</button> */}
          </div>
        
      </div>
  <div className="mt-5">
    <Submit label="Submit" onClick={handleSubmit} />
  </div>
</form>

    </div>
  );
}
