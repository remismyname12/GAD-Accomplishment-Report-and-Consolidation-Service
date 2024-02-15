import React, { useState, useEffect } from 'react';
import Submit from '../../../../../../components/buttons/Submit';
import NeutralButton from '../../../../../../components/buttons/NeutralButton';
import axiosClient from '../../../../../../axios/axios';

export default function GenerateAccomplishmentReport({ selectedForm }) {

  const expendituresArray = selectedForm.expenditures;

  const [error, setError] = useState("");
  const [inputFields, setInputFields] = useState([
    {type: '', item: '', phpd: '', total: ''}
  ])

   //------------------------------
  useEffect(() => {
    // Function to generate multiple sets of input fields
    const generateInputFields = () => {
      const newInputFields = expendituresArray.map(expenditure => ({
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

  //----------axiosClient
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axiosClient.post('/accomplishment_report', {
            forms_id: selectedForm.id,
            expenditures_id: 1
        });
        setAxiosMessage(response.data.Message); // Set success message
        setAxiosStatus(response.data.Success);
        setTimeout(() => {
            setAxiosMessage(''); // Clear success message
            setAxiosStatus('');
        }, 3000); // Timeout after 3 seconds
    } catch (error) {
        if (error.response) {
            const finalErrors = Object.values(error.response.data.errors).reduce(
                (accum, next) => [...accum, ...next],
                []
            );
            setError(finalErrors.join('<br>'));
        }
        console.error(error);
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
        disabled
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
          {inputFields.map((input, index) => {
            return(
              <div key={index} className="space-x-4 space-y-2">
                <input
                  id="type"
                  name="type"
                  type="text"
                  placeholder="Type"
                  autoComplete="Type"
                  required
                  disabled
                  className="flex-1 px-2 py-1"
                  value={input.type}
                />

                {/**For expendature */}
                <input
                  id="item"
                  name="item"
                  type="text"
                  placeholder="Item"
                  autoComplete="item"
                  required
                  disabled
                  className="flex-1 px-2 py-1"
                  value={input.item}
                />
                <input
                  id="phpd"
                  name="phpd"
                  type="text"
                  placeholder="Per Head/Per Day"
                  autoComplete="phpd"
                  required
                  disabled
                  className="flex-1 px-2 py-1"
                  value={input.phpd}
                />
                <input
                  id="total"
                  name="total"
                  type="text"
                  placeholder="Total"
                  autoComplete="total"
                  required
                  disabled
                  className="flex-1 px-2 py-1"
                  value={input.total}
                />
              </div>
            )
          })}
        
      </div>
  <div className="mt-5">
    <Submit label="Submit" onClick={handleSubmit} />
  </div>
</form>

    </div>
  );
}
