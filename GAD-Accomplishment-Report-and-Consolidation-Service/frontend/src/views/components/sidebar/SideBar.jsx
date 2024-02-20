import { React, useState } from 'react'
import NeutralButton from '../buttons/NeutralButton';
import ReactModal from 'react-modal';

//For Modal
import AddUserModal from '../../authorizedView/admin/components/ManageUser/Modals/AddUserModal';
import ArchivedUser from '../../authorizedView/admin/components/ManageUser/ArchivedUser';
import ArchivedActivityForms from '../../authorizedView/Forms/submitedForms/activityForms/ArchivedActivityForms';
import ArchivedReports from '../../authorizedView/Forms/submitedForms/accomplishmentReport/components/ArchivedReports';

export default function SideBar() {
    //For Modals
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isArchivedUserModalOpen, setIsArchivedUserModalOpen] = useState(false);
    const [isArchivedFormModalOpen, setIsArchivedFormModalOpen] = useState(false);
    const [isArchivedReportsModalOpen, setIsArchivedReportsModalOpen] = useState(false);
    
    return (
        <div className="sidebar">
          <ul className="sidebar-list">
            <li className='pt-3'>
                <NeutralButton label="Add User" onClick={() => {setIsAddUserModalOpen(true)}} />
            </li>
            <li className='pt-3'>
                <NeutralButton label="Archived Users List" onClick={() => {setIsArchivedUserModalOpen(true)}} />
            </li>
            <li className='pt-3'>
                <NeutralButton label="Archived Forms List" onClick={() => {setIsArchivedFormModalOpen(true)}} />
            </li>
            <li className='pt-3'>
                <NeutralButton label="Archived Accomplishment Report List" onClick={() => {setIsArchivedReportsModalOpen(true)}} />
            </li>
          </ul>

          {/** Modal For Add User */}
        <ReactModal
            isOpen={isAddUserModalOpen}
            onRequestClose={() => setIsAddUserModalOpen(false)}
            className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
        >
            <div>
                <AddUserModal
                 closeModal={() => setIsAddUserModalOpen(false)}
                 />
            </div>
        </ReactModal>

        {/** Modal For Archived User List */}
        <ReactModal
            isOpen={isArchivedUserModalOpen}
            onRequestClose={() => setIsArchivedUserModalOpen(false)}
            className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
        >
            <div>
                <ArchivedUser
                 closeModal={() => setIsArchivedUserModalOpen(false)}
                 />
            </div>
        </ReactModal>

        {/** Modal For Archived Forms List */}
        <ReactModal
            isOpen={isArchivedFormModalOpen}
            onRequestClose={() => setIsArchivedFormModalOpen(false)}
            className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
        >
            <div>
                <ArchivedActivityForms
                 closeModal={() => setIsArchivedFormModalOpen(false)}
                 />
            </div>
        </ReactModal>

        {/** Modal For Archived Forms List */}
        <ReactModal
            isOpen={isArchivedReportsModalOpen}
            onRequestClose={() => setIsArchivedReportsModalOpen(false)}
            className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
        >
            <div>
                <ArchivedReports
                 closeModal={() => setIsArchivedReportsModalOpen(false)}
                 />
            </div>
        </ReactModal>
        </div>
      );
}
