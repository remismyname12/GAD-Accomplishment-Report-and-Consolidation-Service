import React, { useEffect, useState } from 'react';
import axiosClient from '../../../../axios/axios';
import * as XLSX from 'xlsx';
//import * as fs from 'fs';


export default function AnnualReport() {
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
    //-----CSS

    /*const handleInputChange = (index, event) => {
        let data = [...report];
        data[index][event.target.name] = event.target.value;
        setReport(data);
    };*/

    const exportToExcel = () => {
        /*const ws = XLSX.utils.table_to_sheet(document.getElementById('report-table'));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Report');
        XLSX.writeFile(wb, 'report.xlsx');*/
        // Get the worksheet from the table
       // Get the worksheet from the table
       const ws = XLSX.utils.table_to_sheet(document.getElementById('report-table'));

       // Set column widths
       ws['!cols'] = [
            { width: 2 },
            { width: 20 }, // Column A GENDER ISSUE / GAD MANDATE
            { width: 20 }, // Column B CAUSE OF GENDER ISSUE
            { width: 20 }, // Column C GAD RESULT STATEMENT / GAD OBJECTIVE
            { width: 20 }, // Column D GAD ACTIVITY
            { width: 20 }, // Column E PERFORMANCE INDICATORS / TARGETS
            { width: 20 }, // Column F TARGET RESULT
            { width: 10 }, // Column G ATTENDANCE->Male
            { width: 10 }, // Column H ATTENDANCE->Female
            { width: 13 }, // Column I ACTUAL COST->(Blank) 
            { width: 13 }, // Column J ACTUAL COST->ACTUAL EXPENSES
            { width: 13 }, // Column K ACTUAL COST->ATTRIBUTION
       ];
   
       // Set row heights
       ws['!rows'] = [
           //{ hpx: 30 }, // Row 1
           //{ hpx: 30 }, // Row 2
           //{ hpx: 30 }, // Row 3
           // Add more rows as needed
       ];

    // Create a new workbook and append the modified worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');

    // Save the workbook as 'report.xlsx'
    XLSX.writeFile(wb, 'report.xlsx');
    };


    return (
        <div>
            <button onClick={exportToExcel}>Export to Excel</button>
            <table id="report-table">
                <thead>
                    <tr>
                        <th colSpan="12">BENGUET STATE UNIVERSITY ANNUAL GENDER AND DEVELOPMENT (GAD) ACCOMPLISHMENT FY 20XX</th>
                    </tr>
                    <tr>
                        <th style={thStyles}></th>
                        <th style={{ ...thStyles, width: '10%' }}>GENDER ISSUE / GAD MANDATE</th>
                        <th style={{ ...thStyles, width: '10%' }}>CAUSE OF GENDER ISSUE</th>
                        <th style={{ ...thStyles, width: '10%' }}>GAD RESULT STATEMENT / GAD OBJECTIVE</th>
                        <th style={{ ...thStyles, width: '10%' }}>GAD ACTIVITY</th>
                        <th style={{ ...thStyles, width: '10%' }}>PERFORMANCE INDICATORS / TARGETS</th>
                        <th style={{ ...thStyles, width: '10%' }}>TARGET RESULT</th>
                        <th colSpan="2" style={thStyles}>ATTENDANCE</th>
                        <th colSpan="3" style={thStyles}>ACTUAL COST/ EXPENDITURE (ACTUAL + ATTRIBUTED AMOUNT)</th>
                    </tr>
                    <tr>
                        <th style={thStyles}></th>
                        <th colSpan="6" style={thStyles}></th>
                        <th style={{ ...thStyles, backgroundColor: '#00B0F0' }}>MALE</th>
                        <th style={{ ...thStyles, backgroundColor: '#FF66FF' }}>FEMALE</th>
                        <th style={{ ...thStyles, width: '10%' }}></th>
                        <th style={{ ...thStyles, width: '10%' }}>ACTUAL EXPENSES</th>
                        <th style={{ ...thStyles, width: '10%' }}>ATTRIBUTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td style={thStyles}></td>
                        <td style={thStyles}>1</td>
                        <td style={thStyles}>2</td>
                        <td style={thStyles}>3</td>
                        <td style={thStyles}>4</td>
                        <td style={thStyles}>5</td>
                        <td style={thStyles}>6</td>
                        <td colSpan="2" style={thStyles}>7</td>
                        <td colSpan="3" style={thStyles}>8</td>
                    </tr>
                    <tr>
                        <th style={{ ...thStyles, backgroundColor: 'white' }}></th>
                        <th colSpan="11" style={{ ...thStyles, backgroundColor: 'white' }}>Client-Focused Activities</th>
                    </tr>
                    <tr>
                        <td style={trStyles}>1</td>
                        <td style={trStyles}>First Mandate</td>
                        <td style={trStyles}>Cause of Gender Issue 1</td>
                        <td style={trStyles}>GAD Objective A</td>
                        <td style={trStyles}>GAD Activity A</td>
                        <td style={trStyles}>Performance Indicator 1</td>
                        <td style={tvStyles}>Target Result 1</td>
                        <td style={{ ...tvStyles, backgroundColor: '#00B0F0' }}>Total Males for Mandate</td>
                        <td style={{ ...tvStyles, backgroundColor: '#FF66FF' }}>Total Females for Mandate</td>
                        <td style={tnStyles}></td>
                        <td style={tnStyles}>Total Actual Expenses For Mandate</td>
                        <td style={tnStyles}>Total Attribution For Mandate</td>
                    </tr>
                    {report.map((form, index) => (
                        form.actual_expenditure.map((expenditure, idx) => (
                            <tr key={index * 1000 + idx}>
                                {idx === 0 && (
                                    <>
                                        <td rowspan={form.actual_expenditure.length} style={trStyles}></td>
                                        <td rowspan={form.actual_expenditure.length} colSpan="6" style={trStyles}>
                                            
                                            {/*{index + 1}) <input 
                                            style={{border: 'none' }} 
                                            id="title"
                                            name="title"
                                            type="text"
                                            placeholder="Title"
                                            autoComplete="Title"
                                            //value={form.title}
                                            onChange={event => handleInputChange(index, event)}
                                            />
                                            {form.title} 
                                            //possible to add input fields
                                            */}
                                            {index + 1}) {form.title}
                                        </td>
                                        <td rowspan={form.actual_expenditure.length}  style={{ ...tvStyles, backgroundColor: '#00B0F0' }}>{form.male_participants}</td>
                                        <td rowspan={form.actual_expenditure.length}  style={{ ...tvStyles, backgroundColor: '#FF66FF' }}>{form.female_participants}</td>
                                    </>
                                )}
                               
                                <td style={tnStyles}>{expenditure.type}</td>
                                <td style={tnStyles}>{expenditure.actual_cost}</td>
                                <td style={tnStyles}>+++</td>
                            </tr>
                        ))
                    ))}
                    <tr>
                        <td style={tnStyles}></td>
                        <td style={tnStyles} colSpan="8"><b>TOTAL PER MANDATE. MAKE MANDATES TABLE TO MAP</b></td>
                        <td style={tnStyles}></td>
                        <td style={{ ...tnStyles, backgroundColor: '#C5E0B3' }}>Total Actual Expenses For Mandate</td>
                        <td style={{ ...tnStyles, backgroundColor: '#C5E0B3' }}>Total Attribution For Mandate</td>
                    </tr>
                    <tr>
                        <td style={tnStyles} colSpan="12">---</td>
                    </tr>
                {/*Table Part 2*/}

                    <tr>
                        <th style={{ ...thStyles, backgroundColor: 'white' }}></th>
                        <th colSpan="11" style={{ ...thStyles, backgroundColor: 'white' }}>Organization-Focused Activities</th>
                    </tr>
                    <tr>
                        <td style={trStyles}>1</td>
                        <td style={trStyles}>First Mandate</td>
                        <td style={trStyles}>Cause of Gender Issue 1</td>
                        <td style={trStyles}>GAD Objective A</td>
                        <td style={trStyles}>GAD Activity A</td>
                        <td style={trStyles}>Performance Indicator 1</td>
                        <td style={tvStyles}>Target Result 1</td>
                        <td style={{ ...tvStyles, backgroundColor: '#00B0F0' }}>Total Males for Mandate</td>
                        <td style={{ ...tvStyles, backgroundColor: '#FF66FF' }}>Total Females for Mandate</td>
                        <td style={tnStyles}></td>
                        <td style={tnStyles}>Total Actual Expenses For Mandate</td>
                        <td style={tnStyles}>Total Attribution For Mandate</td>
                    </tr>
                    {report.map((form, index) => (
                        form.actual_expenditure.map((expenditure, idx) => (
                            <tr key={index * 1000 + idx}>
                                {idx === 0 && (
                                    <>
                                        <td rowspan={form.actual_expenditure.length} style={trStyles}></td>
                                        <td rowspan={form.actual_expenditure.length} colSpan="6" style={trStyles}>
                                            
                                            {/*{index + 1}) <input 
                                            style={{border: 'none' }} 
                                            id="title"
                                            name="title"
                                            type="text"
                                            placeholder="Title"
                                            autoComplete="Title"
                                            //value={form.title}
                                            onChange={event => handleInputChange(index, event)}
                                            />
                                            {form.title} 
                                            //possible to add input fields
                                            */}
                                            {index + 1}) {form.title}
                                        </td>
                                        <td rowspan={form.actual_expenditure.length}  style={{ ...tvStyles, backgroundColor: '#00B0F0' }}>{form.male_participants}</td>
                                        <td rowspan={form.actual_expenditure.length}  style={{ ...tvStyles, backgroundColor: '#FF66FF' }}>{form.female_participants}</td>
                                    </>
                                )}
                               
                                <td style={tnStyles}>{expenditure.type}</td>
                                <td style={tnStyles}>{expenditure.actual_cost}</td>
                                <td style={tnStyles}>+++</td>
                            </tr>
                        ))
                    ))}
                    <tr>
                        <td style={tnStyles}></td>
                        <td style={tnStyles} colSpan="8"><b>TOTAL PER MANDATE. MAKE MANDATES TABLE TO MAP</b></td>
                        <td style={tnStyles}></td>
                        <td style={{ ...tnStyles, backgroundColor: '#C5E0B3' }}>Total Actual Expenses For Mandate</td>
                        <td style={{ ...tnStyles, backgroundColor: '#C5E0B3' }}>Total Attribution For Mandate</td>
                    </tr>
                    <tr>
                        <td style={tnStyles} colSpan="12">---</td>
                    </tr>


                </tbody>
            </table>
        </div>
    );
}
