import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentStep } from "../../slice/patient-detail-form";
import Step1 from "./step-1";
import Step2 from "./step-2";
// import Step3 from "./step-3";
// import Step4 from "./step-4";
// import Step5 from "./step-5";
import Stepper from "../../components/Stepper";
import MobProgressSteps from "../../components/MobProgressSteps";

const PatientDetailForm = () => {
  const currentStep = useSelector(selectCurrentStep);
  const steps = [
    {
      title: "Profile Details",
      subheading: "Comprehensive Multi-Cancer Risk Assessment Questionnaire",
      tooltipText:
        "Personal details play a pivotal role in assessing individualized cancer risks & tailoring screening interventions.",
    },
    {
      title: "Caregiver Details",
      subheading: "Controllable Cancer Risk Factors",
      tooltipText:
        "Lifestyle choices directly influence cancer risks. Unhealthy lifestyle habits, exposure to toxins and environmental factors, genetic susceptibility, personal and family history of cancer are emerging as the leading causes of cancer. Understanding these lifestyle-related risk factors is essential for proactive health management and further evaluation, interventions & investigations. It is important for each individual to be well informed of their exposure to each cancer risk factor so that they can take appropriate action to mitigate the risk of uncontrolled cell growth going undetected till late stages of cancer development.",
    },
  ];

  const getStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      // case 3:
      // 	return <Step3 />;
      // case 4:
      // 	return <Step4 />;
      // case 5:
      // 	return <Step5 />;
      default:
        return null;
    }
  };
  return (
    <div className="w-full pb-24 max-h-screen">
      {/* <div className="bg-white flex justify-between items-center h-16 px-6 border-b-1 border-gray-200 shadow-sm">
				<div className="">
					<a href="/">
						<img width={90} src="/medidect_logo_tm.svg" alt="logo" className="cursor-pointer" />
					</a>
				</div>
				<div className="cursor-pointer flex items-center gap-1" >
					<img src="/icon/profile-icon.svg" alt="profile-icon" />
					<img src="/icon/right-arrow.svg" alt="right-arrow" />
				</div>
			</div> */}

<h3 className="text-start text-[16px] font-sans font-semibold text-black mt-2  py-6 border-b-[1px] border-[#DBDBDB] mx-4">
  Program Enrollment
</h3>


      <div className="md:container mx-auto md:px-6 py-8 relative">
        <Stepper steps={steps} />

        {/* Mobile Progress Steps - removed the mapping */}
        <div className="w-full h-6 px-4 gap-2 md:hidden py-4">
          <MobProgressSteps
            isActive={currentStep === 1}
            isCompleted={currentStep === 2}
          />
        </div>
      </div>
      <div className="mx-auto w-full">{getStepComponent()}</div>
    </div>
  );
};

export default PatientDetailForm;
