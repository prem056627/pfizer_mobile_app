import React, { useContext, useEffect, useState } from "react";
import { Home, Bell, Menu } from "lucide-react";
import MenuFooter from "../../components/MenuFooter";
import { ReactComponent as ProgramCard1 } from "../../assets/images/ProgramCards/Program_card_1.svg";
import FabButton from "../../components/FabButton";
import PatientConsentModal from "./ProgramConsent/PatientConsentModal";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Physicalverification } from "../../assets/images/ProgramCards/physicalverification.svg";
import { ReactComponent as PhysicalverificationSheduled } from "../../assets/images/ProgramCards/PhysicalverificationSheduled.svg";
import { ReactComponent as Ekyc } from "../../assets/images/ProgramCards/ekyc.svg";
import { ReactComponent as NoProgram } from "../../assets/images/ProgramCards/no_program.svg";

import { ReactComponent as Upload } from "../../../src/assets/images/svg/upload.svg";
import { ReactComponent as Pap } from "../../../src/assets/images/Ekyc/pap.svg";
import {
  selectCurrentView,
  selectInitializeData,
  selectProgramStatus,
  selectViewingOrderHistory,
  setCurrentPageState,
  setDocUploadStatus,
  setInitializeData,
  setIsEkySuccessModalOpen,
  setIsInitalDataLoad,
  setPhysicalVerificationModalOpen,
  setProgramEnrollmentConsent,
  setSelectedEnrollProgram,
  setSelectedProgram,
  setViewingOrderHistory,
} from "../../slice/patient-detail-form";
import OrderHistory from "../uploadInvoice/OrderHistory";
import useApi from "../../hooks/useApi";
import { transformToPatientDetailsFormData } from "../../utils/forms";
import { LoaderContext } from "../../context/LoaderContextProvider";
// import ProgramEnrollSuccess from "./ProgramEnrollSuccess";

// APPLIED_PROGRAMS

const PfizerProgram = () => {
  const dispatch = useDispatch();
  const { setLoading, isLoading } = useContext(LoaderContext);
  const programStatus = useSelector(selectProgramStatus);
  const viewingOrderHistory = useSelector(selectViewingOrderHistory);
  const triggerApi = useApi();
  const initiaData = useSelector(selectInitializeData);
  const currentView = useSelector(selectCurrentView);
  
  const number_of_programs_enrollled =
    initiaData?.program_data?.enrolled_programs;
  // console.log('number_of_programs_enrollled,',number_of_programs_enrollled);
  const APPLIED_PROGRAMS = initiaData?.program_data?.applied_programs || [];

  // console.log("patientmobile!!",initiaData?.patient_data?.patient_primary_phone
  // );

  const patient_mobile_number = initiaData?.patient_data?.patient_primary_phone;
  // console.log("Applied Programs",APPLIED_PROGRAMS);

  const AVAILABLE_PROGRAMS = initiaData?.program_data?.available_programs || [];
  // console.log('initiaDatainitiaDatainitiaData',initiaData?.physical_verification?.show_verification_button);

  // console.log('initiaDatainitiaDatainitiaData',initiaData?.patient_data?.patient_uid);
  const handleRequest = (program) => {
    dispatch(setSelectedEnrollProgram(program));
    dispatch(setProgramEnrollmentConsent({ program, consent: true }));
  };

  const handleRequestShortfallProgram = (program) => {
    dispatch(setSelectedEnrollProgram(program));
    dispatch(setDocUploadStatus("short_fall_doc"));
  };

  const handleViewHistory = (program) => {
    // console.log('selected program !!!',program)
    dispatch(setSelectedProgram(program));
    dispatch(setViewingOrderHistory(true));
          dispatch(setIsInitalDataLoad(false));

  
  };

  const handlePhysicalVerification = () => {
    dispatch(setPhysicalVerificationModalOpen(true));
  };



  const makeApiCall = async (values) => {
    try {
      setLoading(true);
      const payload_val = values;

      const { response, success } = await triggerApi({
        url: "/patient_dashboard/?current_step=ekyc_verification",
        type: "POST",
        payload: transformToPatientDetailsFormData(payload_val),
        loader: true,
        // Don't set Content-Type for FormData
      });

      if (success && response) {
        return { success: true, data: response };
      } else {
        return { success: false, error: "API call failed" };
      }
    } catch (error) {
      console.error("Error in makeApiCall:", error);
      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setLoading(false);
    }
  };

  const handleEkyRequest = () => {
    dispatch(setIsEkySuccessModalOpen(true));

    // Ensure you pass the required values
    const values = {
      patient_mobile_number: patient_mobile_number, // Replace with actual data
    };

    makeApiCall(values);
  };

  // If viewing order history, render OrderHistory component instead
  if (viewingOrderHistory) {
    return <OrderHistory />;
  }
  function PoweredByFooter() {
    const phoneNumber = "18002587008"; // Define the phone number

    return (
      <div className="flex flex-row justify-between items-center mt-2 px-5">
        <div className="flex flex-row items-center">
          <p className="text-xs text-gray-500 italic">
            Powered by <span className="font-bold text-black">TATA 1mg</span>
          </p>
        </div>

        <div className="flex items-center">
          <span className="text-xs text-gray-500">Contact: </span>
          <a
            href={`tel:${phoneNumber}`}
            className="text-primary font-bold text-xs no-underline"
          >
            {phoneNumber}
          </a>
        </div>
      </div>
    );
  }
  
  function NoAvailablePrograms() {
    return (
      <div className="flex flex-col items-center justify-center h-96   p-6">
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full ">
          {/* <span className="text-6xl text-purple-300">😞</span>
          <span className="absolute top-0 right-2 text-4xl text-purple-300">!</span> */}
          <NoProgram />
        </div>
        <h2 className="mt-4 text-2xl text-center font-semibold text-gray-700">
          No Available Programs
        </h2>
        <p className="mt-2 text-center text-gray-500">
          "We'll notify you when something arrives!"
        </p>
      </div>
    );
  }

  // Component to render all unactive/unenrolled programs
  const renderAvailablePrograms = () => (
    <div className="space-y-4 w-full pb-20">
      {AVAILABLE_PROGRAMS.length > 0 ? (
        AVAILABLE_PROGRAMS.map((program) => (
          <div
            key={program.program_id}
            className="w-full bg-white rounded-lg shadow-md border"
          >
            <div className="p-4 flex gap-4">
              <div>
                <img
                  src={program.program_image}
                  alt={program.program_name}
                  className="w-20 h-20 rounded-[12px]"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-md font-semibold">
                  {program.program_name}
                </h3>
                <div className="flex gap-2 mt-2">
                  {program.program_type.map((type, index) => (
                    <span
                      key={index}
                      className="bg-orange-200 text-orange-800 px-[8px] rounded-[6px] text-[12px] py-1"
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
        ))
      ) : (
        <>{NoAvailablePrograms()}</>
      )}
    </div>
  );

  console.log("program,program", APPLIED_PROGRAMS);

  // console.log('initiaData?.physical_verification?.show_verification_button',initiaData?.ekyc_verification?.show_verification_button);
  const renderActiveProgram = () => (
    <>
      <div className="pt-[2px] w-full">
        {APPLIED_PROGRAMS.map((program) =>
          program.program_status === "active" ||
          program.program_status === "applied" ||
          program.program_status === "ineligible" ? (
            <div
              key={program.program_id}
              className="bg-white rounded-lg shadow-sm p-4 mb-6 mt-2 border"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex gap-2 items-center">
                  <h3 className="text-[18px] font-semibold programhead">
                    {program.program_name}
                  </h3>
                  <span
                    className={`px-4 py-1 ${
                      program.program_status === "applied"
                        ? "bg-[#fffed5]"
                        : program.program_status === "active"
                          ? "bg-[#D9FFD5]"
                          : program.program_status === "ineligible"
                            ? "bg-[#ffd5d5]"
                            : ""
                    } text-[#3B3B3B] px-[8px] rounded-[6px] text-[12px]`}
                  >
                    {program.program_status === "applied"
                      ? "Applied"
                      : program.program_status === "active"
                        ? "Active"
                        : program.program_status === "ineligible"
                          ? "Not Eligible"
                          : ""}
                  </span>
                </div>
                <div className="flex gap-2 items-center justify-center">
                  <button
                    onClick={() => handleViewHistory(program)}
                    className="text-white bg-primary py-[4px] px-[6px] rounded-[6px] text-[12px] font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
              <div className="space-y-[6px] text-gray-600">
                {/* <p className="">
                  UID - {initiaData?.patient_data?.patient_uid}
           
                </p> */}

              {initiaData?.program_data?.applied_programs?.find(
                    (p) => p?.patient_uid
                  ) && (
                    <p className="text-[#767676] text-[14px] font-open-sans font-bold">
                      UID -{" "}
                      {
                        initiaData.program_data.applied_programs.find(
                          (p) => p?.patient_uid
                        )?.patient_uid
                      }
                    </p>
                  )}       
                {program.program_status === "active" && (
                  <>
                    <p className="text-[#767676] text-[14px]">
                      Enrollment Date - {program.program_enrollmentDate}
                    </p>
                    <p className="text-[#767676] text-[14px]">
                      Schemes - {program.program_scheme}
                    </p>
                    <p className="text-[#767676] text-[14px]">
                      Doctor's Name - {program.doctor_name}
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div
              key={program.id}
              className="w-full bg-white rounded-lg shadow-md mt-4 border mb-6"
            >
              <div className="flex items-center gap-2 p-4">
                <h2 className="text-[18px] font-bold">
                  {program.program_name}
                </h2>
                <span
                  className={`px-4 py-1 ${
                    program.program_status === "shortfall"
                      ? "bg-yellow-100 text-yellow-900 "
                      : program.program_status === "suspend"
                        ? "bg-red-100 text-red-800"
                        : program.program_status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : ""
                    //  border-l-4 border-yellow-500
                  } text-[#3B3B3B]  px-[8px] rounded-[6px] text-[12px]`}
                >
                  {program.program_status === "shortfall"
                    ? "Document Shortfall"
                    : program.program_status === "suspend"
                      ? "Suspend"
                      : program.program_status === "rejected"
                        ? "Rejected"
                        : program.program_status === "applied"
                          ? "Profile under Review"
                          : ""}
                </span>
              </div>
              <div className="px-4 flex gap-4">
                <div className="2">
                  {initiaData?.program_data?.applied_programs?.find(
                    (p) => p?.patient_uid
                  ) && (
                    <p className="text-[#767676] text-[14px] font-sans font-bold">
                      UID -{" "}
                      {
                        initiaData.program_data.applied_programs.find(
                          (p) => p?.patient_uid
                        )?.patient_uid
                      }
                    </p>
                  )}

                  {/* need to update */}
                  {/* <p className="text-[#767676] text-[14px] font-open-sans">
                  FOC Orders - 01
                </p>
                <p className="text-[#767676] text-[14px] font-open-sans">
                Enrollment Date - {program.program_enrollmentDate}
                </p> */}
                  {/* <p className="text-[#767676] text-[14px]">Schemes - {program.program_scheme}</p>
                <p className="text-[#767676] text-[14px] font-open-sans">
                Doctor's Name - {program.doctor_name}
                </p> */}
                </div>
              </div>
              {program?.program_status === "shortfall" && (
                <div className="flex justify-center items-center p-4">
                  <div className="w-full bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-2 rounded-lg shadow-md flex items-center space-x-3">
                    <div className="w-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <p className="text-base font-medium  text-[14px]">
                      Please contact the PAP Team to get your documents updated.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>

      {(initiaData?.ekyc_verification?.show_verification_button ||
        initiaData?.physical_verification?.show_verification_button) && (
        <div className="w-full pb-20">
          <h2 className="text-lg font-semibold w-full mb-6">
            Value Added Services
          </h2>
          <div className="space-y-6 pb-30  mb-20">
          
            {/* defautl physical very card */}
            {initiaData?.physical_verification?.show_verification_button && (
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
                      Complete your physical verification by submitting
                      documents and booking an appointment.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handlePhysicalVerification}
                  className="w-full text-sm bg-primary text-white py-3 rounded-[6px] font-medium"
                >
                  START YOUR PHYSICAL VERIFICATION
                </button>
              </div>
            )}

            {initiaData?.physical_verification?.show_verification_button ===
              false &&
              (initiaData?.physical_verification?.details?.status === "Open" ? (
                <div className="bg-white rounded-lg shadow-sm border rounded-b-[20px]">
                  <div className="flex gap-4 items-center">
                    <div className="p-3 rounded-lg">
                      <PhysicalverificationSheduled width={70} />
                    </div>
                    <div>
                      <p className="text-[15px] font-sans font-semibold text-[#606060]">
                        Your{" "}
                        <span className="text-primary">
                          physical verification
                        </span>{" "}
                        has been <span className="text-primary">scheduled</span>
                        .
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center w-full text-[14px] italic bg-primary text-white py-1 gap-2 rounded-b-[20px] font-medium">
                    <span className="pl-4">
                      <Pap className="w-8 h-8" />
                    </span>
                    PAP Team will soon reach out for verification
                  </button>
                </div>
              ) : initiaData?.physical_verification?.details?.status ===
                "Verified" ? (
                <div className="bg-white rounded-lg shadow-sm border rounded-b-[20px]">
                  <div className="flex gap-4 items-center">
                    <div className="p-3 rounded-lg">
                      <PhysicalverificationSheduled width={70} />
                    </div>
                    <div>
                      <p className="text-[15px] font-sans font-semibold text-[#606060]">
                        Your{" "}
                        <span className="text-primary">
                          physical verification
                        </span>{" "}
                        is scheduled for
                        <span className="text-primary">
                          {" "}
                          {initiaData?.physical_verification?.details?.date}
                        </span>{" "}
                        at
                        <span className="text-primary">
                          {" "}
                          {initiaData?.physical_verification?.details?.time}
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center w-full text-[14px] italic bg-primary text-white py-1 gap-2 rounded-b-[20px] font-medium">
                    <span className="pl-2">
                      <Pap className="w-8 h-8" />
                    </span>
                    {initiaData?.physical_verification?.details?.phlebo_name}{" "}
                    will soon reach out for verification
                  </button>
                </div>
              ) : (
                <div></div> // Empty div if neither "open" nor "verified"
              ))}

            {initiaData?.ekyc_verification?.show_verification_button && (
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
                      Verify your identity digitally using Aadhaar and other
                      valid documents.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleEkyRequest}
                    className="w-full text-sm bg-primary text-white py-3 rounded-[6px] font-medium"
                  >
                    INITIATE YOUR EKYC VERIFICATION
                  </button>
                </div>
              </div>
            )}
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
