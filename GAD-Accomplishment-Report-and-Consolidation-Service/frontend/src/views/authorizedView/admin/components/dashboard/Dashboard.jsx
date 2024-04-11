import React, { useEffect, useState } from 'react';
import axiosClient from '../../../../axios/axios';
import { PencilIcon, ArchiveBoxArrowDownIcon } from '@heroicons/react/24/solid';

const DashboardColumn = ({ children, isUsers }) => (
  <div className={`border p-4 ${isUsers ? 'w-[40%]' : 'flex-1'} text-center bg-secondary`}>
    {children}
  </div>
);

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

  return (
    <div className='pt-2 h-full'>
      <div className='bg-white flex h-[95%] overflow-y-auto rounded-xl'>
        <table className='w-screen text-center'>
          <thead>
            <tr className='bg-secondary sticky top-0 z-10'>
              <td className='w-[40%]'>USERS <div>TOTAL</div></td>
              <td>SUBMITTED ACTIVITY <div>TOTAL</div></td>
              <td>COMPLETED ACTIVITY <div>TOTAL</div></td>
              <td>ACTION</td>
            </tr>
          </thead>
          <tbody className=''>
            {filteredData.map((user, index) => (
              <tr 
                key={index} 
                className='border-b-2 border-secondary hover:bg-accent hover:drop-shadow-gs'
              >
                <td className="text-center p-2">{user.username}</td>
                <td className="text-center p-2">{user.forms_count}</td> {/* Display submitted activity count */}
                <td className="text-center p-2">{user.accomplishment_report_count}</td> {/* Display completed activity count */}
                <td className= "flex items-center p-3">
                  <button title="Edit User" onClick={() => handleEditClick(user)}>
                    <PencilIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
                  </button>
                  <button title="Archive User" onClick={() => handleArchiveClick(user)}>
                    <ArchiveBoxArrowDownIcon className='h-5 w-5 mx-1 cursor-pointer transform transition-transform hover:scale-125' />
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
