import React, { useState, useEffect } from 'react';
import axiosClient from '../../../../axios/axios';
import NeutralButton from '../../../../components/buttons/NeutralButton';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import * as XLSX from 'xlsx';

export default function ExcelImport() {

    const [n_mandate, setMandate] = useState([]);

    const [report, setReport] = useState([]);

    useEffect(() => {
        fetchCurriculum();
        fetchMandates();
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

    const fetchMandates = async () => {
        try {
            const response = await axiosClient.get('/showmandates');
            if (response.data) {
                setMandate(response.data);
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
        textAlign: 'center',
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

    //-----CREATE UPDATE

    const [mandates, setMandates] = useState([{ mandate_id: '', activities: [{ activity_id: ''}] }]);

    const handleMandateNameChange = (index, value) => {
        const updatedMandates = [...mandates];
        updatedMandates[index].mandate_id = value;
        setMandates(updatedMandates);
    };

    const handleAddActivity = (mandateIndex) => {
        const updatedMandates = [...mandates];
        updatedMandates[mandateIndex].activities.push({ activity_id: ''});
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
        setMandates([...mandates, { mandate_id: '', activities: [{ activity_id: ''}] }]);
    };

    //-----SAVE TO DB and APPEND TO TABLE
    const handeSubmit = () => {
        // send acc_report, send activity_id, then mandate_id
        console.log('Mandates: ', mandates);
        axiosClient.put('/addmandates', {set_mandate: mandates})
        .then(response => {
            console.log('Success:', response.data);
            // Handle success response here
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error response here
        });
    }

    return (
        <div>
            <table>
                <thead>
                    <td>+++++</td>
                    <td>+++++</td>
                    <td>+++++</td>
                    <td>+++++</td>
                    <td>+++++</td>
                    <td>+++++</td>
                    <td>+++++</td>
                </thead>
                <tbody>
                    {mandates.map((mandate, mandateIndex) => (
                    <React.Fragment key={mandateIndex}>
                        <tr>
                        <td colSpan="6">
                            <select
                                value={mandate.mandate_id}
                                onChange={(e) => handleMandateNameChange(mandateIndex, e.target.value)}
                                className="w-full"
                                >
                                <option value="">Select Mandate</option>
                                {n_mandate.map((item) => (
                                    <option key={item.id} value={item.id}>{item.id}) {item.gender_issue}</option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <button style={tnStyles} onClick={() => handleRemoveMandate(mandateIndex)}>Remove Mandate</button>
                        </td>
                        </tr>
                        {mandate.activities.map((activity, activityIndex) => (
                        <tr key={activityIndex}>
                            <td></td>
                            <td></td>
                            <td colSpan="4">
                                <select
                                    value={activity.activity_id}
                                    onChange={(e) => handleActivityChange(mandateIndex, activityIndex, 'activity_id', e.target.value)}
                                    className="w-full"
                                    >
                                    <option value="">Select Activity</option>
                                    {report.map((item) => (
                                        <option key={item.id} value={item.id}>{item.id}) {item.title}</option>
                                    ))}
                                </select>
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
                        <td colSpan="7">
                            <button style={tnStyles} onClick={() => handleAddActivity(mandateIndex)}>Add Activity</button>
                        </td>
                        </tr>
                    </React.Fragment>
                    ))}
                    <tr>
                    <td style={tvStyles} colSpan="7">
                        <button onClick={handleAddMandate}>Add Mandate</button>
                    </td>
                    </tr>
                </tbody>
            </table>
            <div class="pt-2 flex justify-center">
                <button onClick={handeSubmit} style={tvStyles}>Save/Export</button>
            </div>
        </div>
    );
}