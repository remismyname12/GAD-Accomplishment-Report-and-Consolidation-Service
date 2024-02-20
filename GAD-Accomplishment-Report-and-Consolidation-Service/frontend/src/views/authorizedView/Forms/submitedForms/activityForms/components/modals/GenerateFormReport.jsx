import React, { useState, useEffect } from 'react';
import Submit from '../../../../../../components/buttons/Submit';
import NeutralButton from '../../../../../../components/buttons/NeutralButton';
import axiosClient from '../../../../../../axios/axios';

//For Feedback
import Feedback from '../../../../../../components/feedbacks/Feedback';

export default function GenerateFormReport({ selectedForm }) {

  const [actualExpendatures, setActualExpendatures] = useState({
    type: 'Others',
    item: 'placeholder',
    remarks: 'placeholder',
    source_of_funds: 'placeholder',
    actual_cost: 'placeholder',
    total: 'placeholder',
  });

  const expendituresArray = selectedForm.expenditures;

  const [proposedExpenditures, setProposedExpenditures] = useState([
    {type: '', item: '', per_item: '', no_item: '', times: '', total: ''}
  ]);

  //------------------------------
  useEffect(() => {
    // Function to generate multiple sets of input fields
    const generateInputFields = () => {
      const newInputFields = expendituresArray.map(expenditure => ({
        id: expenditure.id,
        type: expenditure.type,
        item: expenditure.items,
        per_item: expenditure.per_item,
        no_item: expenditure.no_item,
        times: expenditure.times,
        total: expenditure.total
      }));
      setProposedExpenditures(newInputFields);
    };
  
    generateInputFields();
}, []);
  //------------------------------

  const [inputFields, setInputFields] = useState([
    {type: '', item: '', per_item: '', no_item: '', total: '0'}
  ])

  //For feedback
  const [error, setError] = useState('');
  const [message, setAxiosMessage] = useState(''); // State for success message
  const [status, setAxiosStatus] = useState('');
  
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    try {
      const response = await axiosClient.post('/accomplishment_report', {
          forms_id: selectedForm.id,
          expenditures: inputFields,
      });
      setAxiosMessage(response.data.message); // Set success message
      setAxiosStatus(response.data.success);
      console.log('status =',response.data.success);
      setTimeout(() => {
          setAxiosMessage(''); // Clear success message
          setAxiosStatus('');
      }, 3000); // Timeout after 3 seconds
    } catch (error) {
      setAxiosMessage(error.response.data.message); // Set success message
    }
  };


  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  }
  
  const addFields = () => {
    let newfield = { type: '', item: '', per_item: '', no_item: '', total:'0' }
    setInputFields([...inputFields, newfield])
    //will also add to DB
  }
  
  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1)
    setInputFields(data)
    //will also remove from DB
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
    participants_male: selectedForm.participants_male,
    participants_female: selectedForm.participants_female,
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

// For Unified Inputs 
const renderInput = (name, label) => {
  // Check if the input field should be required based on form type and field name
  const isRequired = selectedForm.form_type !== "INSET" && name == "no_of_target_participants";

  return (
    <div className='flex flex-1 flex-col'>

    {/* Integrate the Success component */}
    <Feedback isOpen={message !== ''} onClose={() => setAxiosMessage('')} successMessage={message}  status={status}/>

      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type="text"
        autoComplete={name}
        placeholder="I am empty..."
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
      {renderInput(selectedForm.form_type === "INSET" ? "date_of_activity" : "date_of_activity", "Date of Activity: ")}
      {renderInput("venue", "Venue: ")}
      {renderInput("participants", "Participants: ")}
      {renderInput("participants_male", "Male Participants: ")}
      {renderInput("participants_female", "Female Participants: ")}
      {selectedForm.form_type !== "INSET" && renderInput("no_of_target_participants", "Number of Participants: ")} {/**Render this only when the form is inset */}
      {renderInput("learning_service_providers", "Learning Service Providers: ")}
      {renderInput("expected_outputs", "Expected Outputs: ")}
      {renderInput("fund_source", "Fund Source: ")}
      {renderInput("proponents_implementors", "Proponents/Implementors ")}

      <h1 className='text-center m-3'>
        Proposed Expenditures:
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Item Type</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Cost Per Item</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">No. of Items</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">X Times</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {proposedExpenditures.map((input, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap">{input.type}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{input.item}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{input.per_item}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{input.no_item}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{input.times}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{input.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h1 className='text-center m-3'>
        Actual Expenditures:
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
                  //<option value="" disabled selected>Select Type</option>
                >
                  <option value="" disabled selected>Select Type</option>
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
                  value={actualExpendatures.item}
                  onChange={event => handleFormChange(index, event)}
                />
                <input
                  id="actual_cost"
                  name="actual_cost"
                  type="text"
                  placeholder="Actual Cost"
                  autoComplete="actual_cost"
                  required
                  className="flex-1 px-2 py-1"
                  value={actualExpendatures.actual_cost}
                  onChange={event => handleFormChange(index, event)}
                />
                <input
                  id="remarks"
                  name="remarks"
                  type="text"
                  placeholder="Remarks"
                  autoComplete="remarks"
                  required
                  className="flex-1 px-2 py-1"
                  value={actualExpendatures.remarks}
                  onChange={event => handleFormChange(index, event)}
                />
                <input
                  id="source_of_funds"
                  name="source_of_funds"
                  type="text"
                  placeholder="Source of Funds"
                  autoComplete="source_of_funds"
                  required
                  className="flex-1 px-2 py-1"
                  value={actualExpendatures.source_of_funds}
                  onChange={event => handleFormChange(index, event)}
                />
                <input
                  id="total"
                  name="total"
                  type="text"
                  placeholder="Actual Total"
                  autoComplete="total"
                  required
                  className="flex-1 px-2 py-1"
                  value={actualExpendatures.total}
                  onChange={event => handleFormChange(index, event)}
                />
        {/*<button onClick={() => removeFields(index)}>Remove</button>*/}
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
