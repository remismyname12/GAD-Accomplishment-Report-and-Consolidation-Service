import React, { useEffect } from 'react';
import ReactModal from 'react-modal';

export default function Feedback({ isOpen, onClose, successMessage, status }) {
    useEffect(() => {
        let timeoutId;
        if (isOpen && status === true) {
            // Set timeout to close the modal after 3 seconds only if status is success
            timeoutId = setTimeout(() => {
                onClose();
            }, 3000);
        }

        // Cleanup function to clear timeout when component unmounts or modal is closed manually
        return () => {
            clearTimeout(timeoutId);
        };
    }, [isOpen, onClose, status]);

    // Determine background color based on status
    const modalBgColor = status === true ? 'bg-green-400' : 'bg-red-400'; // Green for success, Red for failure
 
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            className={`w-full md:w-[30%] h-fit rounded-3xl ring-1 ring-black shadow-2xl mt-[20%] mx-auto p-5 ${modalBgColor}`}
        >
            <div>{successMessage}</div>
        </ReactModal>
    );
}
