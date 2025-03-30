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




      // Dummy profile KYC history data
  const kycData = [
    {
      id: 1,
      date: '28 Mar 2025',
      document: 'Passport',
      status: 'Verified'
    },
    {
      id: 2,
      date: '15 Mar 2025',
      document: 'Address Proof',
      status: 'Pending'
    },
    {
      id: 3,
      date: '22 Feb 2025',
      document: 'Selfie',
      status: 'Verified'
    },
    {
      id: 4,
      date: '10 Feb 2025',
      document: 'Bank Statement',
      status: 'Rejected'
    },
    {
      id: 5,
      date: '05 Jan 2025',
      document: 'PAN Card',
      status: 'Verified'
    }
  ];

  // Function to get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Verified':
        return 'text-green-600';
      case 'Pending':
        return 'text-yellow-600';
      case 'Rejected':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };
  return (
    <div>
      <div>
        <h1 className="pb-2 font-open-sans text-[20px] font-semibold text-[#403939]">
          KYC History
        </h1>
        <div className="h-[4px] w-11 rounded-full bg-primary"></div>

        
        <div className="overflow-x-auto pt-8">
        <table className="min-w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {kycData.map((item) => (
              <tr key={item.id}>
                <td className="py-3 px-3 text-sm text-gray-500">{item.date}</td>
                <td className="py-3 px-3 text-sm font-medium text-gray-900">{item.document}</td>
                <td className={`py-3 px-3 text-sm font-medium ${getStatusColor(item.status)}`}>
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

    </div>
  );
}

export default KycHistory;







