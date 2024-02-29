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

    const thStyles = {
        border: '1px solid black',
        padding: '10px',
        textAlign: 'center',
        backgroundColor: 'lightgray',
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.table_to_sheet(document.getElementById('report-table'));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Report');
        XLSX.writeFile(wb, 'report.xlsx');
    };


    return (
        <div>
            <button onClick={exportToExcel}>Export to Excel</button>
            <table id="report-table">
                <thead>
                    <tr>
                        <th style={{ ...thStyles, width: 'fit' }}>GENDER ISSUE / GAD MANDATE</th>
                        <th style={thStyles}>CAUSE OF GENDER ISSUE</th>
                        <th style={thStyles}>GAD RESULT STATEMENT / GAD OBJECTIVE</th>
                        <th style={{ ...thStyles, width: '10%' }}>GAD ACTIVITY</th>
                        <th style={thStyles}>PERFORMANCE INDICATORS / TARGETS</th>
                        <th style={{ ...thStyles, width: '3%' }}>TARGET RESULT</th>
                        <th colSpan="2" style={thStyles}>ATTENDANCE</th>
                        <th colSpan="3" style={thStyles}>ACTUAL COST/ EXPENDITURE (ACTUAL + ATTRIBUTED AMOUNT)</th>
                    </tr>
                    <tr>
                        
                        <th colSpan="6" style={thStyles}></th>
                        <th style={thStyles}>MALE</th>
                        <th style={thStyles}>FEMALE</th>
                        <th style={{ ...thStyles, width: '10%' }}></th>
                        <th style={{ ...thStyles, width: '10%' }}>ACTUAL EXPENSES</th>
                        <th style={{ ...thStyles, width: '10%' }}>ATTRIBUTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
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
                        <th colSpan="11" style={thStyles}>Client-Focused Activities</th>
                    </tr>
                    <tr >
                        <td style={thStyles}>First Mandate</td>
                        <td style={thStyles}>Cause of Gender Issue 1</td>
                        <td style={thStyles}>GAD Objective A</td>
                        <td style={thStyles}>GAD Activity A</td>
                        <td style={thStyles}>Performance Indicator 1</td>
                        <td style={thStyles}>Target Result 1</td>
                        <td style={thStyles}>Calculate Total Males for Mandate</td>
                        <td style={thStyles}>Calculate Total Females for Mandate</td>
                        <td style={thStyles}></td>
                        <td style={thStyles}>Calculate Total Actual Expenses</td>
                        <td style={thStyles}>Calculate Total Attribution</td>
                    </tr>
                    {report.map((form, index) => (
                        form.actual_expenditure.map((expenditure, idx) => (
                            <tr key={index * 1000 + idx}>
                                {idx === 0 && (
                                    <>
                                        <td rowspan={form.actual_expenditure.length} colSpan="6" style={thStyles}>{index + 1}) {form.title}</td>
                                        <td rowspan={form.actual_expenditure.length}  style={thStyles}>{form.male_participants}</td>
                                        <td rowspan={form.actual_expenditure.length}  style={thStyles}>{form.female_participants}</td>
                                    </>
                                )}
                                <td style={thStyles}>{expenditure.type}</td>
                                <td style={thStyles}>{expenditure.actual_cost}</td>
                                <td style={thStyles}>Utang</td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
}
