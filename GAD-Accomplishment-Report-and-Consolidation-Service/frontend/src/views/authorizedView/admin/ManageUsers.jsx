import { React, useState, useEffect } from 'react'
import axiosClient from '../../../axios';
import { PencilIcon, ArchiveBoxArrowDownIcon } from '@heroicons/react/24/solid';
import ReactModal from 'react-modal';
import EditUserModal from './components/Modals/EditUserModal';
import ArchiveUserModal from './components/Modals/ArchiveUserModal';
import AddUser from './components/ManageUser/AddUserModal';
import ArchivedUser from './components/ManageUser/ArchivedUser';
import NeutralButton from '../../components/buttons/NeutralButton';

export default function ManageUsers() {

    const [filterText, setFilterText] = useState(''); //for search

    const [users, setUsers] = useState([]); 
    const [selectedUser, setSelectedUser] = useState('')

    //For Modals
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isArchivedUserModalOpen, setIsArchivedUserModalOpen] = useState(false);

        useEffect(() => {
            fetchCurriculum();
          }, []);
        
        const fetchCurriculum = async () => {
          try {
            const response = await axiosClient.get('/showusers');
            if (response.data && response.data) {
              setUsers(response.data);
            } else {
              console.error('Invalid response format:', response.data);
            }
          } catch (error) {
            console.error(error);
          }
        };

        // for search function
        const filteredData = users.filter(
          (user) =>
            user.username && user.username.toString().includes(filterText) ||
            user.email && user.email.toString().includes(filterText)
        );

        // For User EDIT
        const handleEditClick = (selected_user) => {
            setIsEditModalOpen(true)
            setSelectedUser(selected_user)
        }
        
        // For User Archive
        const handleArchiveClick = (selected_user) => {
            setIsArchiveModalOpen(true)
            setSelectedUser(selected_user)
        }

  return (
    <>
        <div className="table-container overflow-y-auto">

          <div>
            <button>
              <NeutralButton label="Add User" onClick={() => {setIsAddUserModalOpen(true)}} />
            </button>
            <button>
              <NeutralButton label="Archived Users List" onClick={() => {setIsArchivedUserModalOpen(true)}} />
            </button>
          </div>

            <table className='border-solid border-2 border-sky-500'>
                <thead className='border-solid border-2 border-sky-500'>
                    <tr>
                        <th className="text-left bg-gray-200 p-2 border-solid border-2 border-sky-500">User Name</th>
                        <th className="text-left bg-gray-200 p-2 border-solid border-2 border-sky-500">Email</th>
                        <th className="text-left bg-gray-200 p-2 border-solid border-2 border-sky-500">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredData.map((users, index) => (
                          <tr 
                            key={index} 
                            className={`${index % 2 === 0 ? 'odd:bg-green-100' : ''}`}
                          >
                              <td className="text-center p-2">{users.username}</td>
                              <td className="text-center p-2">{users.email}</td>
                              <td className= "flex items-center p-3">
                                <button onClick={() => handleEditClick(users)}>
                                    <PencilIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
                                </button>
                                <button onClick={() => handleArchiveClick(users)}>
                                    <ArchiveBoxArrowDownIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
                                </button>
                              </td>
                            </tr>
                            ))}
                </tbody>
            </table>
        </div>

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

        {/** Modal For Add User */}
        <ReactModal
            isOpen={isAddUserModalOpen}
            onRequestClose={() => setIsAddUserModalOpen(false)}
            className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
        >
            <div>
                <AddUser
                 closeModal={() => setIsAddUserModalOpen(false)}
                 />
            </div>
        </ReactModal>
        
        {/** Modal For User EDIT */}
        <ReactModal
            isOpen={isEditModalOpen}
            onRequestClose={() => setIsEditModalOpen(false)}
            className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
        >
            <div>
                <EditUserModal
                 closeModal={() => setIsEditModalOpen(false)}
                 selectedUser={selectedUser}
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
                <ArchiveUserModal
                 closeModal={() => setIsArchiveModalOpen(false)}
                 selectedUser={selectedUser}
                 />
            </div>
        </ReactModal>
    </>
  )
}
