import React from 'react';

const MobProgressSteps = ({ isActive, isCompleted }) => {
  return (
    <div className="flex items-center w-full">
      {/* First Dot */}
      <div className={`flex items-center justify-center w-4 h-4 rounded-full border ${
        isActive || isCompleted ? 'border-primary' : 'border-gray-300'
      }`}>
        <span className={`block w-2 h-2 rounded-full ${
          isActive || isCompleted ? 'bg-primary' : 'bg-gray-300'
        }`} />
      </div>

      {/* Connecting Line */}
      <div className={`flex-1 h-1 mx-2 rounded ${
        isCompleted ? 'bg-primary' : 'bg-gray-300'
      }`} />

      {/* Second Dot */}
      <div className={`flex items-center justify-center w-4 h-4 rounded-full border ${
        isCompleted ? 'border-primary' : 'border-gray-300'
      }`}>
        <span className={`block w-2 h-2 rounded-full ${
          isCompleted ? 'bg-primary' : 'bg-gray-300'
        }`} />
      </div>
    </div>
  );
};

export default MobProgressSteps;