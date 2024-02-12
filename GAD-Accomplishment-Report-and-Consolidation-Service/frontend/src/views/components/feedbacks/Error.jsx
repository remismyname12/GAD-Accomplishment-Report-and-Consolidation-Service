import { React, useEffect } from 'react';
import ReactModal from 'react-modal';

export default function Error({ isOpen, onClose, errorMessage }) {
  useEffect(() => {
    let timeoutId;
    if (isOpen) {
      // Set timeout to close the modal after 5 seconds
      timeoutId = setTimeout(() => {
        onClose();
      }, 3000);
    }

    // Cleanup function to clear timeout when component unmounts or modal is closed manually
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isOpen, onClose]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="w-full md:w-[30%] h-fit 
                rounded-3xl ring-1 ring-black shadow-2xl 
                mt-[10%] mx-auto p-5 
                bg-red-500
                font-bold text-2xl"
    >
      <div 
        dangerouslySetInnerHTML={{ __html: errorMessage }}></div>
    </ReactModal>
  );
}
