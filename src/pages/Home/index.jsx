
import { useSelector } from "react-redux";
import Stepper from "../../components/Stepper";
import { selectCurrentStep } from "../../slice/patient-detail-form";
import MobProgressSteps from "../../components/MobProgressSteps";
import MenuFooter from "../../components/MenuFooter";
import FabButton from "../../components/FabButton";
import React from "react";
import { ReactComponent as PfizerLogo } from '../../assets/images/svg/pfizer_logo.svg';

function Home({ hideFooter,hideLogo, children }) {
  const currentStep = useSelector(selectCurrentStep);

  console.log('hideFooter,hideFooter,hideFooter',hideFooter);
  return (
    <div className="flex flex-col  bg-[#FBFCFF]">
      {/* Header */}
    {
       !hideLogo && <div className="w-full fixed top-0 z-10 bg-white shadow-md">
       <div className="flex justify-center items-center h-20 px-6 w-full">
         {/* <img
           width={90}
           src="/pfizer_logo.svg"
           alt="Pfizer Logo"
           className="cursor-pointer"
         /> */}
         <PfizerLogo/>
       </div>
     </div>
    }

      {/* Content */}
      <main className="flex-1 overflow-y-auto container mx-auto md:px-14 py-24 bg-[##F9FAFB] ">
        {children}
      </main>

      {/* Conditional Footer */}
      {!hideFooter && <MenuFooter />}
    </div>
  );
}

export default Home;
