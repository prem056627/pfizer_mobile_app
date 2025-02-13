import React from 'react'
import { useSelector } from 'react-redux';
import { selectCurrentStep } from '../../slice/patient-detail-form';
import Step1 from './step-1';
import Step2 from './step-2';
import Step3 from './step-3';
import Step4 from './step-4';
import Step5 from './step-5';
import Stepper from '../../components/Stepper';
import MobProgressSteps from "../../components/MobProgressSteps";


const PatientDetailForm = () => {
	const currentStep = useSelector(selectCurrentStep);
	const steps = [
		{
		  title: "Personal \n Details",
		  subheading: "Comprehensive Multi-Cancer Risk Assessment Questionnaire",
		  tooltipText: "Personal details play a pivotal role in assessing individualized cancer risks & tailoring screening interventions.",
		},
		{
		  title: "Personalising Cancer \n Risk Factors Details",
		  subheading: "Controllable Cancer Risk Factors",
		  tooltipText: "Lifestyle choices directly influence cancer risks. Unhealthy lifestyle habits, exposure to toxins and environmental factors, genetic susceptibility, personal and family history of cancer are emerging as the leading causes of cancer. Understanding these lifestyle-related risk factors is essential for proactive health management and further evaluation, interventions & investigations. It is important for each individual to be well informed of their exposure to each cancer risk factor so that they can take appropriate action to mitigate the risk of uncontrolled cell growth going undetected till late stages of cancer development."
		},
		{
		  title: "Toxic \n Exposure",
		  subheading: "Toxic Exposure",
		  tooltipText: "Environmental and Occupational Hazards are crucial in cancer risk and exposure assessment, highlighting the link between our surroundings and health. Exposure to certain toxins in the environment, workplace, or through contaminated food and water can increase cancer risk. These toxins may be eaten or drunk through consumption of contaminated food or liquids, inhaled, ingested, touched, or absorbed through the skin. Examples include air pollutants like particulate matter, nitrogen dioxide, and sulfur dioxide from vehicle emissions, asbestos, benzene, arsenic etc. used in industrial processes and power plants, some pesticides. increase cancer risk. A healthy, balanced diet rich in fiber and antioxidants may help reduce cancer risk. Toxic Exposure is associated with an increased risk of developing many other diseases, including: Water-related illnesses (diarrhea, dysentery, typhoid fever, E. coli infection, and salmonellosis). Respiratory diseases (asthma, COPD), Asbestos-related diseases (lung cancer, mesothelioma, and asbestosis), Cadmium-related diseases, etc."
	
		},
		{
		  title: "Inherited Cancer \n Risk Exposure",
		  subheading: "Inherited Cancer Risk Exposure Factors",
		  tooltipText: "These questions help build a comprehensive picture of potential inherited cancer risks. (If the answers suggest a heightened risk, the individual might be referred for further evaluation, interventions & investigations.)"
	
		},
		{
		  title: "Controllable Cancer \n Risk Exposure",
		  subheading: "Controllable Cancer Risk Exposure Factors",
		  tooltipText: "Recognizing present warning signs and understanding cancer risks are paramount in early detection and intervention. Many health concerns manifest through subtle signs; timely acknowledgment of these indicators and correlating them with potential risks can be life-saving, emphasizing the importance of awareness and regular health check-ups."
		},
	  ];

	const getStepComponent = () => {
		switch (currentStep) {
			case 1:
				return <Step1 />;
			case 2:
				return <Step2 />;
			case 3:
				return <Step3 />;
			case 4:
				return <Step4 />;
			case 5:
				return <Step5 />;
			default:
				return null;

		}

	};
	return (
		<div className="w-full pb-24">
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

			<div className="md:container mx-auto md:px-6 py-4 relative">

				<Stepper steps={steps} />

				<div className=" grid grid-cols-5 w-full h-6 absolute top-20 left-0 px-4 gap-2 md:hidden ">
					{steps.map((steps, index) => (
						<MobProgressSteps
							key={index}
							isActive={currentStep === index + 1}
							isCompleted={currentStep > index + 1}
						/>
					))}

				</div>

				<div className="absolute left-1/2 top-6 sm:top-4 transform -translate-x-1/2 flex items-center gap-2 pr-6  md:hidden">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M13 17L18 12L13 7" stroke="#D8D8D8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M6 17L11 12L6 7" stroke="#D8D8D8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</div>

			</div>
			<div className="mx-auto w-full">
				{getStepComponent()}
			</div>
		</div>
	);
}

export default PatientDetailForm