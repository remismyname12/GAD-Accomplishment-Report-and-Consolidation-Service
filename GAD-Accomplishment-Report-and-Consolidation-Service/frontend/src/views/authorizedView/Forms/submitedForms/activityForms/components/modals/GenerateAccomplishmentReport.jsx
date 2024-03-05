import React, { useState, useEffect } from 'react';
import Submit from '../../../../../../components/buttons/Submit';
import NeutralButton from '../../../../../../components/buttons/NeutralButton';
import axiosClient from '../../../../../../axios/axios';

//For feedback
import Feedback from '../../../../../../components/feedbacks/Feedback';

export default function GenerateAccomplishmentReport({ selectedForm }) {
  // For feedback

  const [actualExpendatures, setActualExpendatures] = useState([{
    type: '',
    item: '',
    remarks: '',
    source_of_funds: '',
    actual_cost: '',
    total: '',
  }]);

  const [message, setAxiosMessage] = useState('');
  const [status, setAxiosStatus] = useState('');

  const expendituresArray = selectedForm.expenditures;

  const [proposedExpenditures, setProposedExpenditures] = useState([
    {type: '', item: '', estimated: '', remarks: '', source_of_funds: '', total: ''}
  ]);

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
        source_of_funds: expenditure.source_of_funds,
        total: expenditure.total
      }));
      setProposedExpenditures(newInputFields);
    };
  
    generateInputFields();
}, []);
  //------------------------------

  const handleFormChange = (index, event) => {
    let data = [...actualExpendatures];
    data[index][event.target.name] = event.target.value;
    setActualExpendatures(data);
  }

  const addFields = () => {
    let newfield = { type: '', item: '', estimated: '', remarks: '', source_of_funds: '', total: '' }

    setActualExpendatures([...actualExpendatures, newfield])
  }

  const removeFields = (index) => {
    let data = [...actualExpendatures];
    data.splice(index, 1)
    setActualExpendatures(data)
}

  const [formData, setFormData] = useState({
    forms_id: selectedForm.id,
    title: selectedForm.title,
    date_of_activity: selectedForm.date_of_activity,
    venue: selectedForm.venue,
    clientele_type: selectedForm.clientele_type,
    clientele_number: selectedForm.clientele_number,
    male_participants: selectedForm.participants_male,
    female_participants: selectedForm.participants_female,
    no_of_participants: selectedForm.no_of_participants,
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
    e.preventDefault();
    console.log(formData);
    try {
        const response = await axiosClient.post('/accomplishment_report', {
          accReport: formData,
            expenditures: actualExpendatures,
        });
        setAxiosMessage(response.data.Message); // Set success message
        setAxiosStatus(response.data.Success);
        setTimeout(() => {
          
            setAxiosMessage(''); // Clear success message
            setAxiosStatus('');
        }, 3000); // Timeout after 3 seconds
      } catch (error) {
        setAxiosMessage(error.response.data.message);
      }
    
  };

  //For Unified Inputs 
  const renderInput = (name, label) => (
    <div className="flex flex-1 flex-col">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type="text"
        autoComplete={name}
        placeholder="I am empty..."
        required
        value={formData[name]}
        onChange={handleChange}
        className="bg-gray-100"
      />
    </div>
  );

  return (
    <div className="flex flex-1 flex-col">
      {/**For Feedback */}
      <Feedback isOpen={message !== ''} onClose={() => setAxiosMessage('')} successMessage={message}  status={status}/>

      <h1 className='text-center'>
        Generate Extension Accomplishment Report
      </h1>

      <form onSubmit={handleSubmit} >
        {renderInput("title", "Title: ")}
        {renderInput("date_of_activity", "Date of Activity: ")}
        {renderInput("venue", "Venue: ")}
        {renderInput("clientele_type", "Clientele Type: ")}
        {renderInput("clientele_number", "Clientele Number: ")}
        {renderInput("male_participants", "Male Participants: ")}
        {renderInput("female_participants", "Female Participants: ")}
        {renderInput("no_of_participants", "Total Number of Participants: ")}
        {renderInput("estimated_cost", "Estimated Cost: ")}
        {renderInput("cooperating_agencies_units", "Cooperating Agencies/Units: ")}
        {renderInput("expected_outputs", "Expected Outputs: ")}
        {renderInput("fund_source", "Fund Source: ")}
        {renderInput("proponents_implementors", "Proponents/Implementors: ")}

        <h1 className='text-center m-3'>
          Proposed Expenditures:
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium uppercase tracking-wider">Item Type</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium uppercase tracking-wider">Estimated Cost</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium uppercase tracking-wider">Remarks</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium uppercase tracking-wider">Source of Funds</th>
              {/*<th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium uppercase tracking-wider">Total</th>*/}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {proposedExpenditures.map((input, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-no-wrap">{input.type}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{input.item}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{input.estimated}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{input.remarks}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{input.source_of_funds}</td>
                  {/*<td className="px-6 py-4 whitespace-no-wrap">{input.total}</td>*/}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h1 className='text-center m-3'>
          Actual Expenditures:
        </h1>
        <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Item</th>
                  <th>Actual Cost</th>
                  <th>Remarks</th>
                  <th>Source of Funds</th>
                </tr>
              </thead>
              <tbody>
                {actualExpendatures.map((input, index) => (
                  <tr key={index}>
                    <td>
                      <select
                        id={`type${index}`}
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
                        id={`item${index}`}
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
                        id={`actual_cost${index}`}
                        name="actual_cost"
                        type="text"
                        placeholder="Actual Cost"
                        autoComplete="actual_cost"
                        required
                        className="flex-1 px-2 py-1"
                        value={input.actual_cost}
                        onChange={event => handleFormChange(index, event)}
                      />
                    </td>
                    <td>
                      <input
                        id={`remarks${index}`}
                        name="remarks"
                        type="text"
                        placeholder="Remarks"
                        autoComplete="remarks"
                        required
                        className="flex-1 px-2 py-1"
                        value={input.remarks}
                        onChange={event => handleFormChange(index, event)}
                      />
                    </td>
                    <td>
                      <input
                        id={`source_of_funds${index}`}
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
                    {/*<td>
                      <button onClick={() => removeFields(index)}>Remove</button>
                    </td>
                */}
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
