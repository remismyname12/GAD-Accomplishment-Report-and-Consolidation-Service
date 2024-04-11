import React, { useState } from 'react';
import NeutralButton from '../buttons/NeutralButton';
import ReactModal from 'react-modal';

// For Modal
import AddUserModal from '../../authorizedView/admin/components/ManageUser/Modals/AddUserModal';
import ArchivedUser from '../../authorizedView/admin/components/ManageUser/ArchivedUser';
import ArchivedActivityForms from '../../authorizedView/Forms/submitedForms/activityForms/ArchivedActivityForms';
import ArchivedReports from '../../authorizedView/Forms/submitedForms/accomplishmentReport/components/ArchivedReports';
import ShowArchiveMandates from '../../authorizedView/admin/components/mandates/components/ShowArchiveMandates';

export default function SideBar() {
    // For Modals
    const [modals, setModals] = useState({
        addUser: false,
        archivedUser: false,
        archivedForm: false,
        archivedReports: false,
        showArchiveMandate: false,
    });

    const toggleModal = (modalName, value) => {
        setModals(prevState => ({ ...prevState, [modalName]: value }));
    };

    const sidebarItems = [
        { label: 'Add User', onClick: () => toggleModal('addUser', true) },
        { label: 'Archived Users List', onClick: () => toggleModal('archivedUser', true) },
        { label: 'Archived Forms List', onClick: () => toggleModal('archivedForm', true) },
        { label: 'Archived Accomplishment Report List', onClick: () => toggleModal('archivedReports', true) },
        { label: 'Archived Mandates List', onClick: () => toggleModal('showArchiveMandate', true) },
    ];

    return (
        <div>
            <ul>
                {sidebarItems.map((item, index) => (
                    <li 
                        key={index} 
                        className='pt-3 text-center md:text-sm xl:text-md'
                    >
                        <NeutralButton label={item.label} onClick={item.onClick} />
                    </li>
                ))}
            </ul>

            {/* Modals */}
            <ReactModal
                isOpen={modals.addUser}
                onRequestClose={() => toggleModal('addUser', false)}
                className="modal-style"
            >
                <div>
                    <AddUserModal closeModal={() => toggleModal('addUser', false)} />
                </div>
            </ReactModal>

            <ReactModal
                isOpen={modals.archivedUser}
                onRequestClose={() => toggleModal('archivedUser', false)}
                className="modal-style"
            >
                <div>
                    <ArchivedUser closeModal={() => toggleModal('archivedUser', false)} />
                </div>
            </ReactModal>

            <ReactModal
                isOpen={modals.archivedForm}
                onRequestClose={() => toggleModal('archivedForm', false)}
                className="modal-style"
            >
                <div>
                    <ArchivedActivityForms closeModal={() => toggleModal('archivedForm', false)} />
                </div>
            </ReactModal>

            <ReactModal
                isOpen={modals.archivedReports}
                onRequestClose={() => toggleModal('archivedReports', false)}
                className="modal-style"
            >
                <div>
                    <ArchivedReports closeModal={() => toggleModal('archivedReports', false)} />
                </div>
            </ReactModal>

            <ReactModal
                isOpen={modals.showArchiveMandate}
                onRequestClose={() => toggleModal('showArchiveMandate', false)}
                className="modal-style"
            >
                <div>
                    <ShowArchiveMandates closeModal={() => toggleModal('showArchiveMandate', false)} />
                </div>
            </ReactModal>
        </div>
    );
}
