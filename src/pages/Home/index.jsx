import { useSelector } from "react-redux";
import Stepper from "../../components/Stepper";
// import PatientDetailForm from "../patient-detail-form";
import { selectCurrentStep } from "../../slice/patient-detail-form";
import MobProgressSteps from "../../components/MobProgressSteps";
// import SuccessPage from "../../components/SuccessPage";
import { Outlet } from "react-router-dom";

function Home() {
  const currentStep = useSelector(selectCurrentStep);

  // const steps = [
  //   {
  //     title: "Personal \n Details",
  //     subheading: "Comprehensive Multi-Cancer Risk Assessment Questionnaire",
  //     tooltipText: "Personal details play a pivotal role in assessing individualized cancer risks & tailoring screening interventions.",
  //   },
  //   {
  //     title: "Personalising Cancer \n Risk Factors Details",
  //     subheading: "Controllable Cancer Risk Factors",
  //     tooltipText: "Lifestyle choices directly influence cancer risks. Unhealthy lifestyle habits, exposure to toxins and environmental factors, genetic susceptibility, personal and family history of cancer are emerging as the leading causes of cancer. Understanding these lifestyle-related risk factors is essential for proactive health management and further evaluation, interventions & investigations. It is important for each individual to be well informed of their exposure to each cancer risk factor so that they can take appropriate action to mitigate the risk of uncontrolled cell growth going undetected till late stages of cancer development."
  //   },
  //   {
  //     title: "Toxic \n Exposure",
  //     subheading: "Toxic Exposure",
  //     tooltipText: "Environmental and Occupational Hazards are crucial in cancer risk and exposure assessment, highlighting the link between our surroundings and health. Exposure to certain toxins in the environment, workplace, or through contaminated food and water can increase cancer risk. These toxins may be eaten or drunk through consumption of contaminated food or liquids, inhaled, ingested, touched, or absorbed through the skin. Examples include air pollutants like particulate matter, nitrogen dioxide, and sulfur dioxide from vehicle emissions, asbestos, benzene, arsenic etc. used in industrial processes and power plants, some pesticides. increase cancer risk. A healthy, balanced diet rich in fiber and antioxidants may help reduce cancer risk. Toxic Exposure is associated with an increased risk of developing many other diseases, including: Water-related illnesses (diarrhea, dysentery, typhoid fever, E. coli infection, and salmonellosis). Respiratory diseases (asthma, COPD), Asbestos-related diseases (lung cancer, mesothelioma, and asbestosis), Cadmium-related diseases, etc."

  //   },
  //   {
  //     title: "Inherited Cancer \n Risk Exposure",
  //     subheading: "Inherited Cancer Risk Exposure Factors",
  //     tooltipText: "These questions help build a comprehensive picture of potential inherited cancer risks. (If the answers suggest a heightened risk, the individual might be referred for further evaluation, interventions & investigations.)"

  //   },
  //   {
  //     title: "Controllable Cancer \n Risk Exposure",
  //     subheading: "Controllable Cancer Risk Exposure Factors",
  //     tooltipText: "Recognizing present warning signs and understanding cancer risks are paramount in early detection and intervention. Many health concerns manifest through subtle signs; timely acknowledgment of these indicators and correlating them with potential risks can be life-saving, emphasizing the importance of awareness and regular health check-ups."
  //   },
  // ];

  return (
    <div className="bg-[#FBFCFF]">
      <div className="w-full file:">
        <div className="bg-white flex justify-center items-center h-20 px-6   w-full">
          <div className="flex justify-center items-center">
            <img
              width={90}
              src="/pfizer_logo.svg"
              alt="Pfizer Logo"
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* <div className="md:container mx-auto md:px-6 py-4 relative">

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

        </div> */}

        <main className=" container mx-auto md:px-14 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Home;
