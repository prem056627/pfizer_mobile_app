// import React, { useState } from "react";
// import { ReactComponent as AvatarFemale } from "../../../../src/assets/images/Ekyc/female_avatar.svg";
// import { ReactComponent as AvatarMale } from "../../../../src/assets/images/Ekyc/male_avatar.svg";

// import { ReactComponent as NotApprove } from "../../../../src/assets/images/Ekyc/notApprove.svg";
// import { ReactComponent as Approved } from "../../../../src/assets/images/Ekyc/Approve.svg";
// import { useSelector } from "react-redux";
// import { selectInitializeData } from "../../../slice/patient-detail-form";

// function CompleteKyc() {
//       const patient_profile_data = useSelector(selectInitializeData);
//         // console.log('patient_profile_data', patient_profile_data.patient_data);
//         console.log('ekyc_verification', patient_profile_data?.ekyc_verification?.details
//         );
    
//         const eky_status = patient_profile_data?.ekyc_verification?.status;

//         const details = patient_profile_data?.ekyc_verification?.details;

//   return (
//       <div>
//           <h1 className="pb-2 font-open-sans text-[20px] font-semibold text-[#403939]">
//           Verification History
//           </h1>
//           <div className="h-[4px] w-11 rounded-full bg-primary"></div>
  
//           <div className="flex flex-col items-center w-full max-w-md mx-auto">
//             {/* Header curved section */}
//             <div className=" w-full">
//               <div className=""></div>
  
//               {/* Profile circle */}
//               <div className="w-full flex justify-center items-center py-2 mt-8">
//               {patient_profile_data?.patient_data?.patient_gender === "Male" ? (
//                 <AvatarMale />
//               ) : (
//                 <AvatarFemale />
//               )}
//             </div>

//             </div>
  
//             {/* Status section */}
//             <div className="flex items-center mb-4">
//               <span className=" font-sans font-semibold ">Status : </span>
              
//               {
//                 eky_status === 'Approved' ?  <><span className="text-[#34ab36] font-semibold mr-1 ml-1 ">
//                 Approved
//                 </span>  <Approved/> </>:<> <span className="text-[#AB3436] font-semibold mr-1 ml-1 ">
//                 Not Approved
//               </span> <NotApprove /></>
//               }
//             </div>
  
//             {/* User details card */}
//             <div className={`w-full ${eky_status === "Approved" ? ' bg-[#F1FFFC]':'bg-[#FFF5F5]' }  rounded-[24px] p-4`}>
//               <div className="grid grid-cols-1 gap-2">
               
//               {details && Object.keys(details).length > 0 ? (
//                   <>
//                     {/* KYC Details from details object */}
//                     <div>
//                       <span className="w-32 font-sans text-sm mr-2">Order ID :</span>
//                       <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
//                         {details?.order_id || '-'}
//                       </span>
//                     </div>
//                     <div>
//                       <span className="w-32 font-sans text-sm mr-2">Submitted Date :</span>
//                       <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
//                         {details?.submitted_date || '-'}
//                       </span>
//                     </div>
//                     <div>
//                       <span className="w-32 font-sans text-sm mr-2">Approval Date :</span>
//                       <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
//                         {details?.approval_date || '-'}
//                       </span>
//                     </div>
//                     <div>
//                       <span className="w-32 font-sans text-sm mr-2">Selfie-PAN Match :</span>
//                       <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
//                         {details?.selfie_pan_match ? `${details.selfie_pan_match}%` : '-'}
//                       </span>
//                     </div>
//                     <div>
//                       <span className="w-32 font-sans text-sm mr-2">Selfie-Aadhar Match :</span>
//                       <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
//                         {details?.selfie_aadhar_match ? `${details.selfie_aadhar_match}%` : '-'}
//                       </span>
//                     </div>
//                     <div>
//                       <span className="w-32 font-sans text-sm mr-2">PAN-Aadhar Match :</span>
//                       <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
//                         {details?.pan_aadhar_match ? `${details.pan_aadhar_match}%` : '-'}
//                       </span>
//                     </div>
//                     <div>
//                       <span className="w-32 font-sans text-sm mr-2">KYC Type :</span>
//                       <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
//                         {details?.type || '-'}
//                       </span>
//                     </div>
//                   </>
//                 ) : (
//                   <div className="text-center py-4">
//                     <span className="font-sans font-medium text-[16px] text-gray-600">
//                       No available details !
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//   )
// }

// export default CompleteKyc


import React from "react";
import { useSelector } from "react-redux";
import { selectInitializeData } from "../../../slice/patient-detail-form";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { ReactComponent as NoProgram } from "../../../assets/images/ProgramCards/no_program.svg";
function CompleteKyc() {
  const initialization_data = useSelector(selectInitializeData);
  // ekyc_history
  console.log('initialization_data',initialization_data?.verification_history);
  // const eky_status = patient_profile_data?.ekyc_verification?.status;

  // KYC history data from API
  const kycData = initialization_data?.verification_history;




  function NoAvailablePrograms() {
    return (
      <div className="flex flex-col items-center justify-center h-96   p-6">
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full ">
          {/* <span className="text-6xl text-purple-300">😞</span>
          <span className="absolute top-0 right-2 text-4xl text-purple-300">!</span> */}
            <NoProgram/>
        </div>
        <h2 className="mt-4 text-2xl text-center font-semibold text-gray-700"> No Verification History data available</h2>
        <p className="mt-2 text-center text-gray-500">"We'll notify you when something arrives!"</p>
      </div>
    );
  }



  // Function to get status styling and icon with safe access
  const getStatusInfo = (status) => {
    const safeStatus = (status || "").toLowerCase();
  
    switch (safeStatus) {
      case 'approved':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: <CheckCircle className="w-4 h-4 text-green-600" />,
        };
      case 'open':
        return {
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          icon: <AlertCircle className="w-4 h-4 text-blue-600" />,
        };
      case 'confirmed':
        return {
          color: 'text-indigo-600',
          bgColor: 'bg-indigo-50',
          borderColor: 'border-indigo-200',
          icon: <CheckCircle className="w-4 h-4 text-indigo-600" />,
        };
      case 'verification completed':
        return {
          color: 'text-teal-600',
          bgColor: 'bg-teal-50',
          borderColor: 'border-teal-200',
          icon: <CheckCircle className="w-4 h-4 text-teal-600" />,
        };
      case 'on hold':
        return {
          color: 'text-amber-600',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          icon: <Clock className="w-4 h-4 text-amber-600" />,
        };
      case 'closed':
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: <XCircle className="w-4 h-4 text-gray-600" />,
        };
      case 'cancelled':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: <XCircle className="w-4 h-4 text-red-600" />,
        };
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: <AlertCircle className="w-4 h-4 text-gray-600" />,
        };
    }
  };
  

  // Safe data check
  const safeKycData = Array.isArray(kycData) ? kycData : [];

  // Check if there's data to display
  const hasData = safeKycData.length > 0;

  return (
    <div className="bg-white rounded-lg">
      <div>
        <div className="flex flex-col items-start gap-4 mb-6">
          <h1 className="font-open-sans text-xl font-semibold text-gray-800">
          Verification History
          </h1>
          <div className="h-1 w-11 rounded-full bg-primary"></div>
        </div>
        
        {/* Show message if no data */}
        {!hasData && (
          <>
         { NoAvailablePrograms()}
          </>
        )}
        
        {/* Desktop view - visible on medium screens and up */}
        {hasData && (
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider rounded-tl-lg">Order ID</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Created Date</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Modified Date</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {safeKycData.map((item, index) => {
                  const statusInfo = getStatusInfo(item?.status);
                  return (
                    <tr key={item?.order_id || index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="py-4 px-4 text-sm font-medium text-gray-800">{item?.order_id || 'N/A'}</td>
                      <td className="py-4 px-4 text-sm text-gray-500">{item?.create_at || 'N/A'}</td>
                      <td className="py-4 px-4 text-sm text-gray-500">{item?.modified_at || 'N/A'}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                          {statusInfo.icon}
                          <span className="ml-1.5">{item?.status || 'Unknown'}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Mobile view - visible on small screens only */}
        {hasData && (
          <div className="md:hidden space-y-4">
            {safeKycData.map((item, index) => {
              const statusInfo = getStatusInfo(item?.status);
              return (
                <div 
                  key={item?.order_id || index} 
                  className={`rounded-lg p-4 border ${statusInfo.borderColor} ${statusInfo.bgColor} shadow-sm`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-sm font-semibold text-gray-800">Order ID: {item?.order_id || 'N/A'}</div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white ${statusInfo.color} border ${statusInfo.borderColor}`}>
                      {statusInfo.icon}
                      <span className="ml-1 my-1">{item?.status || 'Unknown'}</span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="font-medium mr-1 w-24">Created Date:</span>
                      {item?.create_at || 'N/A'}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="font-medium mr-1 w-24">Modified Date:</span>
                      {item?.modified_at || 'N/A'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CompleteKyc;