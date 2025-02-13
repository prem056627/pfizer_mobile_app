
// export default Stepper;
import React from 'react';
import './Stepper.css'; // Ensure to import your CSS file
import { ChangeNextStep, selectCurrentStep } from '../../pages/slice';
import { useDispatch, useSelector } from 'react-redux';

const steps = [
	{
		key: 'patient_details',
		label: 'Personal Details',
		content: 'First content',
	},
	{
		key: 'caregiver_details',
		label: 'Caregiver Details',
		content: 'Second content',
	},
	{
		key: 'document_upload',
		label: 'Upload Documents',
		content: 'Third content',
	},
	{
		key: 'authorization',
		isFinal: true,
		label: 'Authorization',
		content: 'Final content',
	},
];

const Stepper = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);

  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.key === currentStep);
    if (currentIndex === -1) return; // Current step is not in the steps array

    if (currentIndex < steps.length - 1) {
      dispatch(ChangeNextStep(steps[currentIndex + 1].key));
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex(step => step.key === currentStep);
    if (currentIndex > 0) {
      dispatch(ChangeNextStep(steps[currentIndex - 1].key));
    }
  };

  const handleReset = () => {
    dispatch(ChangeNextStep('patient_details'));
  };

  return (
    <div data-hs-stepper="">
      {/* Stepper Nav */}
      <ul className="relative flex flex-row gap-x-2">
        {steps.map((step, index) => (
          <li
            key={step.key}
            className={`flex items-center gap-x-2 shrink basis-0 flex-1 group ${currentStep === step.key ? 'hs-stepper-active' : ''}`}
            data-hs-stepper-nav-item={`{"key": "${step.key}"}`}
            style={{ display: step.isFinal ? 'none' : 'flex' }} // Hide the li for the final step
          >
            <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
              <span
                className={`size-7 flex justify-center items-center flex-shrink-0 font-medium rounded-full transition-colors duration-500 radio-button ${currentStep === step.key ? 'active' : ''} ${currentStep !== step.key && steps.findIndex(s => s.key === currentStep) > index ? 'completed' : ''} group-focus:bg-gray-200`}
              >
              </span>
            </span>
            {index < steps.length - 1 && (
              <div
                className={`w-full h-[3px] rounded-full flex-1 bg-gray-200 group-last:hidden transition-colors duration-500 ${currentStep !== step.key && steps.findIndex(s => s.key === currentStep) > index ? 'bg-[#BE2BBB]' : ''}`}
              ></div>
            )}
          </li>
        ))}
        {/* Add a separate span for the final step's radio button */}
        <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
          <span
            className={`size-7 flex justify-center items-center flex-shrink-0 font-medium rounded-full transition-colors duration-500 radio-button ${currentStep === steps[steps.length - 1].key ? 'active' : ''} ${steps.findIndex(s => s.key === currentStep) >= steps.length - 1 ? 'completed' : ''} group-focus:bg-gray-200`}
          >
          </span>
        </span>
      </ul>
     
    </div>
  );
};

export default Stepper;
