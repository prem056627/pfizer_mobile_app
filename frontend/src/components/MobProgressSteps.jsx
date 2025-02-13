import React from "react";

const MobProgressStep = ({ isActive, isCompleted }) => {
  return (
    <div className="flex justify-evenly items-center gap-2">
      <div
        className={`border flex w-4 h-4 p-[2px] aspect-square rounded-full ${
          isActive ? "border-primary" : "border-transparent"
        }`}
      >
        <span
          className={`block w-[10px] h-full rounded-full ${
            isCompleted
              ? "bg-primary"
              : isActive
              ? "bg-primary"
              : "bg-gray-300"
          }`}
        />
      </div>
      <div
        className={`block flex-1 w-[100px] h-1 rounded-md ${
          isCompleted ? "bg-primary" : "bg-gray-300"
        }`}
      />
    </div>
  );
};

export default MobProgressStep;
