import React from "react";
import { Home, Bell, Menu } from "lucide-react";
import MenuFooter from "../../components/MenuFooter";
import { ReactComponent as ProgramCard1 } from "../../assets/images/ProgramCards/Program_card_1.svg";
import FabButton from "../../components/FabButton";
import PatientConsentModal from "./ProgramConsent/PatientConsentModal";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Physicalverification } from "../../assets/images/ProgramCards/physicalverification.svg";
import { ReactComponent as PhysicalverificationSheduled } from "../../assets/images/ProgramCards/PhysicalverificationSheduled.svg";
import { ReactComponent as Ekyc } from "../../assets/images/ProgramCards/ekyc.svg";
import { ReactComponent as Upload } from '../../../src/assets/images/svg/upload.svg';
import { ReactComponent as Pap } from '../../../src/assets/images/Ekyc/pap.svg';
import {
  selectInitializeData,
  selectProgramStatus,
  selectViewingOrderHistory,
  setDocUploadStatus,
  setIsEkySuccessModalOpen,
  setPhysicalVerificationModalOpen,
  setProgramEnrollmentConsent,
  setSelectedEnrollProgram,
  setSelectedProgram,
  setViewingOrderHistory,
} from "../../slice/patient-detail-form";
import OrderHistory from "../uploadInvoice/OrderHistory";
// import ProgramEnrollSuccess from "./ProgramEnrollSuccess";


// APPLIED_PROGRAMS

const PfizerProgram = () => {
  const dispatch = useDispatch();
  const programStatus = useSelector(selectProgramStatus);
  const viewingOrderHistory = useSelector(selectViewingOrderHistory);

  const initiaData = useSelector(selectInitializeData)

  const number_of_programs_enrollled = initiaData?.program_data?.enrolled_programs;
  // console.log('number_of_programs_enrollled,',number_of_programs_enrollled);
const APPLIED_PROGRAMS = initiaData?.program_data?.applied_programs||[];

// console.log("Applied Programs",APPLIED_PROGRAMS);

const AVAILABLE_PROGRAMS = initiaData?.program_data?.available_programs||[];
// console.log('initiaDatainitiaDatainitiaData',initiaData?.physical_verification?.show_verification_button);

// console.log('initiaDatainitiaDatainitiaData',initiaData?.patient_data?.patient_uid);
  const handleRequest = (program) => {
   
    dispatch(setSelectedEnrollProgram(program));
    dispatch(setProgramEnrollmentConsent(true));
  };

  const handleRequestShortfallProgram = () => {
    dispatch(setDocUploadStatus('short_fall_doc'));
  };

  const handleViewHistory = (program) => {
    // console.log('selected program !!!',program)
    dispatch(setSelectedProgram(program));
    dispatch(setViewingOrderHistory(true));
  };

  const handlePhysicalVerification = () => {
    dispatch(setPhysicalVerificationModalOpen(true));
  };

  const handleEkyRequest = ()=>{

    dispatch(setIsEkySuccessModalOpen(true));
  }

  // If viewing order history, render OrderHistory component instead
  if (viewingOrderHistory) {
    return <OrderHistory />;
  }

  // const renderAvailablePrograms = () => (
  //   <div className="w-full  bg-white rounded-lg shadow-md mt-4 border">
  //     <div className="p-4 flex gap-4">
  //       <div>
  //         <ProgramCard1 />
  //       </div>
  //       <div className="flex-1">
  //         <h3 className="text-md font-semibold">Palbace</h3>
  //         <div className="flex gap-2 mt-2">
  //           <span className="bg-orange-200 text-orange-800 text-xs px-2 py-1 rounded">
  //             Oncology
  //           </span>
  //           <span className="bg-orange-200 text-orange-800 text-xs px-2 py-1 rounded">
  //             Patient Assistance
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //     <button
  //       onClick={handleRequest}
  //       className="w-full text-[14px] font-sans font-bold bg-primary text-white py-4 rounded-b-lg"
  //     >
  //       ENROL
  //     </button>
  //   </div>
  // );


  // Component to render all unactive/unenrolled programs
const renderAvailablePrograms = () => (
  <div className="space-y-4 w-full pb-20">
    {AVAILABLE_PROGRAMS.map((program) => (
      <div key={program.program_id} className="w-full bg-white rounded-lg shadow-md border">
        <div className="p-4 flex gap-4">
        <div>
        <img src={program.program_image} alt={program.program_name} className="w-20 h-20 rounded-[12px]" />
      </div>
          <div className="flex-1">
            <h3 className="text-md font-semibold ">{program.program_name}</h3>
            <div className="flex gap-2 mt-2">
              {program.program_type.map((type, index) => (
                <span 
                  key={index} 
                  className="bg-orange-200 text-orange-800 text-xs px-2 py-1 rounded"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={() => handleRequest(program)}
          className="w-full text-[14px] font-sans font-bold bg-primary text-white py-4 rounded-b-lg"
        >
          ENROL
        </button>
      </div>
    ))}
  </div>
);

  // const renderShortfallProgram = () => (
  //   <div className="w-full  bg-white rounded-lg shadow-md mt-4 border">
  //     <div className="flex items-center gap-2 p-4">
  //       <h2 className="text-[18px] font-bold">Palbace</h2>
  //       <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full">
  //      { programStatus === "doc_shortfall" ? "Document Shortfall" : "Profile under Review "}
  //       </span>
  //     </div>
  //     <div className="px-4 flex gap-4">
  //       <div className="space-y-2 text-gray-600 mb-6">
  //         <p className="text-[#767676] text-[14px] font-sans font-bold">
  //           UID 10015
  //         </p>
  //         <p className="text-[#767676] text-[14px] font-open-sans">
  //           FOC Orders - 01
  //         </p>
  //         <p className="text-[#767676] text-[14px] font-open-sans">
  //           Enrollment Date - 9th Jun, 2021
  //         </p>
  //         <p className="text-[#767676] text-[14px] font-open-sans">
  //           Schemes - 9+LFT
  //         </p>
  //         <p className="text-[#767676] text-[14px] font-open-sans">
  //           Doctor's Name - Dr. John Doe
  //         </p>
  //       </div>
  //     </div>
  //    {
  //      programStatus === "doc_shortfall" &&  <div className="flex justify-center items-center p-2">
  //      <button
  //        onClick={handleRequestShortfallProgram}
  //        className="text-[14px] px-4 flex justify-between items-center w-full font-sans font-bold border border-primary bg-white rounded-lg text-primary py-2"
  //      >
  //       <div className="">
  //       <p className="text-primary font-sans text-[15px] font-semibold">Update new document</p>
  //       <p className="text-[#A9A9A9] font-sans text-[15px] font-normal">Upload your ID Proof and Address Proof</p>
  //       </div>
  //      <div>
  //      <Upload/>
  //      </div>
  //      </button>
  //    </div>
  //    }
  //   </div>
  // );
  console.log('program,program',APPLIED_PROGRAMS)
  console.log('initiaData?.physical_verification?.show_verification_button',initiaData?.ekyc_verification?.show_verification_button);
  const renderActiveProgram = () => (
    <>
     <div className="pt-[2px] w-full">
      {APPLIED_PROGRAMS.map((program) => (
        program.program_status === 'active' || program.program_status === 'applied' ? (
          <div key={program.program_id} className="bg-white rounded-lg shadow-sm p-4 mb-6 mt-2 border">
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-2">
                <h3 className="text-[18px] font-semibold programhead">{program.program_name}</h3>
                <span 
                  className={`px-4 py-1 ${
                    program.program_status === 'applied' 
                    ? 'bg-[#fffed5]' 
                    : program.program_status === 'active' 
                      ? 'bg-[#D9FFD5]' 
                      : ''
                  
                  } text-[#3B3B3B] text-[14px] rounded-full`}
                >
                 
                  {program.program_status === "applied" ? "Applied" 
        :program.program_status === "active" ? "Active" 

: ""}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <button 
                  onClick={() => handleViewHistory(program)} 
                  className="text-white bg-primary py-[4px] px-[14px] rounded-[6px] text-sm font-medium"
                >
                  View History
                </button>
              </div>
            </div>
            <div className="space-y-[6px] text-gray-600">
              <p className="text-[#767676] text-[14px] font-open-sans font-bold">
                UID - {initiaData?.patient_data?.patient_uid}
                {/* patient_uid */}
              </p>
              <p className="text-[#767676] text-[14px]">
                Enrollment Date - {program.program_enrollmentDate}
              </p>
              <p className="text-[#767676] text-[14px]">Schemes - {program.program_scheme}</p>
              <p className="text-[#767676] text-[14px]">
                Doctor's Name - {program.doctor_name}
              </p>
            </div>
          </div>
        ) : (
          <div key={program.id} className="w-full bg-white rounded-lg shadow-md mt-4 border mb-6">
            <div className="flex items-center gap-2 p-4">
              <h2 className="text-[18px] font-bold">{program.program_name}</h2>
              <span
                className={`px-4 py-1 ${
                  program.program_status === 'shortfall' 
                  ? 'bg-red-100 text-red-800' 
                  : program.program_status === 'suspended' 
                    ? 'bg-red-100 text-red-800' 
                    :  program.program_status === 'rejected' 
                    ? 'bg-red-100 text-red-800' 
                    : ''

                
                } text-[#3B3B3B] text-[14px] rounded-full`}
              >
                      {program.program_status === "shortfall" ? "Document Shortfall" 
        : program.program_status === "suspended" ? "Suspended" 
        : program.program_status === "rejected" ? "Rejected" 
        :program.program_status === "applied" ? "Profile under Review" 

: ""}

              </span>
            </div>
            <div className="px-4 flex gap-4">
              <div className="space-y-2 text-gray-600 mb-6">
                <p className="text-[#767676] text-[14px] font-sans font-bold">
                UID - {initiaData?.patient_data?.patient_uid}
                </p>
                {/* need to update */}
                <p className="text-[#767676] text-[14px] font-open-sans">
                  FOC Orders - 01
                </p>
                <p className="text-[#767676] text-[14px] font-open-sans">
                Enrollment Date - {program.program_enrollmentDate}
                </p>
                <p className="text-[#767676] text-[14px]">Schemes - {program.program_scheme}</p>
                <p className="text-[#767676] text-[14px] font-open-sans">
                Doctor's Name - {program.doctor_name}
                </p>
              </div>
            </div>
            {program.program_status === "shortfall" && (
              <div className="flex justify-center items-center p-2">
                <button
                  onClick={handleRequestShortfallProgram}
                  className="text-[14px] px-4 flex justify-between items-center w-full font-sans font-bold border border-primary bg-white rounded-lg text-primary py-2"
                >
                  <div>
                    <p className="text-primary font-sans text-[15px] font-semibold">Update new document</p>
                    <p className="text-[#A9A9A9] font-sans text-[15px] font-normal">Upload your ID Proof and Address Proof</p>
                  </div>
                  <div>
                    <Upload />
                  </div>
                </button>
              </div>
            )}
          </div>
        )
      ))}
    </div>
   
 
    {(initiaData?.ekyc_verification?.show_verification_button || 
  initiaData?.physical_verification?.show_verification_button) && (
    <div className="w-full pb-20">
    <h2 className="text-lg font-semibold w-full mb-6">Value Added Services</h2>
    <div className="space-y-6 pb-30  mb-20">
        {/* physical verification has been sheduled */}
      {/* <div className="bg-white rounded-lg shadow-sm  border rounded-b-[20px]">
        <div className="flex gap-4  items-center ">
          <div className="p-3 rounded-lg">
            <PhysicalverificationSheduled width={70} />
          </div>
          <div>
            
            <p className="text-[15px] font-sans font-semibold text-[#606060]">
            Your <span className="text-primary">physical verification</span> has been <span className="text-primary">scheduled</span>  .
            </p>
          </div>
        </div>
        <button className=" flex items-center w-full text-[14px] italic bg-primary text-white py-1 gap-2 rounded-b-[20px] font-medium">
        <span className="pl-4">
         <Pap className="w-8 h-8 "/>
        </span>
         PAP Team will soon reach out to for verification
        </button>
      </div> */}
    
    {/* physical verification has been sheduled by Phlebo */}
    {/* <div className="bg-white rounded-lg shadow-sm  border rounded-b-[20px]">
        <div className="flex gap-4  items-center ">
          <div className="p-3 rounded-lg">
            <PhysicalverificationSheduled width={70} />
          </div>
          <div>
        
            <p className="text-[15px] font-sans font-semibold text-[#606060]">
            Your <span className="text-primary">physical verification</span>  is scheduled for  <span className="text-primary">24-02-2024</span> at .
            <span className="text-primary">  2.40PM.</span>
            
            </p>
          </div>
        </div>
        <button className=" flex items-center w-full text-[14px] italic bg-primary text-white py-1 gap-[2px] rounded-b-[20px] font-medium">
        <span className="pl-2">
         <Pap className="w-8 h-8 "/>
        </span>
        &lt;Phlebo&gt; Team will soon reach out to for verification
        </button>
      </div> */}
      {/* defautl physical very card */}
    {initiaData?.physical_verification?.show_verification_button && 
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
    }
    
    {initiaData?.ekyc_verification?.show_verification_button && 
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
    <button onClick={handleEkyRequest} className="w-full text-sm bg-primary text-white py-3 rounded-[6px] font-medium">
    INITIATE YOUR EKYC VERIFICATION
    </button>
    </div>
    </div>
    }
    
    
    
    </div>
    </div>
)}



 
    

      
    </>
  );


  
  return (
    <div className="flex flex-col items-center   p-4  max-h-screen bg-white relative">
      <h2 className="text-lg font-semibold w-full py-4">Programs</h2>

      {(number_of_programs_enrollled ?? 0) > 0 
    ? renderActiveProgram() 
    : renderAvailablePrograms()}


      {/* {AVAILABLE_PROGRAMS && renderAvailablePrograms()} */}
      {/* {(programStatus === "doc_shortfall" || programStatus === "profile_under_review") && renderShortfallProgram()} */}

      {/* {APPLIED_PROGRAMS  && renderActiveProgram()} */}

      <div className="fixed bottom-24 z-30 right-0">
        <FabButton />
      </div>

      <PatientConsentModal />
      {/* <MenuFooter /> */}
    </div>
  );
};

export default PfizerProgram;