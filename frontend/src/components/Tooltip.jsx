import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentStep } from "../slice/patient-detail-form";

const Tooltip = ({ tooltipText, children, steps, position = "top" }) => {
  const currentStep = useSelector(selectCurrentStep);

  return (
    <div className="relative inline-flex items-center group">
      {children}
      {/* Tooltip Box */}
      <div
        className={`z-50 absolute  hidden group-hover:flex md:w-80 w-44 bg-[#D8D8D8] border text-gray-800 text-sm py-1 px-2 rounded shadow-lg transition-transform duration-300 ${
          position === "top"
            ? "bottom-full mb-3 left-1/2 transform -translate-x-1/2"
            : position === "bottom"
            ? "top-full mt-3 left-1/2 transform -translate-x-1/2"
            : position === "left"
            ? "right-full mr-3 top-1/2 transform -translate-y-1/2"
            : "left-full ml-3 top-1/2 transform -translate-y-1/2"
        }`}
      >
        <p className="p-2 text-[#484848] text-[12px]">
          {steps[currentStep - 1]?.tooltipText ||tooltipText }
        </p>

        {/* Tooltip Triangle */}
        <div
          className={`absolute ${
            position === "top"
              ? "bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
              : position === "bottom"
              ? "top-0 left-1/2 transform -translate-x-1/2 -translate-y-full"
              : position === "left"
              ? "right-0 top-1/2 transform -translate-y-1/2 translate-x-full"
              : "left-0 top-1/2 transform -translate-y-1/2 -translate-x-full"
          }`}
        >
          <div
            className={`w-0 h-0 border-8 ${
              position === "top"
                ? "border-t-[#D8D8D8] border-l-transparent border-r-transparent border-b-transparent"
                : position === "bottom"
                ? "border-b-[#D8D8D8] border-l-transparent border-r-transparent border-t-transparent"
                : position === "left"
                ? "border-l-[#D8D8D8] border-t-transparent border-b-transparent border-r-transparent"
                : "border-r-[#D8D8D8] border-t-transparent border-b-transparent border-l-transparent"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
