import React from 'react';
import Submit from '../../../../../../components/buttons/Submit';

export default function ShowActivityModal({ selectedForm }) {

  const renderFields = (name, label) => {
    return (
      <div>
        <label htmlFor={name} className="font-bold">{label}</label>

        <input
          id={name}
          name={name}
          type="text"
          autoComplete={name}
          placeholder="I am empty..."
          value={selectedForm[name]}
          className="bg-white underline"
          disabled
        />
      </div>
    );
  }

  const tableBorder = "border border-black border-solid";
  
  return (
    <div>
      {renderFields("title", "Title: ")}
      {renderFields("date_of_activity", "Date of Activity: ")}
      {renderFields("venue", "Venue: ")}
      {renderFields("proponents_implementors", "Proponents/Implementors: ")}
      {renderFields("male_participants", "Male Participants: ")}
      {renderFields("female_participants", "Female Participants: ")}
      {renderFields("no_of_participants", "Total Number of Participants: ")}

      <h2 className='text-center m-3'>
        Budgetary Requirements:
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className={tableBorder}>Type</th>
              <th className={tableBorder}>Item</th>
              <th className={tableBorder}>Approved Budget</th>
              <th className={tableBorder}>Actual Expenditure</th>
            </tr>
          </thead>
          <tbody>
            {selectedForm.actual_expenditure.map((expenditure, index) => (
              <tr key={index}>
                <td className={tableBorder}>{expenditure.type}</td>
                <td className={tableBorder}>{expenditure.items}</td>
                <td className={tableBorder}>{expenditure.approved_budget}</td>
                <td className={tableBorder}>{expenditure.actual_expenditure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className='text-center m-3'>Attached Documents</h2>
        <table className='min-w-full'>
          <thead>
            <tr>
                <th className={`w-1/2 ${tableBorder}`}>
                  Activity Designs
                </th>
                <th className={`w-1/2 ${tableBorder}`}>
                  Accomplishment Reports
                </th>
            </tr>
          </thead>
          <tbody>
            <td className={`w-1/2 ${tableBorder}`}>

            </td>
            <td className={`w-1/2 ${tableBorder}`}>

            </td>
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
