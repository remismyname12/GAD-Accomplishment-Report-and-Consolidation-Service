import React, { useState, useEffect } from 'react';
import Submit from '../../../../../../components/buttons/Submit';
import NeutralButton from '../../../../../../components/buttons/NeutralButton';
import axiosClient from '../../../../../../axios/axios';

export default function EmployeeReportEditModal({ selectedForm }) {
  
  const expendituresArray = selectedForm.expenditures;
  console.log('DATA: ', selectedForm.expenditures);

  const [error, setError] = useState("");
  const [inputFields, setInputFields] = useState([
    {type: '', item: '', phpd: '', total: ''}
  ])

  //------------------------------USE THIS FOR EXPENSES
  useEffect(() => {
      const generateInputFields = () => {
        const newInputFields = expendituresArray.map(expenditure => ({
          id: expenditure.id,
          type: expenditure.type,
          item: expenditure.items,
          phpd: expenditure.per_head_per_day,
          total: expenditure.total
        }));
        setInputFields(newInputFields);
      };
  
      generateInputFields();
  }, []);
  //------------------------------

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  }
  
  const addFields = () => {
    let newfield = { type: '', item: '', phpd: '', total:'' }
    setInputFields([...inputFields, newfield])
  }
  
  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1)
    setInputFields(data)
  }

  const [formData, setFormData] = useState({
    title: selectedForm.forms.title,
    purpose: selectedForm.forms.purpose,
    legal_bases: selectedForm.forms.legal_bases,
    //Change date_of_activity to date_of_LEAD_activity depending of the form_type
    ...(selectedForm.forms.form_type !== "INSET" && { date_of_activity: selectedForm.forms.date_of_activity }),
    ...(selectedForm.forms.form_type === "INSET" && { date_of_activity: selectedForm.forms.date_of_activity }),
    venue: selectedForm.forms.venue,
    participants: selectedForm.forms.participants,
    learning_service_providers: selectedForm.forms.learning_service_providers,
    expected_outputs: selectedForm.forms.expected_outputs,
    fund_source: selectedForm.forms.fund_source,
    proponents_implementors: selectedForm.forms.proponents_implementors,
    // Exclude no_of_target_participants if form type is INSET
    ...(selectedForm.forms.form_type !== "INSET" && { no_of_target_participants: selectedForm.forms.no_of_target_participants }),
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
      .put(`/update_form_employee/${selectedForm.id}`, {form_data: formData, xp_data: inputFields})
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
      .put(`/update_form_inset/${selectedForm.id}`, {form_data: formData, xp_data: inputFields})
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
  const isRequired = selectedForm.forms.form_type !== "INSET" && name == "no_of_target_participants";

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

  return (
    <div>
      {error.__html && (
        <div
          className="bg-red-500 rounded py-2 px-3 text-white"
          dangerouslySetInnerHTML={error}
        ></div>
      )}

    <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
      {renderInput("title", "Title: ")}
      {renderInput("purpose", "Purpose: ")}
      {renderInput("legal_bases", "Legal Bases: ")}
      {renderInput(selectedForm.forms.form_type === "INSET" ? "date_of_activity" : "date_of_activity", "Date of Activity: ")}
      {renderInput("venue", "Venue: ")}
      {renderInput("participants", "Participants: ")}
      {selectedForm.forms.form_type !== "INSET" && renderInput("no_of_target_participants", "Number of Target Participants: ")} {/**Render this only when the form is inset */}
      {renderInput("learning_service_providers", "Learning Service Providers: ")}
      {renderInput("expected_outputs", "Expected Outputs: ")}
      {renderInput("fund_source", "Fund Source: ")}
      {renderInput("proponents_implementors", "Proponents/Implementors ")}
      <h1 className='text-center m-3'>
        Budgetary Requirements
      </h1>
      <div>
        
        {/*------------------------------------------------------------------------------*/}

        {inputFields.map((input, index) => (
        <div key={index} className="space-x-4 space-y-2">
          <select
                  id="type"
                  name="type"
                  autoComplete="type"
                  required
                  className="flex-1 px-2 py-1"
                  onChange={event => handleFormChange(index, event)}
                >
                  <option value = {input.type} selected>{input.type}</option>
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
    ))}
        
        

        {/*------------------------------------------------------------------------------*/}
          <div className="flex justify-center">

          <NeutralButton label="Add more.." onClick={() => addFields()} />
          {/* <button onClick={addFields} className='m-1'>Add More..</button> */}
          </div>
        
      </div>
  <div className="mt-5">
    <Submit label="Submit"/>
  </div>
</form>

    </div>
  );
}
