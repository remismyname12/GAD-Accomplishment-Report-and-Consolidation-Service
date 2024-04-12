import React, { useState } from 'react'
import NeutralButton from '../../../../components/buttons/NeutralButton'
import ReactModal from 'react-modal';
import AddMandatesModal from './components/modals/AddMandatesModal';
import ShowMandates from './components/ShowMandates';

export default function Mandates() {
  const[isAddMandateModalOpen, setIsAddMandateModalOpen] = useState(false);

  return (
    <div className='h-full'>
        <div className='mx-auto w-full h-[95%] rounded-2xl bg-white p-2 overflow-auto'>
          <NeutralButton label="Add Mandate" onClick={() => setIsAddMandateModalOpen(true)} />

          <div className='pt-5'>
            <ShowMandates />
          </div>
        </div>

        <ReactModal
          isOpen={isAddMandateModalOpen}
          onRequestClose={() => setIsAddMandateModalOpen(false)}
          className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[1%] mx-auto p-5"
        >
          <AddMandatesModal 
            closeModal={() =>setIsAddMandateModalOpen(false)}
          />
        </ReactModal>
    </div>
  )
}
