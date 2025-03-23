import React, { useState } from "react";
import { ReactComponent as AvatarFemale } from "../../../../src/assets/images/Ekyc/female_avatar.svg";
import { ReactComponent as AvatarMale } from "../../../../src/assets/images/Ekyc/male_avatar.svg";

import { ReactComponent as NotApprove } from "../../../../src/assets/images/Ekyc/notApprove.svg";
import { ReactComponent as Approved } from "../../../../src/assets/images/Ekyc/Approve.svg";
import { useSelector } from "react-redux";
import { selectInitializeData } from "../../../slice/patient-detail-form";
function KycHistory() {


    const patient_profile_data = useSelector(selectInitializeData);
    // console.log('patient_profile_data', patient_profile_data.patient_data);
    // console.log('ekyc_verification', patient_profile_data.ekyc_verification.status
    // );

    const eky_status = patient_profile_data?.ekyc_verification?.status;
  return (
    <div>
      <div>
        <h1 className="pb-2 font-open-sans text-[20px] font-semibold text-[#403939]">
          KYC History
        </h1>
        <div className="h-[4px] w-11 rounded-full bg-primary"></div>

        <div className="flex flex-col items-center w-full max-w-md mx-auto">
          {/* Header curved section */}
          <div className=" w-full">
            <div className=""></div>

            {/* Profile circle */}
            <div className=" w-full flex justify-center items-center py-2 mt-8">
            {patient_profile_data?.patient_data?.patient_gender === 'Female' ?   <AvatarFemale /> : <AvatarMale /> }
            
            </div>
          </div>

          {/* Status section */}
          <div className="flex items-center mb-4">
            <span className=" font-sans font-semibold ">Status : </span>
            
            {
              eky_status == 'Active' ?  <><span className="text-[#34ab36] font-semibold mr-1 ml-1 ">
              Approved
              </span>  <Approved/> </>:<> <span className="text-[#AB3436] font-semibold mr-1 ml-1 ">
              Not Approved
            </span> <NotApprove /></>
            }
            
            
         

           
          </div>

          {/* User details card */}
          <div className={`w-full ${eky_status == "Active" ? ' bg-[#F1FFFC]':'bg-[#FFF5F5]' }  rounded-[24px] p-4`}>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <span className="w-32 font-sans text-sm mr-2 ">Name :</span>
                <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                 {patient_profile_data?.patient_data?.patient_name}
                </span>
              </div>
              <div>
                <span className="w-32 font-sans text-sm mr-2">Gender :</span>
                <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                  {patient_profile_data?.patient_data?.patient_gender}
                </span>
              </div>
              <div>
                <span className="w-32 font-sans text-sm mr-2">
                  Date of Birth :
                </span>
                <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                {patient_profile_data?.patient_data?.patient_dob}
                </span>
              </div>
              <div>
                <span className="w-32 font-sans text-sm mr-2">
                  Mobile Number :
                </span>
                <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                {patient_profile_data?.patient_data?.patient_primary_phone}
                </span>
              </div>
              <div>
                <span className="w-32 font-sans text-sm mr-2">Email ID :</span>
                <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                {patient_profile_data?.patient_data?.patient_email}
                </span>
              </div>
              <div>
                <span className="w-32 font-sans text-sm mr-2">Address :</span>
                <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                {patient_profile_data?.patient_data?.addresses[0].line1}
                </span>
              </div>
              <div>
                <span className="w-32 font-sans text-sm mr-2">City :</span>
                <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                {patient_profile_data?.patient_data?.addresses[0].city}
                </span>
              </div>
              <div>
                <span className="w-32 font-sans text-sm mr-2">State :</span>
                <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                {patient_profile_data?.patient_data?.addresses[0].state}
                </span>
              </div>
              <div>
                <span className="w-32 font-sans text-sm mr-2">PIN Code :</span>
                <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                {patient_profile_data?.patient_data?.addresses[0].pincode}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="space-y-4 mt-8">
        {programsData.map((program) => (
          <div
            key={program.id}
            onClick={() => handleProgramClick(program.id)}
            className={`
              flex items-center rounded-lg overflow-hidden cursor-pointer 
              transition-all duration-200 
              ${selectedProgram === program.id 
                ? "bg-primary" 
                : "bg-[#F6F6FF]"}
              hover:shadow-md
            `}
          >
            <div className="w-24 h-24 flex-shrink-0">
              {program.image}
            </div>
            <div className="p-2 ps-8 flex-grow pl-12">
              <h3
                className={`
                  font-bold font-inter 
                  ${selectedProgram === program.id 
                    ? "text-white" 
                    : "text-[#474747]"}
                `}
              >
                {program.title}
              </h3>
              <p
                className={`
                  text-[12px] font-inter font-regular mt-2
                  ${selectedProgram === program.id 
                    ? "text-white " 
                    : "text-[#5B5B5B]"}
                `}
              >
                {program.description}
              </p>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default KycHistory;
