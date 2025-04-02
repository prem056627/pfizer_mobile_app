import React, { useState } from "react";
import { ReactComponent as AvatarFemale } from "../../../../src/assets/images/Ekyc/female_avatar.svg";
import { ReactComponent as AvatarMale } from "../../../../src/assets/images/Ekyc/male_avatar.svg";

import { ReactComponent as NotApprove } from "../../../../src/assets/images/Ekyc/notApprove.svg";
import { ReactComponent as Approved } from "../../../../src/assets/images/Ekyc/Approve.svg";
import { useSelector } from "react-redux";
import { selectInitializeData } from "../../../slice/patient-detail-form";

function CompleteKyc() {
      const patient_profile_data = useSelector(selectInitializeData);
        // console.log('patient_profile_data', patient_profile_data.patient_data);
        console.log('ekyc_verification', patient_profile_data?.ekyc_verification?.details
        );
    
        const eky_status = patient_profile_data?.ekyc_verification?.status;

        const details = patient_profile_data?.ekyc_verification?.details;

  return (
      <div>
          <h1 className="pb-2 font-open-sans text-[20px] font-semibold text-[#403939]">
            Completed KYC 
          </h1>
          <div className="h-[4px] w-11 rounded-full bg-primary"></div>
  
          <div className="flex flex-col items-center w-full max-w-md mx-auto">
            {/* Header curved section */}
            <div className=" w-full">
              <div className=""></div>
  
              {/* Profile circle */}
              <div className="w-full flex justify-center items-center py-2 mt-8">
              {patient_profile_data?.patient_data?.patient_gender === "Male" ? (
                <AvatarMale />
              ) : (
                <AvatarFemale />
              )}
            </div>

            </div>
  
            {/* Status section */}
            <div className="flex items-center mb-4">
              <span className=" font-sans font-semibold ">Status : </span>
              
              {
                eky_status === 'Approved' ?  <><span className="text-[#34ab36] font-semibold mr-1 ml-1 ">
                Approved
                </span>  <Approved/> </>:<> <span className="text-[#AB3436] font-semibold mr-1 ml-1 ">
                Not Approved
              </span> <NotApprove /></>
              }
            </div>
  
            {/* User details card */}
            <div className={`w-full ${eky_status === "Approved" ? ' bg-[#F1FFFC]':'bg-[#FFF5F5]' }  rounded-[24px] p-4`}>
              <div className="grid grid-cols-1 gap-2">
               
              {details && Object.keys(details).length > 0 ? (
                  <>
                    {/* KYC Details from details object */}
                    <div>
                      <span className="w-32 font-sans text-sm mr-2">Order ID :</span>
                      <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                        {details?.order_id || '-'}
                      </span>
                    </div>
                    <div>
                      <span className="w-32 font-sans text-sm mr-2">Submitted Date :</span>
                      <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                        {details?.submitted_date || '-'}
                      </span>
                    </div>
                    <div>
                      <span className="w-32 font-sans text-sm mr-2">Approval Date :</span>
                      <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                        {details?.approval_date || '-'}
                      </span>
                    </div>
                    <div>
                      <span className="w-32 font-sans text-sm mr-2">Selfie-PAN Match :</span>
                      <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                        {details?.selfie_pan_match ? `${details.selfie_pan_match}%` : '-'}
                      </span>
                    </div>
                    <div>
                      <span className="w-32 font-sans text-sm mr-2">Selfie-Aadhar Match :</span>
                      <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                        {details?.selfie_aadhar_match ? `${details.selfie_aadhar_match}%` : '-'}
                      </span>
                    </div>
                    <div>
                      <span className="w-32 font-sans text-sm mr-2">PAN-Aadhar Match :</span>
                      <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                        {details?.pan_aadhar_match ? `${details.pan_aadhar_match}%` : '-'}
                      </span>
                    </div>
                    <div>
                      <span className="w-32 font-sans text-sm mr-2">KYC Type :</span>
                      <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                        {details?.type || '-'}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <span className="font-sans font-medium text-[16px] text-gray-600">
                      No available details !
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
  )
}

export default CompleteKyc