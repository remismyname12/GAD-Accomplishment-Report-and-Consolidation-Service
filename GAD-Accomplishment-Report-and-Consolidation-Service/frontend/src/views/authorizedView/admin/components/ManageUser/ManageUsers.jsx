import { React, useState, useEffect } from 'react'
import axiosClient from '../../../../axios/axios';
import { PencilIcon, ArchiveBoxArrowDownIcon } from '@heroicons/react/24/solid';
import ReactModal from 'react-modal';
import EditUserModal from './Modals/EditUserModal';
import ArchiveUserModal from './Modals/ArchiveUserModal';

export default function ManageUsers() {

    const [filterText, setFilterText] = useState(''); //for search

    const [users, setUsers] = useState([]); 
    const [selectedUser, setSelectedUser] = useState('')

    //For Modals
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

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

        const TableHeader = ({ title }) => (
          <th className="mx-1 py-2 px-5">{title}</th>
        );

  return (
    <>
        <div className="h-full">
          <div className="bg-white flex h-full overflow-y-auto rounded-xl">
            <table className='w-screen text-center h-fit'>
                <thead className='bg-secondary sticky top-0'>
                    <tr>
                      <TableHeader title="User Name" />
                      <TableHeader title="Email" />
                      <TableHeader title="Actions" />
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((users, index) => (
                          <tr 
                            key={index} 
                            className='border-b-2 border-secondary hover:bg-accent hover:drop-shadow-gs'
                          >
                              <td className="text-center p-2">{users.username}</td>
                              <td className="text-center p-2">{users.email}</td>
                              <td className= "items-center ">
                                <button title="Edit User" onClick={() => handleEditClick(users)}>
                                    <PencilIcon className='h-5 w-5 mx-1 cursor-pointer hover:scale-125' />
                                </button>
                                <button title="Archive User" onClick={() => handleArchiveClick(users)}>
                                    <ArchiveBoxArrowDownIcon className='h-5 w-5 mx-1 cursor-pointer hover:scale-125' />
                                </button>
                              </td>
                            </tr>
                            ))}
                </tbody>
            </table>
          </div>
        </div>
        
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
