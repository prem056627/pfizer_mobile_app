import React from "react";
import { Home, Bell, Menu } from "lucide-react";
import MenuFooter from "../../components/MenuFooter";
import { ReactComponent as ProgramCard1 } from "../../assets/images/ProgramCards/Program_card_1.svg";
import FabButton from "../../components/FabButton";
import PatientConsentModal from "./ProgramConsent/PatientConsentModal";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Physicalverification } from "../../assets/images/ProgramCards/physicalverification.svg";
import { ReactComponent as Ekyc } from "../../assets/images/ProgramCards/ekyc.svg";
import {
  selectProgramStatus,
  selectViewingOrderHistory,
  setDocUploadStatus,
  setPhysicalVerificationModalOpen,
  setProgramEnrollmentConsent,
  setSelectedProgram,
  setViewingOrderHistory,
} from "../../slice/patient-detail-form";
import OrderHistory from "../uploadInvoice/OrderHistory";
// import ProgramEnrollSuccess from "./ProgramEnrollSuccess";

const ACTIVE_PROGRAMS = [
  {
    id: 1,
    name: "Palbace",
    status: "Active",
    uid: "10015",
    enrollmentDate: "9th Jun, 2021",
    schemes: "9+LFT",
    doctorName: "Dr. John Doe",
    orders: "3",
    nextVisit: "15th Mar, 2025",
    type: "Oncology",
  },
  {
    id: 2,
    name: "Xeljanz",
    status: "Active",
    uid: "10016",
    enrollmentDate: "12th Dec, 2021",
    schemes: "6+LFT",
    doctorName: "Dr. Sarah Smith",
    orders: "5",
    nextVisit: "20th Mar, 2025",
    type: "Rheumatology",
  },
  {
    id: 3,
    name: "Ibrance",
    status: "Active",
    uid: "10017",
    enrollmentDate: "3rd Jan, 2022",
    schemes: "12+LFT",
    doctorName: "Dr. Michael Chen",
    orders: "8",
    nextVisit: "1st Apr, 2025",
    type: "Oncology",
  },
  {
    id: 4,
    name: "Enbrel",
    status: "Active",
    uid: "10018",
    enrollmentDate: "15th Feb, 2022",
    schemes: "3+LFT",
    doctorName: "Dr. Emily Brown",
    orders: "2",
    nextVisit: "10th Mar, 2025",
    type: "Immunology",
  },
];

const PfizerProgram = () => {
  const dispatch = useDispatch();
  const programStatus = useSelector(selectProgramStatus);
  const viewingOrderHistory = useSelector(selectViewingOrderHistory);

  const handleRequest = () => {
    dispatch(setProgramEnrollmentConsent(true));
  };

  const handleRequestShortfallProgram = () => {
    dispatch(setDocUploadStatus('short_fall_doc'));
  };

  const handleViewHistory = (program) => {
    dispatch(setSelectedProgram(program));
    dispatch(setViewingOrderHistory(true));
  };

  const handlePhysicalVerification = () => {
    dispatch(setPhysicalVerificationModalOpen(true));
  };

  // If viewing order history, render OrderHistory component instead
  if (viewingOrderHistory) {
    return <OrderHistory />;
  }

  const renderUnactiveProgram = () => (
    <div className="w-full  bg-white rounded-lg shadow-md mt-4 border">
      <div className="p-4 flex gap-4">
        <div>
          <ProgramCard1 />
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
      <button
        onClick={handleRequest}
        className="w-full text-[14px] font-sans font-bold bg-primary text-white py-4 rounded-b-lg"
      >
        ENROL
      </button>
    </div>
  );

  const renderShortfallProgram = () => (
    <div className="w-full  bg-white rounded-lg shadow-md mt-4 border">
      <div className="flex items-center gap-2 p-4">
        <h2 className="text-[18px] font-bold">Palbace</h2>
        <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full">
       { programStatus === "doc_shortfall" ? "Document Shortfall" : "Profile under Review "}
        </span>
      </div>
      <div className="px-4 flex gap-4">
        <div className="space-y-2 text-gray-600 mb-6">
          <p className="text-[#767676] text-[14px] font-sans font-bold">
            UID 10015
          </p>
          <p className="text-[#767676] text-[14px] font-open-sans">
            FOC Orders - 01
          </p>
          <p className="text-[#767676] text-[14px] font-open-sans">
            Enrollment Date - 9th Jun, 2021
          </p>
          <p className="text-[#767676] text-[14px] font-open-sans">
            Schemes - 9+LFT
          </p>
          <p className="text-[#767676] text-[14px] font-open-sans">
            Doctor's Name - Dr. John Doe
          </p>
        </div>
      </div>
     {
       programStatus === "doc_shortfall" &&  <div className="flex justify-center items-center p-2">
       <button
         onClick={handleRequestShortfallProgram}
         className="text-[14px] w-full font-sans font-bold border border-primary bg-white rounded-lg text-primary py-4"
       >
         Update new document
       </button>
     </div>
     }
    </div>
  );

  const renderActiveProgram = () => (
    <>
      <div className="pt-4 w-full ">
        {ACTIVE_PROGRAMS.map((program) => (
          <div key={program.id} className="bg-white rounded-lg shadow-sm p-4 mb-6 mt-2 border">
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-4">
                <h3 className="text-lg font-semibold">{program.name}</h3>
                <span className="px-4 py-1 bg-[#D9FFD5] text-[#3B3B3B] text-[14px] rounded-full">
                  Active
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <button  onClick={() => handleViewHistory(program)} className="text-white bg-primary py-[4px] px-[14px] rounded-[6px] text-sm font-medium">
                  View History
                </button>
              </div>
            </div>
            <div className="space-y-[6px] text-gray-600">
              <p className="text-[#767676] text-[14px] font-open-sans font-bold">
                UID {program.uid}
              </p>
              <p className="text-[#767676] text-[14px]">
                Enrollment Date - {program.enrollmentDate}
              </p>
              <p className="text-[#767676] text-[14px]">Schemes - {program.schemes}</p>
              <p className="text-[#767676] text-[14px]">
                Doctor's Name - {program.doctorName}
              </p>
            </div>
          </div>
        ))}
      </div>
  
      <div className="w-full pb-20">
        <h2 className="text-lg font-semibold w-full mb-6">Value Added Services</h2>
        <div className="space-y-6 pb-30">
          <div className="bg-white rounded-lg shadow-sm p-4 border ">
            <div className="flex gap-4 mb-3">
              <div className="p-3 rounded-lg">
                <Physicalverification width={70} />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-[#616161]">
                  Physical Verification
                </h3>
                <p className="text-[13px] text-[#606060]">
                  Complete your physical verification by submitting documents and
                  booking an appointment.
                </p>
              </div>
            </div>
            <button onClick={handlePhysicalVerification} className="w-full text-sm bg-primary text-white py-3 rounded-[6px] font-medium">
              START YOUR PHYSICAL VERIFICATION
            </button>
          </div>
  
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex gap-4 mb-3">
              <div className="p-3 rounded-lg">
                <Ekyc width={70} />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-[#616161]">
                  eKYC Verification
                </h3>
                <p className="text-[13px] text-[#606060]">
                  Verify your identity digitally using Aadhaar and other valid
                  documents.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-full text-sm bg-primary text-white py-3 rounded-[6px] font-medium">
                INITIATE YOUR EKYC VERIFICATION
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );


  
  return (
    <div className="flex flex-col items-center   p-4  max-h-screen bg-white">
      <h2 className="text-lg font-semibold w-full">Programs</h2>

      {programStatus === "un_active" && renderUnactiveProgram()}
      {(programStatus === "doc_shortfall" || programStatus === "profile_under_review") && renderShortfallProgram()}

      {programStatus === "active" && renderActiveProgram()}

      <div className="fixed bottom-24 z-30 w-full">
        <FabButton />
      </div>

      <PatientConsentModal />
      {/* <MenuFooter /> */}
    </div>
  );
};

export default PfizerProgram;