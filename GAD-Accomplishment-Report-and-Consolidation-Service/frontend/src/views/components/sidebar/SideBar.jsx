import React from 'react'
import NeutralButton from '../buttons/NeutralButton';


export default function SideBar() {
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
        </div>
      );
}
