import { React, useState, useEffect } from 'react';
import axiosClient from '../../../../../axios/axios';
import { ArrowLeftStartOnRectangleIcon, TrashIcon } from '@heroicons/react/24/solid';
import ReactModal from 'react-modal';
import RestoreReportModal from './modals/RestoreReportModal';
import DeleteReportModal from './modals/DeleteReportModal';

export default function ArchivedReports() {
    const [filterText, setFilterText] = useState('');
    const [forms, setForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState('');
    const [isRestoreReportModalOpen, setIsRestoreReportModalOpen] = useState(false);
    const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);

    useEffect(() => {
        fetchCurriculum();
    }, []);

    const fetchCurriculum = async () => {
        try {
            const response = await axiosClient.get('/show_archived_accomplishment_report_all');
            if (response.data && response.data) {
                setForms(response.data);
            } else {
                console.error('Invalid response format:', response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const filteredData = forms.filter(form => form.forms.title && form.forms.title.includes(filterText));

    const handleRestoreReportClick = (selectedForm) => {
        setIsRestoreReportModalOpen(true);
        setSelectedForm(selectedForm);
    };

    const handleDeleteUserClick = (selectedForm) => {
        setIsDeleteUserModalOpen(true);
        setSelectedForm(selectedForm);
    };

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
                        {filteredData.map((form, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'odd:bg-green-100' : ''}`}>
                                <td className="text-center p-2">{form.forms.title}</td>
                                <td className="flex items-center p-3">
                                    <button onClick={() => handleRestoreReportClick(form)}>
                                        <ArrowLeftStartOnRectangleIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
                                    </button>
                                    <button onClick={() => handleDeleteUserClick(form)}>
                                        <TrashIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Modals */}
            <ReactModal
                isOpen={isRestoreReportModalOpen}
                onRequestClose={() => setIsRestoreReportModalOpen(false)}
                className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
            >
                <div>
                    <RestoreReportModal
                     closeModal={() => setIsRestoreUserModalOpen(false)}
                     selectedForm={selectedForm}
                     />
                </div>
            </ReactModal>

            {/** Modal For Report ARCHIVE */}                
            <ReactModal
                isOpen={isDeleteUserModalOpen}
                onRequestClose={() => setIsDeleteUserModalOpen(false)}
                className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
            >
                <div>
                    <DeleteReportModal
                     closeModal={() => setIsDeleteUserModalOpen(false)}
                     selectedForm={selectedForm}
                     />
                </div>
            </ReactModal>
        </>
    );
}
