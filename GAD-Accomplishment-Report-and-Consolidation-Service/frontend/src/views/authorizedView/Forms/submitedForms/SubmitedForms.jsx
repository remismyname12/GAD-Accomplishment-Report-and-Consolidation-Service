import { React, useEffect, useState } from 'react';
import axiosClient from '../../../axios/axios';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import ActivityDesign from './activityForms/ActivityDesign';
import AccomplishmentReport from './accomplishmentReport/AccomplishmentReport';
import NeutralButton from '../../../components/buttons/NeutralButton';
import ArchivedActivityForms from './activityForms/ArchivedActivityForms';
import ReactModal from 'react-modal';

export default function SubmitedForms() {
  const [selectedForm, setSelectedForm] = useState(null);
  const [isEmployeeActivityFormModalOpen,setIsEmployeeActivityFormModalOpen ] = useState('employee');

  //For Modals
  const [isInsetActivityFormModalOpen,setIsInsetActivityFormModalOpen ] = useState(false);
  const [isArchivedUserModalOpen, setIsArchivedUserModalOpen] = useState(false);

    

  return (
    <div>
          <div>
            {/* <button>
              <NeutralButton label="Add User" onClick={() => {setIsAddUserModalOpen(true)}} />
            </button> */}
              <NeutralButton label="Archived Users List" onClick={() => {setIsArchivedUserModalOpen(true)}} />
          </div>
      <div className="w-full px-4 pt-16">
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <span>Select the type of form</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  <div className="flex flex-col">
                    <button onClick={() => setSelectedForm('activityDesign')}>
                      Activity Design
                    </button>
                    <button onClick={() => setSelectedForm('accomplishmentreport')}>
                      Accompishment Report
                    </button>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>

        {/**Type of Forms */}
      <div>
        {selectedForm === 'activityDesign' && <ActivityDesign />}
        {selectedForm === 'accomplishmentreport' && <AccomplishmentReport />}
      </div>

      {/** Modal For Archived Forms List */}
      <ReactModal
            isOpen={isArchivedUserModalOpen}
            onRequestClose={() => setIsArchivedUserModalOpen(false)}
            className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
        >
            <div>
                <ArchivedActivityForms
                 closeModal={() => setIsArchivedUserModalOpen(false)}
                 />
            </div>
        </ReactModal>
    </div>
  )
}
