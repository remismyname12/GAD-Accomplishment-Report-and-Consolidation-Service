import React, { useEffect, useState } from 'react';
import axiosClient from '../../../../axios/axios';
import * as XLSX from 'xlsx';

export default function TestTables() {

    //fetch function
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

    const tvStyles = {
        border: '2px solid black',
        padding: '5px',
        backgroundColor: 'white',
        textAlign: 'center',
        verticalAlign: 'top',
        whiteSpace: 'pre-wrap'
    };

    const thStyles = {
        border: '2px solid black',
        padding: '10px',
        textAlign: 'center',
        backgroundColor: '#FFFF00',
        whiteSpace: 'pre-wrap'
    };

    const trStyles = {
        border: '2px solid black',
        padding: '5px',
        backgroundColor: 'white',
        verticalAlign: 'top',
        whiteSpace: 'pre-wrap'
    };

    const tnStyles = {
        border: '2px solid black',
        padding: '5px',
        backgroundColor: 'white',
        textAlign: 'center',
        verticalAlign: 'top',
        whiteSpace: 'pre-wrap'
    };

    const [htmlData, setHtmlData] = useState('');

    const convertExcelToHTML = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const html = XLSX.utils.sheet_to_html(worksheet);
    
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
    
            // Add styles to the elements within the temporary div
            tempDiv.querySelectorAll('th, tr, td').forEach((element) => {
                element.style.border = '2px solid black';
            });
    
            // Get the modified HTML from the temporary div
            const styledHtml = tempDiv.innerHTML;
    
            setHtmlData(styledHtml);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            convertExcelToHTML(file);
        }
    };

    const exportToFile = (editedData) => {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(editedData, 'text/html');

        // Get the table element from the DOM
        const tableElement = htmlDoc.querySelector('table');

        // Convert the table element to XLSX worksheet
        const ws = XLSX.utils.table_to_sheet(tableElement);

        // Create a new workbook and append the worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Report');

        // Save the workbook as an Excel file
        XLSX.writeFile(wb, 'report.xlsx');
    };

    const handleHtmlChange = (e) => {
        const editedHtml = e.target.innerHTML;
        setHtmlData(editedHtml);
    };

    //-----
    let contentMap = {};
    const parseHtmlContent = () => {
        const baseTable = document.getElementById('base-table');
        const tdElements = baseTable.querySelectorAll('td');
        contentMap = {};

        tdElements.forEach(td => {
            const id = td.getAttribute('id');
            const content = td.innerHTML;
            contentMap[id] = content;
        });

        console.log('Content Map:', contentMap);
        // You can further process the contentMap as per your requirements
    };

    const handleExport = () => {
        parseHtmlContent();
        const baseTable = document.getElementById('base-table');
    
        Object.entries(contentMap).forEach(([id, content]) => {
            const tdElement = baseTable.querySelector(`#${id}`);
            if (tdElement) {
                tdElement.setAttribute('data-v', content);
            }
        });
    
        const updatedHtmlData = baseTable.innerHTML;
        console.log('Updated:', updatedHtmlData);
        
        exportToFile(updatedHtmlData);
    };
    //-----

    //NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN

    const handleAppend = () => {
        const jsxContent = generateJSXContentHTML(report);
        // Find the position of the </tbody> tag in the existing htmlData
        const tbodyIndex = htmlData.indexOf('</tbody>');

        if (tbodyIndex !== -1) {
            // Insert jsxContent right before the </tbody> tag
            const updatedHtmlData = htmlData.slice(0, tbodyIndex) + jsxContent + htmlData.slice(tbodyIndex);

            // Update the state with the updated htmlData
            setHtmlData(updatedHtmlData);
        } else {
            // If </tbody> tag is not found, simply append jsxContent to the end
            setHtmlData(prevHtmlData => prevHtmlData + jsxContent);
        }
    }

    // Function to generate JSX content as HTML string
        const generateJSXContentHTML = (report) => {
            let jsxContent = '';
            /*sxContent += `<tr>
                <th style="border: 2px solid black;">1</th>
                <th style="border: 2px solid black; width: '10%';">First Mandate</th>
                <th style="border: 2px solid black; width: '10%';">Cause of Gender Issue 1</th>
                <th style="border: 2px solid black; width: '10%';">GAD Objective A</th>
                <th style="border: 2px solid black; width: '10%';">GAD Activity A</th>
                <th style="border: 2px solid black; width: '10%';">Performance Indicator 1</th>
                <th style="border: 2px solid black; width: '10%';">Target Result 1</th>
                <th style="border: 2px solid black;">Total Males for Mandate</th>
                <th style="border: 2px solid black;">Total Females for Mandate</th>
                <th style="border: 2px solid black;"></th>
                <th style="border: 2px solid black;">Total Actual Expenses For Mandate</th>
                <th style="border: 2px solid black;">Total Attribution For Mandate</th>
            </tr>`;*/
        
        report.forEach((form, index) => {
            form.actual_expenditure.forEach((expenditure, idx) => {
                jsxContent += `<tr key="${index * 1000 + idx}">
                
                    ${idx === 0 ? `
                        <td rowspan="${form.actual_expenditure.length}" style="border: 2px solid black;"></td>
                        <td rowspan="${form.actual_expenditure.length}" colSpan="6" style="border: 2px solid black;">${index + 1}) ${form.title}</td>
                        <td rowspan="${form.actual_expenditure.length}" style="border: 2px solid black;">${form.male_participants}</td>
                        <td rowspan="${form.actual_expenditure.length}" style="border: 2px solid black;">${form.female_participants}</td>
                    ` : ''}
                    <td style="border: 2px solid black;">${expenditure.type}</td>
                    <td style="border: 2px solid black;">${expenditure.actual_cost}</td>
                    <td style="border: 2px solid black;">+++</td>
                </tr>`;
                });
            });
            return jsxContent;
        };
    //NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN

    return (
        <div>
            <div><b>Merging Test</b></div>
            <div>
                <div class="flex items-center justify-center">
                    <input id="file-upload" type="file" accept=".xls, .xlsx" class="p-2" onChange={handleFileChange}/>
                </div>
                <div id="table-container" style={tnStyles}>
                    <div
                        id="base-table"
                        contentEditable={true}
                        dangerouslySetInnerHTML={{ __html: htmlData }}
                        onChange={event => {handleHtmlChange(event);}}
                    />
                    </div>
                </div>
            <div>
                <button class="p-2" onClick={() => handleExport()}>Export Edited HTML Content to Excel</button>
                
            </div>
            <br></br>
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
                        <th style={{ ...thStyles, backgroundColor: 'white' }}></th>
                        <th colSpan="11" style={{ ...thStyles, backgroundColor: 'white' }}>Client-Focused Activities</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th style={trStyles}>1</th>
                        <th style={trStyles}>First Mandate</th>
                        <th style={trStyles}>Cause of Gender Issue 1</th>
                        <th style={trStyles}>GAD Objective A</th>
                        <th style={trStyles}>GAD Activity A</th>
                        <th style={trStyles}>Performance Indicator 1</th>
                        <th style={tvStyles}>Target Result 1</th>
                        <th style={tvStyles}>Total Males for Mandate</th>
                        <th style={tvStyles}>Total Females for Mandate</th>
                        <th style={tnStyles}></th>
                        <th style={tnStyles}>Total Actual Expenses For Mandate</th>
                        <th style={tnStyles}>Total Attribution For Mandate</th>
                    </tr>
                    {report.map((form, index) => (
                        form.actual_expenditure.map((expenditure, idx) => (
                            <tr key={index * 1000 + idx}>
                                {idx === 0 && (
                                    <>
                                        <td rowspan={form.actual_expenditure.length} style={trStyles}></td>
                                        <td rowspan={form.actual_expenditure.length} colSpan="6" style={trStyles}>{index + 1}) {form.title}</td>
                                        <td rowspan={form.actual_expenditure.length}  style={tvStyles}>{form.male_participants}</td>
                                        <td rowspan={form.actual_expenditure.length}  style={tvStyles}>{form.female_participants}</td>
                                    </>
                                )}
                               
                                <td style={tnStyles}>{expenditure.type}</td>
                                <td style={tnStyles}>{expenditure.actual_expenditure}</td>
                                <td style={tnStyles}>+++</td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
            <button class="p-2" onClick={() => handleAppend()}>Add to Excel File</button>
        </div>
    );
}