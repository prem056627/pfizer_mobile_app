import React from "react";
import { Home, Bell, Menu } from "lucide-react"; // Icons from lucide-react
import MenuFooter from "../../components/MenuFooter";
import { ReactComponent as Program_card_1 } from "../../assets/images/ProgramCards/Program_card_1.svg";
import FabButton from "../../components/FabButton";
import PatientConsentModal from "./ProgramConsent/PatientConsentModal";
import { useDispatch, useSelector } from "react-redux";
import { handleRequest } from "msw";
import { setProgramEnrollmentConsent } from "../../slice/patient-detail-form";
import ProgramEnrollSucess from "./ProgramEnrollSucess";
// import { selectProgramEnrollmentConsent } from "../../slice/patient-detail-form";

const PfizerProgram = () => {
  const dispatch = useDispatch()
  function handleRequest(){
  
dispatch(setProgramEnrollmentConsent(true));
  }
  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-4">
      {/* Header */}
      {/* <div className="bg-white flex justify-center items-center h-20 px-6   w-full">
        <div className="flex justify-center items-center">
          <img
            width={90}
            src="/pfizer_logo.svg"
            alt="Pfizer Logo"
            className="cursor-pointer"
          />
        </div>
      </div> */}

      {/* Programs Section */}
      <h2 className="text-lg font-semibold w-full">Programs</h2>

      {/* Card Component */}
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md mt-4 border">
        <div className="p-4 flex gap-4">
          <div className="">
            <Program_card_1 />
          </div>
          <div className="flex-1">
            <h3 className="text-md font-semibold">Palbace</h3>
            <div className="flex gap-2 mt-2">
              <span className="bg-orange-200 text-orange-800 text-xs px-2 py-1 rounded">
                Oncology
              </span>
              <span className="bg-orange-200 text-orange-800 text-xs px-2 py-1 rounded">
                Patient Assistance
              </span>
            </div>
          </div>
        </div>
        <button onClick={handleRequest} className="w-full text-[14px] font-sans font-bold bg-primary text-white py-4 rounded-b-lg">
          ENROL
        </button>
      </div>

      {/* Floating Help Button */}
      {/* <button className="fixed bottom-20 right-6 w-10 h-10 bg-white border rounded-full shadow-md flex items-center justify-center">
        <span className="text-blue-600 text-lg">?</span>
      </button> */}

      {/* Bottom Navigation */}
      {/* <nav className="fixed bottom-0 w-full bg-white border-t flex justify-around py-3 shadow-md">
        <button className="flex flex-col items-center text-blue-600">
          <Home size={20} />
          <span className="text-xs">HOME</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <Bell size={20} />
          <span className="text-xs">NOTIFICATION</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <Menu size={20} />
          <span className="text-xs">MENU</span>
        </button>
      </nav> */}

      <div className="fixed bottom-24 z-30 w-full">
        <FabButton />
      </div>
      <PatientConsentModal/>
     
      <MenuFooter />
    </div>
  );
};

export default PfizerProgram;
