import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentPageState } from "../../slice/patient-detail-form";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Stepper from "../../components/Stepper";
import MobProgressSteps from "../../components/MobProgressSteps";

const PatientDetailForm = () => {
  // Get the current page state from Redux store instead of step
  const currentPageState = useSelector(selectCurrentPageState);

  const steps = [
    {
      title: "Profile Details",
    },
    {
      title: "Caregiver Details",
    },
  ];

  // Get component based on current page state instead of step number
  const getPageComponent = () => {
    switch (currentPageState) {
      case "patient_enrolment":
        return <Step1 />;
      case "caregiver_addition":
        return <Step2 />;
      default:
        return <Step1 />; // Default to Step1 if state is undefined
    }
  };

  // Get current step number for progress indicators based on page state
  const getCurrentStepNumber = () => {
    switch (currentPageState) {
      case "patient_enrolment":
        return 1;
      case "caregiver_addition":
        return 2;
      default:
        return 1;
    }
  };

  // Current step number for the progress indicators
  const currentStepNumber = getCurrentStepNumber();

  return (
    <div className="w-full pb-24 max-h-screen">
      <h3 className="text-start text-[16px] font-sans font-semibold text-black mt-2 py-6 border-b-[1px] border-[#DBDBDB] mx-4">
        Program Enrollment
      </h3>

      <div className="md:container mx-auto md:px-6 py-8 relative">
        <Stepper steps={steps} />

        {/* Mobile Progress Steps - now using the derived step number */}
        <div className="w-full h-6 px-4 gap-2 md:hidden py-4">
          <MobProgressSteps
            isActive={currentStepNumber === 1}
            isCompleted={currentStepNumber === 2}
          />
        </div>
      </div>
      <div className="mx-auto w-full">{getPageComponent()}</div>
    </div>
  );
};

export default PatientDetailForm;
