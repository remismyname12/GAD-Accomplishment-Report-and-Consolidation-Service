import React, { useState, useEffect } from 'react';
import axiosClient from '../../../../axios/axios';
import NeutralButton from '../../../../components/buttons/NeutralButton';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import * as XLSX from 'xlsx';

export default function ExcelImport() {

    const [mandate, setMandate] = useState([
        "Mandate 1",
        "Mandate 2",
        "Mandate 3",
        "Mandate 4",
        "Mandate 5",
        "Mandate 6",
        "Mandate 7",
        "Mandate 8"
      ]);

      const [activity, setActivity] = useState([
        "Activity 1",
        "Activity 2",
        "Activity 3",
        "Activity 4",
        "Activity 5",
        "Activity 6",
        "Activity 7",
        "Activity 8"
      ]);

    const [report, setReport] = useState([]);

    useEffect(() => {
        fetchCurriculum();
    }, []);

    const fetchCurriculum = async () => {
        try {
            const response = await axiosClient.get('/show_accomplishment_report');
            if (response.data) {
                setReport(response.data);
            } else {
                console.error('Invalid response format:', response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    //-----CSS
    const thStyles = {
        border: '1px solid black',
        padding: '10px',
        textAlign: 'center',
        backgroundColor: '#FFFF00',
        whiteSpace: 'pre-wrap'
    };

    const trStyles = {
        border: '1px solid black',
        padding: '5px',
        backgroundColor: 'white',
        verticalAlign: 'top',
        whiteSpace: 'pre-wrap'
    };

    const tnStyles = {
        border: '1px solid black',
        padding: '5px',
        backgroundColor: 'white',
        textAlign: 'right',
        verticalAlign: 'top',
        whiteSpace: 'pre-wrap'
    };

    const tvStyles = {
        border: '1px solid black',
        padding: '5px',
        backgroundColor: 'white',
        textAlign: 'center',
        verticalAlign: 'top',
        whiteSpace: 'pre-wrap'
    };
    const tbStyles = {
        border: '1px solid black',
    }
    //-----CSS

    const [mandates, setMandates] = useState([{ name: '', activities: [{ type: '', cost: '' }] }]);

    const handleMandateNameChange = (index, value) => {
        const updatedMandates = [...mandates];
        updatedMandates[index].name = value;
        setMandates(updatedMandates);
    };

    const handleAddActivity = (mandateIndex) => {
        const updatedMandates = [...mandates];
        updatedMandates[mandateIndex].activities.push({ type: '', cost: '' });
        setMandates(updatedMandates);
    };

    const handleActivityChange = (mandateIndex, activityIndex, field, value) => {
        const updatedMandates = [...mandates];
        updatedMandates[mandateIndex].activities[activityIndex][field] = value;
        setMandates(updatedMandates);
    };

    const handleRemoveActivity = (mandateIndex, activityIndex) => {
        const updatedMandates = [...mandates];
        updatedMandates[mandateIndex].activities.splice(activityIndex, 1);
        setMandates(updatedMandates);
    };

    const handleRemoveMandate = (index) => {
        const updatedMandates = [...mandates];
        updatedMandates.splice(index, 1);
        setMandates(updatedMandates);
    };

    const handleAddMandate = () => {
        setMandates([...mandates, { name: '', activities: [{ type: '', cost: '' }] }]);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                    <th colSpan="7">Mandate</th>
                    </tr>
                    <tr>
                    <th>Mandate Name</th>
                    <th colSpan="6">Activities</th>
                    </tr>
                </thead>
                <tbody>
                    {mandates.map((mandate, mandateIndex) => (
                    <React.Fragment key={mandateIndex}>
                        <tr>
                        <td colSpan="3">
                            <input
                            type="text"
                            value={mandate.name}
                            placeholder="Mandate Name"
                            onChange={(e) => handleMandateNameChange(mandateIndex, e.target.value)}
                            className="w-full"
                            />
                        </td>
                        <td>
                            <button style={tnStyles} onClick={() => handleRemoveMandate(mandateIndex)}>Remove Mandate</button>
                        </td>
                        </tr>
                        {mandate.activities.map((activity, activityIndex) => (
                        <tr key={activityIndex}>
                            <td></td>
                            <td>
                            <input
                                type="text"
                                value={activity.type}
                                placeholder="Type"
                                onChange={(e) => handleActivityChange(mandateIndex, activityIndex, 'type', e.target.value)}
                            />
                            </td>
                            <td>
                            <input
                                type="text"
                                value={activity.cost}
                                placeholder="Cost"
                                onChange={(e) => handleActivityChange(mandateIndex, activityIndex, 'cost', e.target.value)}
                            />
                            </td>
                            <td>
                                <button style={tnStyles} onClick={() => handleRemoveActivity(mandateIndex, activityIndex)}>Remove Activity</button>
                            </td>
                        </tr>
                        ))}
                        <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <button style={tnStyles} onClick={() => handleAddActivity(mandateIndex)}>Add Activity</button>
                        </td>
                        </tr>
                    </React.Fragment>
                    ))}
                    <tr>
                    <td style={tvStyles} colSpan="4">
                        <button onClick={handleAddMandate}>Add Mandate</button>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}