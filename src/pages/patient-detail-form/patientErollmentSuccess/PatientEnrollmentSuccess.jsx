
import React, { useState } from "react";
// import GenerateReportBtn from "./Buttons/GenerateReportBtn";
// import ViewSubmittedBtn from "./Buttons/ViewSubmittedBtn";
import { ReactComponent as SuccessLogo } from "../../../assets/images/svg/successEnrollment.svg";
import { handleRequest } from "msw";
import { useDispatch } from "react-redux";
import { setCurrentPageState, setIsInitalDataLoad, setPatientEnrollmentSuccessModalOpen } from "../../../slice/patient-detail-form";

function PatientEnrollmentSuccess() {
const dispatch = useDispatch();
const refreshApplication = () => {
  window.location.reload();
};


    const handleRequest = () => {
  
        // console.log("Request Sent");
         dispatch(setPatientEnrollmentSuccessModalOpen(false));
         dispatch(setCurrentPageState('program_enrolment'));
         dispatch(setIsInitalDataLoad(true));
         
        //  setTimeout(() => {
        //   refreshApplication();
        // }, 200);
        
     
    }
  return (
    <div className="flex flex-col items-center justify-between gap-40   h-full  ">

      <div className="flex flex-col items-center justify-center gap-4 px-6 pt-40">
        <div className="animate-enter">
          <SuccessLogo />
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-[18px] font-sans font-bold text-[#595454] text-center ">
            {" "}
            You have successfully saved your profile details.
          </h2>
          <h4 className="text-md text-[16px] font-sans font-semibold text-[#595454] text-center">
            {" "}
            Now,Let’s enroll for a profile
          </h4>
          <p className="text-[14px] text-[#595454] max-w-[568px] text-center ">
            Upload the documents and send for approval.
          </p>
        </div>
      </div>

      <div className="bg-white  flex justify-center items-center h-20    w-full px-6 pb-4">
       <button onClick={handleRequest} className="p-[12px] rounded-lg bg-primary text-white w-full ">Continue</button>
      </div>
    </div>
  );
}

export default PatientEnrollmentSuccess;
