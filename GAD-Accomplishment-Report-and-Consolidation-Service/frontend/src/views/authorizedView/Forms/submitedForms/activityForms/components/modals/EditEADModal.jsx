import React, { useState, useEffect } from 'react';
import Submit from '../../../../../../components/buttons/Submit';
import axiosClient from '../../../../../../axios/axios';
import NeutralButton from '../../../../../../components/buttons/NeutralButton';
import { MinusCircleIcon } from '@heroicons/react/24/outline';

//For Feedback
import Feedback from '../../../../../../components/feedbacks/Feedback';
import Error from '../../../../../../components/feedbacks/Error';

export default function EditEADModal({selectedForm}) {
  const selectedForms = selectedForm.Forms;
  console.log('this is the selected form:', selectedForm);
  const expendituresArray = selectedForm.expenditures;

  const [error, setError] = useState('');
  const [message, setAxiosMessage] = useState(''); // State for success message
  const [status, setAxiosStatus] = useState('');

  //----------for exenditure

  const [inputFields, setInputFields] = useState([
    {type: '', item: '', estimated: '', remarks: '', source_of_funds: ''}
  ])


    //------------------------------
    useEffect(() => {
      // Function to generate multiple sets of input fields
      const generateInputFields = () => {
        const newInputFields = expendituresArray.map(expenditure => ({
          id: expenditure.id,
          type: expenditure.type,
          item: expenditure.items,
          estimated: expenditure.estimated_cost,
          remarks: expenditure.remarks,
          source_of_funds: expenditure.source_of_funds
        }));
        setInputFields(newInputFields);
      };
    
      generateInputFields();
  }, []);
  //------------------------------

   //-----
  
   const [removeID, setRemoveID] = useState([]);
   //send to update only when submit is pressed
 
   //-----

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  }

  const addFields = () => {
    let newfield = { type: '', item: '', estimated: '', remarks: '', source_of_funds: '' }

    setInputFields([...inputFields, newfield])
  }

  const removeFields = (index, id) => {
    if (inputFields.length === 1) {
      return;
    }

    let data = [...inputFields];
    data.splice(index, 1)
    setInputFields(data)

    // Update the removeID array by adding the id
    setRemoveID(prevRemoveID => [...prevRemoveID, id]);
    //will also remove from DB
  }

  const [formData, setFormData] = useState({
    title: selectedForm.title,
    date_of_activity: selectedForm.date_of_activity,
    venue: selectedForm.venue,
    clientele_type: selectedForm.clientele_type,
    clientele_number: selectedForm.clientele_number,
    estimated_cost: selectedForm.estimated_cost,
    cooperating_agencies_units: selectedForm.cooperating_agencies_units,
    expected_outputs: selectedForm.expected_outputs,
    fund_source: selectedForm.fund_source,
    proponents_implementors: selectedForm.proponents_implementors,
  });

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //----------axiosClient
  const handleSubmit = async (e) => {
    console.log('ID: ', removeID);
    e.preventDefault();
    try {
        const response = await axiosClient.put(`/update_form_ead/${selectedForm.id}`, {
            form_data: formData,
            xp_data: inputFields,
            to_remove: removeID
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

  //----------

  //For Unified Inputs 
  const renderInput = (name, label) => (
    <div className="flex flex-1 flex-col">
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
    <div className='bg-gray-300 m-5 p-3'>
      {/**For Feedback */}
      <Error isOpen={error !== ''} onClose={() => setError('')} errorMessage={error} />
      
      {/* Integrate the Success component */}
      <Feedback isOpen={message !== ''} onClose={() => setSuccess('')} successMessage={message}  status={status}/>

      <h1 className='text-center'>
        Extension Activity Design Form
      </h1>

      <form onSubmit={handleSubmit} >
        {renderInput("title", "Title: ")}
        {renderInput("date_of_activity", "Date of Activity: ")}
        {renderInput("venue", "Venue: ")}
        {renderInput("clientele_type", "Clientele Type: ")}
        {renderInput("clientele_number", "Clientele Number: ")}
        {renderInput("estimated_cost", "Estimated Cost: ")}
        {renderInput("cooperating_agencies_units", "Cooperating Agencies/Units: ")}
        {renderInput("expected_outputs", "Expected Outputs: ")}
        {renderInput("fund_source", "Fund Source: ")}
        {renderInput("proponents_implementors", "Proponents/Implementors: ")}
        <h1 className='text-center m-3'>
          Budgetary Requirements
        </h1>
        <div className="overflow-x-auto">
        <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Item</th>
                  <th>Estimated Cost</th>
                  <th>Remarks</th>
                  <th>Source of Funds</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {inputFields.map((input, index) => (
                  <tr key={index}>
                    <td>
                      <select
                        id="type"
                        name="type"
                        autoComplete="type"
                        required
                        className="flex-1 px-2 py-1"
                        value={input.type}
                        onChange={event => handleFormChange(index, event)}
                      >
                        <option value="" disabled>Select Type</option>
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
                    </td>
                    <td>
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
                    </td>
                    <td>
                      <input
                        id="estimated"
                        name="estimated"
                        type="text"
                        placeholder="Estimated Cost"
                        autoComplete="estimated"
                        required
                        className="flex-1 px-2 py-1"
                        value={input.estimated}
                        onChange={event => handleFormChange(index, event)}
                      />
                    </td>
                    <td>
                      <input
                        id="remarks"
                        name="remarks"
                        type="text"
                        placeholder="Remarks"
                        autoComplete="remarks"
                        className="flex-1 px-2 py-1"
                        value={input.remarks}
                        onChange={event => handleFormChange(index, event)}
                      />
                    </td>
                    <td>
                      <input
                        id="source_of_funds"
                        name="source_of_funds"
                        type="text"
                        placeholder="Source of Funds"
                        autoComplete="source_of_funds"
                        required
                        className="flex-1 px-2 py-1"
                        value={input.source_of_funds}
                        onChange={event => handleFormChange(index, event)}
                      />
                    </td>
                    <td className='text-center'>
                      <button type="button" title="Delete Item" onClick={() => removeFields(index, input.id)}>
                        <MinusCircleIcon className="w-6 h-6 text-red-500 cursor-pointer transform transition-transform hover:scale-125" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center">
              <NeutralButton label="Add more.." onClick={() => addFields()} />
            </div>
          
        </div>
        
        <div className='mt-5'>
          <Submit label="Submit"/>
        </div>
      </form>
    </div>
  )
  
}
