import { React, useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import axiosClient from '../../../../axios/axios';
import { ArchiveBoxArrowDownIcon, PencilIcon, SparklesIcon } from '@heroicons/react/24/outline';
import ReactModal from 'react-modal';
import EditActivityModal from './components/modals/EditActivityModal';
import ArchiveActivityModal from './components/modals/ArchiveActivityModal';
import GenerateAccomplishmentReport from '../activityForms/components/modals/GenerateAccomplishmentReport';
import GenerateFormReport from './components/modals/GenerateFormReport';
import EditEADModal from './components/modals/EditEADModal';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ActivityDesign() {
  const [employeeForms, setEmployeeForms] = useState([]);
  const [insetForms, setInsetForms] = useState([]);
  const [eadForm, setEadForm] = useState([]);
  const [selectedForm, setSelectedForm] = useState('')
  const [isGenerateAccomplishmentReportOpen, setIsGenerateAccomplishmentReportOpen] = useState(false);

  //For Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isEditEADModalOpen, setIsEditEADModalOpen] = useState(false);

  useEffect(() => {
    fetchForms();
  }, []);
  
  const fetchForms = async () => {
    try {
      const employeeFormData = await axiosClient.get('/show_form_employee');
      const insetFormData = await axiosClient.get('/show_form_inset');
      const eadFormData = await axiosClient.get('/show_form_ead');

      if (employeeFormData.data) {
        setEmployeeForms(employeeFormData.data);
      }
      if (insetFormData.data) {
        setInsetForms(insetFormData.data);
      } 
      if (eadFormData.data) {
        setEadForm(eadFormData.data);
      } 
    } catch (error) {
      console.error(error);
    }
  };

  // For Form EDIT
  const handleEditClick = (selected_form) => {
    setIsEditModalOpen(true)
    setSelectedForm(selected_form)
  }

  // For Form Archive
  const handleArchiveClick = (selected_form) => {
    setIsArchiveModalOpen(true)
    setSelectedForm(selected_form)
  }

  // For Form EDIT
  const handleEditEADClick = (selected_form) => {
    setIsEditEADModalOpen(true)
    setSelectedForm(selected_form)
  }

  // For Generate Accomplishment Report
  const handleGenerateAccomplishmentReportClick = (selected_form) => {
    setIsGenerateAccomplishmentReportOpen(true)
    setSelectedForm(selected_form)
  }

  const tabClassName = (selected) => classNames(
  'w-full rounded-lg py-2.5 px-20 text-sm font-medium leading-5',
  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
  selected
    ? 'bg-white text-blue-700 shadow'
    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
);
  
  return (
    <div className='flex justify-center'>
      <div className="w-full  px-2 py-5 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab
              key="Employee"
              className={tabClassName}
            >
              Employee
            </Tab>
            <Tab
              key="Inset"
              className={tabClassName}
            >
              Inset
            </Tab>
            <Tab
              key="EAD"
              className={tabClassName}
            >
              EAD
          </Tab>
          </Tab.List>
          
          <Tab.Panels className="mt-2">
            <Tab.Panel
              key="Employee"
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul>
                {employeeForms.map((form) => (
                  <li
                  key={form.id}
                  className="relative rounded-md p-3 hover:bg-gray-100"
                >
                  <h3 className="text-sm font-medium leading-5">
                  {form.title}
                  </h3>

                  <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                    <li>{form.proponents_implementors}</li>
                  </ul>

                  <ul>
                      <button title="Edit Activity Design" onClick={() => handleEditClick(form)}>
                          <PencilIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
                      </button>
                      <button title="Archive Activity Design" onClick={() => handleArchiveClick(form)}>
                          <ArchiveBoxArrowDownIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
                      </button>
                      <button title="Create Accomplishment Report" onClick={() => handleGenerateAccomplishmentReportClick(form)}>
                          <SparklesIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
                      </button>
                    </ul>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
            <Tab.Panel
              key="Inset"
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul>
                {insetForms.map((form) => (
                  <li
                    key={form.id}
                    className="relative rounded-md p-3 hover:bg-gray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {form.title}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <li>{form.proponents_implementors}</li>
                    </ul>

                    <ul>
                      <button title="Edit Activity Design" onClick={() => handleEditClick(form)}>
                          <PencilIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
                      </button>
                      <button title="Archive Activity Design" onClick={() => handleArchiveClick(form)}>
                          <ArchiveBoxArrowDownIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
                      </button>
                      <button title="Create Accomplishment Report" onClick={() => handleGenerateAccomplishmentReportClick(form)}>
                          <SparklesIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
                      </button>
                    </ul>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
            <Tab.Panel
              key="EAD"
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul>
                {eadForm.map((form) => (
                  <li
                  key={form.id}
                  className="relative rounded-md p-3 hover:bg-gray-100"
                >
                  <h3 className="text-sm font-medium leading-5">
                    {form.title}
                  </h3>

                  <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                    <li>{form.proponents_implementors}</li>
                  </ul>

                  <ul>
                      <button title="Edit Activity Design" onClick={() => handleEditEADClick(form)}>
                          <PencilIcon title="Edit Activity Design" className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
                      </button>
                      <button title="Archive Activity Design" onClick={() => handleArchiveClick(form)}>
                          <ArchiveBoxArrowDownIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
                      </button>
                      <button title="Create Accomplishment Report" onClick={() => handleGenerateAccomplishmentReportClick(form)}>
                          <SparklesIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
                      </button>
                    </ul>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/** Modal For User EDIT */}
        <ReactModal
            isOpen={isEditModalOpen}
            onRequestClose={() => setIsEditModalOpen(false)}
            className="w-full md:w-[30%] lg:w-[90%] h-[95%] bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[1%] mx-auto p-5 overflow-auto"
        >
            <div>
                <EditActivityModal
                 closeModal={() => setIsEditModalOpen(false)}
                 selectedForm={selectedForm}
                 />
            </div>
        </ReactModal>

        {/** Modal For User ARCHIVE */}                
        <ReactModal
            isOpen={isArchiveModalOpen}
            onRequestClose={() => setIsArchiveModalOpen(false)}
            className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
        >
            <div>
                <ArchiveActivityModal
                 closeModal={() => setIsArchiveModalOpen(false)}
                 selectedForm={selectedForm}
                 />
            </div>
        </ReactModal>
        
        
        {/** Modal For EADForm EDIT */}
        <ReactModal
            isOpen={isEditEADModalOpen}
            onRequestClose={() => setIsEditEADModalOpen(false)}
            className="w-full md:w-[30%] lg:w-[90%] h-[95%] bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[1%] mx-auto p-5 overflow-auto"
        >
            <div>
                <EditEADModal
                 closeModal={() => setIsEditEADModalOpen(false)}
                 selectedForm={selectedForm}
                 />
            </div>
        </ReactModal>

        {/** Modal For Generate Accomplishment Report */}    
        <ReactModal
            isOpen={isGenerateAccomplishmentReportOpen}
            onRequestClose={() => setIsGenerateAccomplishmentReportOpen(false)}
            className="w-full md:w-[60%] lg:w-[90%] h-[90%] bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[1%] mx-auto p-5 overflow-auto"
        >
          <div>
              {selectedForm.form_type === 'EAD' ? (
                  <GenerateAccomplishmentReport
                      closeModal={() => setIsGenerateAccomplishmentReportOpen(false)}
                      selectedForm={selectedForm}
                  />
              ) : (
                  <GenerateFormReport
                      closeModal={() => setIsGenerateAccomplishmentReportOpen(false)}
                      selectedForm={selectedForm}
                  />
              )}
          </div>
        </ReactModal>
    </div>
  )
}
