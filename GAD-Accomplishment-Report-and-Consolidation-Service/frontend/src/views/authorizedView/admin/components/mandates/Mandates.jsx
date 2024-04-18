import React, { useState, useEffect } from 'react';
import axiosClient from '../../../../axios/axios';
import { ArchiveBoxArrowDownIcon, PencilIcon } from '@heroicons/react/24/solid';
import ReactModal from 'react-modal';
import EditMandatesModal from './components/modals/EditMandatesModal';
import ArchiveMandateModal from './components/modals/ArchiveMandateModal';

export default function Mandates() {
  const [mandates, setMandates] = useState([]);
  const [selectedMandate, setSelectedMandate] = useState('')

  //For Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

  // For Mandate EDIT
  const handleEditClick = (selected_mandate) => {
    setIsEditModalOpen(true)
    setSelectedMandate([selected_mandate]);
  }

  // For Form Archive
  const handleArchiveClick = (selected_mandate) => {
    setIsArchiveModalOpen(true)
    setSelectedMandate(selected_mandate)
  }

  useEffect(() => {
    const fetchMandates = async () => {
      try {
        const { data } = await axiosClient.get('/showmandates');
        Array.isArray(data) ? setMandates(data) : console.error('Invalid response format:', data);
      } catch (error) {
        console.error('Error fetching mandates:', error);
      }
    };

    fetchMandates();
  }, []);

  const TableHeader = ({ title }) => (
    <th className="mx-1 py-2 px-5">{title}</th>
  );
  
  return (
    <div className='h-full'>
      <div className='bg-white flex h-full overflow-y-auto rounded-xl'>
        <table className='w-screen text-center h-fit'>
          <thead className='bg-secondary sticky top-0'>
            <tr>
              <TableHeader title="Gender Issue" />
              <TableHeader title="Cause of Gender Issue" />
              <TableHeader title="GAD Result Statement" />
              <TableHeader title="GAD Activity" />
              <TableHeader title="Performance Indicators" />
              <TableHeader title="Target Result" />
              <TableHeader title="Activity Focus" />
              <TableHeader title="Actions" />
            </tr>
          </thead>
          <tbody>
            {mandates.map((mandate, index) => (
              <tr key={index}
              className='px-10 border-b-2 border-secondary hover:bg-accent hover:drop-shadow-gs transition-transform hover:scale-sm'
              >
                <td className="text-center p-2">{index+1}) {mandate.gender_issue}</td>
                <td className="text-center p-2">{mandate.cause_of_gender_issue}</td>
                <td className="text-center p-2">{mandate.gad_result_statement}</td>
                <td className="text-center p-2">{mandate.gad_activity}</td>
                <td className="text-center p-2">{mandate.performance_indicators}</td>
                <td className="text-center p-2">{mandate.target_result}</td>
                <td className="text-center p-2">{mandate.focus}</td>
                <td className="text-center p-2">
                  <ul className='flex flex-row items-center justify-center'>
                    <li>
                      <PencilIcon onClick={() => handleEditClick(mandate)} className='h-5 w-5 mx-1 cursor-pointer transition-transform hover:scale-1xl' />
                    </li>
                    <li>
                      <ArchiveBoxArrowDownIcon onClick={() => handleArchiveClick(mandate)} className='h-5 w-5 mx-1 cursor-pointer transition-transform hover:scale-1xl' />
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/** Modal For Mandate EDIT */}
      <ReactModal
            isOpen={isEditModalOpen}
            onRequestClose={() => setIsEditModalOpen(false)}
            className="w-full md:w-fit h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[1%] mx-auto p-5"
        >
            <EditMandatesModal 
                closeModal={() => setIsEditModalOpen(false)}
                mandateSelected={selectedMandate}
            />
      </ReactModal>

        {/** Modal For Mandate ARCHIVE */}                
        <ReactModal
            isOpen={isArchiveModalOpen}
            onRequestClose={() => setIsArchiveModalOpen(false)}
            className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
        >
            <div>
                <ArchiveMandateModal
                 closeModal={() => setIsArchiveModalOpen(false)}
                 mandateSelected={selectedMandate}
                 />
            </div>
        </ReactModal>
    </div>
  );
}


