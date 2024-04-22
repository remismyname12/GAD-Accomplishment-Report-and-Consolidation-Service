import React from 'react';

const LoadingHorizontalLine = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="text-center pt-5 px-5 h-screen">
      <div className="mb-4">Loading...</div>
      <div className="relative w-full h-2 rounded-full overflow-hidden bg-gray-300">
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingHorizontalLine;
