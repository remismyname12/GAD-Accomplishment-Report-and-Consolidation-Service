import { React, useState, useEffect } from 'react'
import axiosClient from '../../../../../axios/axios';
import { ArrowLeftStartOnRectangleIcon, TrashIcon } from '@heroicons/react/24/solid';
import ReactModal from 'react-modal';
import RestoreMandateModal from './modals/RestoreMandateModal';
import DeleteMandatesModal from './modals/DeleteMandatesModal';

export default function ArchivedActivityForms() {
    const [filterText, setFilterText] = useState(''); //for search

    const [forms, setForms] = useState([]); 
    const [selectedForm, setSelectedForm] = useState('')
    const [isRestoreMandateModalOpen, setIsRestoreMandateModalOpen] = useState(false);
    const [isDeleteMandateModalOpen, setIsDeleteMandateModalOpen] = useState(false);

    useEffect(() => {
        fetchCurriculum();
      }, []);
    
      const fetchCurriculum = async () => {
        try {
          const response = await axiosClient.get('/showarchivedmandates');
          console.log('Response from API:', response.data);
      
          if (Array.isArray(response.data)) {
            setForms(response.data);
            console.log('test', forms);
          } else {
            console.error('Invalid response format:', response.data);
          }
        } catch (error) {
          console.error(error);
        }
      };

    // for search function
    const filteredData = forms.filter(
        (forms) =>
        forms.title && forms.title.toString().includes(filterText) 
      );

    // For User RESTOREFORM
    const handleRestoreFormClick = (selected_form) => {
        setIsRestoreMandateModalOpen(true)
        setSelectedForm(selected_form)
        console.log('This is the selected form',selectedForm);
    }

    // For User DELETEFORM
    const handleDeleteFormClick = (selected_form) => {
      setIsDeleteMandateModalOpen(true)
        setSelectedForm(selected_form)
    }
    
  return (
    <>
    <div className="table-container overflow-y-auto">
            <table className='border-solid border-2 border-sky-500'>
                <thead className='border-solid border-2 border-sky-500'>
                    <tr>
                        <th className="text-left bg-gray-200 p-2 border-solid border-2 border-sky-500">Title</th>
                        <th className="text-left bg-gray-200 p-2 border-solid border-2 border-sky-500">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredData.map((forms, index) => (
                          <tr 
                            key={index} 
                            className={`${index % 2 === 0 ? 'odd:bg-green-100' : ''}`}
                          >
                              <td className="text-center p-2">{forms.title}</td>
                              <td className= "flex items-center p-3">
                                <button title="Restore Activity Form" onClick={() => handleRestoreFormClick(forms)}>
                                    <ArrowLeftStartOnRectangleIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
                                </button>
                                <button title="Delete Activity Form" onClick={() => handleDeleteFormClick(forms)}>
                                    <TrashIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
                                </button>
                              </td>
                            </tr>
                            ))}
                </tbody>
            </table>
        </div>

        {/** Modal For Form ARCHIVE */}                
        <ReactModal
            isOpen={isRestoreMandateModalOpen}
            onRequestClose={() => setIsRestoreMandateModalOpen(false)}
            className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
        >
            <div>
                <RestoreMandateModal
                 closeModal={() => setIsRestoreMandateModalOpen(false)}
                 selectedForm={selectedForm}
                 />
            </div>
        </ReactModal>

        {/** Modal For Form ARCHIVE */}                
        <ReactModal
            isOpen={isDeleteMandateModalOpen}
            onRequestClose={() => setIsDeleteMandateModalOpen(false)}
            className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
        >
            <div>
                <DeleteMandatesModal
                 closeModal={() => setIsDeleteMandateModalOpen(false)}
                 selectedForm={selectedForm}
                 />
            </div>
        </ReactModal>
    </>
  )
}
