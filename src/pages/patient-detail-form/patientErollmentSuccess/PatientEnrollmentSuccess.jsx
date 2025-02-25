// import React from "react";
// import { ReactComponent as SuccessLogo } from "../../../assets/images/svg/successEnrollment.svg";
// import { ReactComponent as ProgramSucess } from "../../../assets/images/ProgramCards/successEnrollment.svg";

// function PatientEnrollmentSuccess() {
//   return (
//     <div className="flex flex-col items-center justify-between  gap-6   h-screen  ">
//       {/* <div className=" h-20 w-full flex justify-center items-center">
//         <div className="flex justify-center items-center">
//           <img
//             width={100}
//             src="/pfizer_logo.svg"
//             alt="Pfizer Logo"
//             className="cursor-pointer"
//           />
//         </div>
//       </div> */}

//       <div className=" flex flex-col items-center justify-between gap-10">


//       <div className="flex flex-col items-center justify-center gap-4 px-6 pt-20 ">
//         <div className="animate-enter">
//           <SuccessLogo />
//         </div>

       


//         <div className="flex flex-col items-center gap-2 text-center ">
//           <h2 className="text-[18px] font-open-sans font-semibold text-[#595454] text-center ">
//             {" "}
//             You have <span className="text-[#208376]">successfully submitted</span> your <span className="text-[#208376]">program details</span>.
//           </h2>
//           <h4 className="text-md text-[36px]  font-open-sans font-extralight text-[#707070] text-center">
//             {" "}
//             Now Sit Back!
//           </h4>
//           <p className="text-[22px] font-open-sans font-extralight italic text-[#C4C4C4] max-w-[568px] text-center ">
//           while we verify your submitted documents.
//           </p>
//         </div>
//       </div>

//       <div className="flex justify-center items-center w-full px-6 pt-14">
//         <ProgramSucess />
//       </div>
//       </div>
      
//     </div>
//   );
// }

// export default PatientEnrollmentSuccess;


import React from "react";
// import GenerateReportBtn from "./Buttons/GenerateReportBtn";
// import ViewSubmittedBtn from "./Buttons/ViewSubmittedBtn";
import { ReactComponent as SuccessLogo } from "../../../assets/images/svg/successEnrollment.svg";
import { handleRequest } from "msw";
import { useDispatch } from "react-redux";
import { setCurrentPageState, setPatientEnrollmentSuccessModalOpen } from "../../../slice/patient-detail-form";

function PatientEnrollmentSuccess() {
const dispatch = useDispatch();
    const handleRequest = () => {
        console.log("Request Sent");
         dispatch(setPatientEnrollmentSuccessModalOpen(false));
         dispatch(setCurrentPageState('program_dashboard'));
    }
  return (
    <div className="flex flex-col items-center justify-between gap-40   h-full  ">
      {/* <div className="bg-white flex justify-center items-center h-20    w-full">
        <div className="flex justify-center items-center">
          <img
            width={90}
            src="/pfizer_logo.svg"
            alt="Pfizer Logo"
            className="cursor-pointer"
          />
        </div>
      </div> */}

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
