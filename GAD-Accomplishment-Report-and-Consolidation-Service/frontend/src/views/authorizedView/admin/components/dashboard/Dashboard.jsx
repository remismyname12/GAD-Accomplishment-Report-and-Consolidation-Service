import React, { useEffect, useState } from 'react';
import axiosClient from '../../../../axios/axios';
import { PencilIcon, ArchiveBoxArrowDownIcon } from '@heroicons/react/24/solid';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState(''); //for search

  // for search function
  const filteredData = users.filter(
    (user) => user.username && user.username.toString().includes(filterText)
  );

  useEffect(() => {
    const fetchCurriculum = async () => {
      try {
        const response = await axiosClient.get('/showusers');
          setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurriculum();
  }, []);

  const handleEditClick = (user) => {
    // Handle edit click
  };

  const handleArchiveClick = (user) => {
    // Handle archive click
  };
  
  const headerStyles = 'font-medium text-xs'

  return (
    <div className='h-full'>
      <div className='bg-white flex h-full overflow-y-auto rounded-xl'>
        <table className='w-screen text-center h-fit'>
          <thead className='bg-secondary sticky top-0'>
            <tr>
              <td className={`${headerStyles} w-[40%]`}>USERS <div className='text-xs'>TOTAL</div></td>
              <td className={headerStyles}>SUBMITTED ACTIVITY DESIGN<div className='font-normal'>TOTAL</div></td>
              <td className={headerStyles}>ACCOMPLISHMENT REPORTS<div className='font-normal'>TOTAL</div></td>
              <td className={headerStyles}>ACTION</td>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user, index) => (
              <tr 
                key={index} 
                className='px-10 border-b-2 border-secondary hover:bg-accent hover:drop-shadow-gs transition-transform hover:scale-sm'
              >
                <td className="text-center p-2">{user.username}</td>
                <td className="text-center p-2">{user.forms_count}</td> {/* Display submitted activity count */}
                <td className="text-center p-2">{user.accomplishment_report_count}</td> {/* Display completed activity count */}
                <td className= "flex items-center p-3">
                  <button title="Edit User" onClick={() => handleEditClick(user)}>
                    <PencilIcon className='h-5 w-5 mx-1 cursor-pointer transition-transform hover:scale-1xl' />
                  </button>
                  <button title="Archive User" onClick={() => handleArchiveClick(user)}>
                    <ArchiveBoxArrowDownIcon className='h-5 w-5 mx-1 cursor-pointer transition-transform hover:scale-1xl' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
