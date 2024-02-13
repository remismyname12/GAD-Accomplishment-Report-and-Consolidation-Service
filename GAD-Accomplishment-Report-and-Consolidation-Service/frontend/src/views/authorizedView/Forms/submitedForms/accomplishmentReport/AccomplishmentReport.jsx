import { React, useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import axiosClient from '../../../../axios/axios';
import { ArchiveBoxArrowDownIcon, PencilIcon } from '@heroicons/react/24/outline';
import ReactModal from 'react-modal';
import EditActivityModal from '../activityForms/components/modals/EditActivityModal';
import ArchiveActivityModal from '../activityForms/components/modals/ArchiveActivityModal';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AccomplishmentReport() {
  const [employeeForms, setEmployeeForms] = useState([]);
  const [insetForms, setInsetForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState('')

  //For Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

  useEffect(() => {
    fetchForms();
  }, []);
  
  const fetchForms = async () => {
    try {
      const employeeFormData = await axiosClient.get('/show_form_employee');
      const insetFormData = await axiosClient.get('/show_form_inset');

      if (employeeFormData.data) {
        setEmployeeForms(employeeFormData.data);
      }
      if (insetFormData.data) {
        setInsetForms(insetFormData.data);
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

  return (
    <div className='flex justify-center'>
      <div className="w-full max-w-md px-2 py-5 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab
              key="Employee"
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Employee
            </Tab>
            <Tab
              key="Inset"
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Inset
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
                    Title
                  </h3>

                  <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                    <li>{form.title}</li>
                  </ul>

                  <ul>
                      <button onClick={() => handleEditClick(form)}>
                          <PencilIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
                      </button>
                      <button onClick={() => handleArchiveClick(form)}>
                          <ArchiveBoxArrowDownIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
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
                      Title
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <li>{form.title}</li>
                    </ul>

                    <ul>
                      <button onClick={() => handleEditClick(form)}>
                          <PencilIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
                      </button>
                      <button onClick={() => handleArchiveClick(form)}>
                          <ArchiveBoxArrowDownIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
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
            className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
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
    </div>
  )
}
