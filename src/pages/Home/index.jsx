// import { useSelector } from "react-redux";
// import Stepper from "../../components/Stepper";
// import { selectCurrentStep } from "../../slice/patient-detail-form";
// import MobProgressSteps from "../../components/MobProgressSteps";
// import MenuFooter from "../../components/MenuFooter";
// import FabButton from "../../components/FabButton";
// import React from "react";

// function Home({ hideFooter, children }) {
//   const currentStep = useSelector(selectCurrentStep);

//   return (
//     <div className="flex flex-col h-screen bg-[#FBFCFF]">
//       <div className="w-full fixed top-0 z-0">
//         <div className="bg-white flex justify-center items-center h-20 px-6 w-full">
//           <div className="flex justify-center items-center">
//             <img
//               width={90}
//               src="/pfizer_logo.svg"
//               alt="Pfizer Logo"
//               className="cursor-pointer"
//             />
//           </div>
//         </div>

//         <main className="flex-1 overflow-y-auto container mx-auto md:px-14 py-4">
//           {children}
//         </main>
//       </div>

//       {!hideFooter && <MenuFooter  />} {/* Hide footer when hideFooter is true */}
//     </div>
//   );
// }

// export default Home;


import { useSelector } from "react-redux";
import Stepper from "../../components/Stepper";
import { selectCurrentStep } from "../../slice/patient-detail-form";
import MobProgressSteps from "../../components/MobProgressSteps";
import MenuFooter from "../../components/MenuFooter";
import FabButton from "../../components/FabButton";
import React from "react";

function Home({ hideFooter, children }) {
  const currentStep = useSelector(selectCurrentStep);

  return (
    <div className="flex flex-col  bg-[#FBFCFF]">
      {/* Header */}
      <div className="w-full fixed top-0 z-10 bg-white shadow-md">
        <div className="flex justify-center items-center h-20 px-6 w-full">
          <img
            width={90}
            src="/pfizer_logo.svg"
            alt="Pfizer Logo"
            className="cursor-pointer"
          />
        </div>
      </div>

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
