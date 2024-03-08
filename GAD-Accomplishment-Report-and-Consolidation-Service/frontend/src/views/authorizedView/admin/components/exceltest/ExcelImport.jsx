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
                                value={mandate.name}
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
                                    value={activity.type}
                                    onChange={(e) => handleActivityChange(mandateIndex, activityIndex, 'type', e.target.value)}
                                    className="w-full"
                                    >
                                    <option value="">Select Activity</option>
                                    {report.map((item) => (
                                        <option key={item.id} value={item.title}>{item.id}) {item.title}</option>
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
        </div>
    );
}