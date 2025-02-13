import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import useMediaQuery from "../hooks/useMediaQuery";
import { selectCurrentStep } from "../slice/patient-detail-form";
import HeadingWithIcon from "./HeadingWithIcon";
import Tooltip from "./Tooltip";
import HeadingWithTooltip from "./HeadingWithTooltipProps";

const Stepper = ({ steps }) => {
   const currentStep = useSelector(selectCurrentStep);

  const isMobile = useMediaQuery("(max-width: 768px)");

  console.log(steps, currentStep);


  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-5 justify-center items-center gap-4">
        {steps.map((step, index) => {
          const shouldDisplay =
            !isMobile ||
            currentStep === index + 1 ||
            currentStep === index;

          return (
            shouldDisplay && (
              <Step
                key={index}
                stepNumber={index + 1}
                label={step.title}
                isActive={currentStep === index + 1}
                isCompleted={currentStep >= index + 1}
              />
            )
          );
        })}
      </div>
      <div className="pl-6 pt-20 ">
        {/* <h2 className="text-[#7BB68F] font-semibold">
          <span>{steps[currentStep - 1].subheading}</span>
          <Tooltip tooltipText={"this topp tips can i "} position="bottom">
            <svg className="inline ml-1" xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path d="M9.53679 10.6636C9.53679 10.9358 9.31631 11.1563 9.04409 11.1563C8.77248 11.1563 8.55138 10.9358 8.55138 10.6636V10.4148C8.55138 9.70281 8.87595 9.33327 9.591 8.91694C9.57252 8.92741 9.79978 8.79623 9.85952 8.76051C10.4625 8.40084 10.6866 8.08797 10.6866 7.36492C10.6866 6.55072 10.12 6.02722 9.04409 6.02722C8.06052 6.02722 7.40216 6.78906 7.40216 7.66978C7.40216 7.942 7.18106 8.16248 6.90945 8.16248C6.63723 8.16248 6.41675 7.942 6.41675 7.66978C6.41675 6.27419 7.48222 5.04181 9.04409 5.04181C10.6479 5.04181 11.6721 5.98842 11.6721 7.36485C11.6721 8.48083 11.2397 9.08435 10.3645 9.6067C10.2974 9.64673 10.0627 9.78223 10.0868 9.76805C9.64457 10.0261 9.53679 10.1487 9.53679 10.4147V10.6636ZM9.01145 13.2915C8.64869 13.2915 8.3543 12.9972 8.3543 12.6344C8.3543 12.2716 8.64869 11.9779 9.01145 11.9779C9.37421 11.9779 9.6686 12.2716 9.6686 12.6344C9.6686 12.9972 9.37421 13.2915 9.01145 13.2915Z" fill="#528376" stroke="#528376" stroke-width="0.2" />
              <path d="M17.6114 5.60298C17.1491 4.51177 16.4865 3.53182 15.6454 2.68853C14.8029 1.84745 13.8229 1.18557 12.731 0.722601C11.601 0.243551 10.4016 0 9.16554 0C4.11179 0.00146265 0 4.11404 0 9.16779C0 14.2215 4.11179 18.3333 9.16554 18.3333C14.2193 18.3333 18.3311 14.2215 18.3311 9.16779C18.3311 7.93176 18.0897 6.73228 17.6107 5.60234L17.6114 5.60298ZM9.16554 16.8185C4.94703 16.8185 1.51545 13.3869 1.51545 9.16843C1.51545 4.94991 4.94703 1.51834 9.16554 1.51834C13.3841 1.51834 16.8156 4.94991 16.8156 9.16843C16.8156 13.3869 13.3841 16.8185 9.16554 16.8185Z" fill="#7BB68F" />
            </svg>
          </Tooltip>
        </h2> */}
        <HeadingWithTooltip
          currentStep={currentStep}
          steps={steps}
        />

        {/* <HeadingWithIcon text={steps[currentStep - 1].subheading} /> */}


      </div>
    </>
  );
};

Stepper.propTypes = {
  steps: PropTypes.array.isRequired,
};

export default Stepper;

const Step = ({ stepNumber, label, isActive, isCompleted }) => {
  return (
    <div className="flex flex-col justify-center items-center px-4 gap-2" >
      {/* Step Indicator */}
      <div
        className={`flex justify-center items-center gap-2 self-center md:self-start font-inter ${isCompleted
          ? "text-primary"
          : isActive
            ? "text-primary"
            : "text-gray-300"
          }`}
      >
        <span className="text-4xl hidden md:block">{stepNumber}</span>
        <p className="text-sm font-bold self-center ">
          <span className="md:hidden">{`${stepNumber}.`}</span>
          {/* {label} */}
          {label.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < label.split("\n").length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      </div>

      {/* Step Progress Bar */}
      <div className="md:flex w-full items-center gap-x-2 hidden">
        <div
          className={`border w-4 h-4 p-[2px] aspect-square rounded-full ${isActive ? "border-primary" : "border-transparent"
            }`}
        >
          <span
            className={`block w-full h-full rounded-full ${isCompleted
              ? "bg-primary"
              : isActive
                ? "bg-primary"
                : "bg-gray-300"
              }`}
          />
        </div>
        <div
          className={`block flex-1 w-full h-1 rounded-md ${isCompleted ? "bg-primary" : "bg-gray-300"
            }`}
        />
      </div>
    </div>

  );
};

Step.propTypes = {
  stepNumber: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};
