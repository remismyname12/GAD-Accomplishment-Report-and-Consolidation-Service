import { React, useState, useEffect } from 'react';
import axiosClient from '../../../../axios/axios';
import { ArchiveBoxArrowDownIcon, PencilIcon } from '@heroicons/react/24/outline';
import ReactModal from 'react-modal';
import ViewEADReportModal from '../activityForms/components/modals/ViewEADReportModal';
import EditActivityModal from '../activityForms/components/modals/EditActivityModal';
import ShowActivityModal from './components/modals/ShowActivityModal';

export default function AccomplishmentReport() {
  const [accomplishmentReport, setAccomplishmentreport] = useState([]);
  const [selectedForm, setSelectedForm] = useState('');

  // For Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axiosClient.get('/show_accomplishment_report');
      setAccomplishmentreport(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // For Form EDIT
  const handleViewClick = (selected_form) => {
    setIsEditModalOpen(true);
    setSelectedForm(selected_form);
  };

  // For Form Archive
  const handleArchiveClick = (selected_form) => {
    setIsArchiveModalOpen(true);
    setSelectedForm(selected_form);
  };

  // For Unified Inputs 
  const UnifiedStyle = {
    tdClassName: "text-center p-2",
    thClassName: "px-4 py-3"
  };

  return (
    <div className='h-full'>
      <div className="bg-white flex h-full overflow-y-auto rounded-xl">
        <table className="w-screen text-center">
          <thead className='bg-secondary sticky top-0 z-20'>
            <tr>
              <th className={UnifiedStyle.thClassName}>Title</th>
              <th className={UnifiedStyle.thClassName}>Proponents/Implementors</th>
              <th className={UnifiedStyle.thClassName}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accomplishmentReport.map((formEntry) => (
              <tr key={formEntry.id} onClick={() => handleViewClick(formEntry)} 
                className="border-b-2 border-secondary hover:bg-accent hover:drop-shadow-gs">
                  <td className={UnifiedStyle.tdClassName}>{formEntry.title}</td>
                  <td className={UnifiedStyle.tdClassName}>{formEntry.proponents_implementors}</td>
                  <td className={UnifiedStyle.tdClassName}>
                  <button onClick={() => handleViewClick(formEntry)}>
                    <PencilIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
                  </button>
                  <button onClick={() => handleArchiveClick(formEntry)}>
                    <ArchiveBoxArrowDownIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/** Modal For User EDIT */}
      <ReactModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="w-full md:w-[30%] lg:w-[60%] h-[80%] bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[1%] mx-auto p-5 overflow-auto"
      >
        <div>
          {selectedForm && selectedForm.forms && selectedForm.forms.form_type === 'EAD' ? (
            <ViewEADReportModal closeModal={() => setIsEditModalOpen(false)} selectedForm={selectedForm} />
          ) : (
            <ShowActivityModal closeModal={() => setIsEditModalOpen(false)} selectedForm={selectedForm} />
          )}
        </div>
      </ReactModal>
    </div>
  );
}
