import React, { useEffect, useState } from 'react';
import axiosClient from '../../../../axios/axios';
import ReactModal from 'react-modal';
import SetMandateModal from '../ManageUser/Modals/SetMandateModal';
import Feedback from '../../../../components/feedbacks/Feedback';

export default function TestTables() {
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(true);

    const [n_mandate, setMandate] = useState([]);
    const [report, setReport] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [showMandate, setShowMandate] = useState(false);
    const [reportList, setReportList] = useState([]);

    useEffect(() => {
        fetchReports();
        fetchMandates();
    }, []);

    const fetchReports = async () => {
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

     // Function to toggle the selection of a row
    const toggleRowSelection = (index) => {
        const isSelected = selectedRows.includes(index);
        if (isSelected) {
          setSelectedRows(selectedRows.filter((i) => i !== index));
        } else {
          setSelectedRows([...selectedRows, index]);
        }
    };
      // Function to toggle the selection of all rows
    const toggleSelectAll = () => {
        if (selectAll) {
          setSelectedRows([]);
        } else {
          setSelectedRows(report.map((_, index) => index));
        }
        setSelectAll(!selectAll);
    };

    //<><><><><>
  const editprompt = (ev) => {
    ev.preventDefault();
    
    if (selectedRows.length === 0) {
      // No items selected, show an error message
      setMessage('No items selected.');
      setSuccess(false);
      return
    }

    const selectedItems = selectedRows.map((index) => ({
      title: report[index].title,
      mandates_id: report[index].mandates_id,
    }));

    console.log('Selected: ', selectedItems);
    console.log('Mandates: ', n_mandate);
    
    setReportList(selectedItems);
    setShowMandate(true);
  }

    return (
        <div>
            <Feedback isOpen={message !== ''} onClose={() => setSuccess('')} successMessage={message}  status={success}/>
            <table id="reports_table" className="border-collapse border border-gray-400 w-full mt-5">
                <thead>
                    <tr className="border border-gray-400">
                        <th>
                            <input id='allselect' type="checkbox" className="ml-5" checked={selectAll} onChange={toggleSelectAll}/>
                            <label className="ml-2">Select All</label>
                        </th>
                        <th>Accomplishment Report</th>
                        <th>GAD Mandate</th>
                    </tr>
                </thead>
                <tbody>
                {report.map((fileName, index) => (
                  <tr key={index} onClick={() => toggleRowSelection(index)}>
                    <td className='text-center border border-gray-300'>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => toggleRowSelection(index)}
                      />
                    </td>
                    <td className='text-left px-5 border border-gray-300'>{fileName.id}) {fileName.title}</td>
                    <td className='text-center border border-gray-300'>{fileName.mandates_id}</td>
                  </tr>
                ))}
                </tbody>
            </table>
            <div className='w-full flex pt-2 justify-end'>
                <div className=''>
                   <button
                    onClick={editprompt}
                    className={`rounded-md bg-primary hover:bg-accent hover:drop-shadow-gs px-3 py-1.5 text-xs xl:text-md font-semibold leading-6 text-white text-center shadow-sm`}
                   >
                    Set Mandates
                   </button>
                </div>
            </div>

            <ReactModal
              isOpen={showMandate}
              onRequestClose={() => setShowMandate(false)}
              className="mx-auto my-[5%] bg-white w-full lg:w-2/5 px-4 py-6 shadow-lg rounded-lg ring-1 ring-black shadow-2xl"
            >
              <SetMandateModal
                closeModal={() => setShowMandate(false)}
                reportList={reportList}
                n_mandate={n_mandate}
              />
            </ReactModal>

        </div>
    );
}