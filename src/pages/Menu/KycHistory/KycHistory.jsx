import React from "react";
import { useSelector } from "react-redux";
import { selectInitializeData } from "../../../slice/patient-detail-form";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { ReactComponent as NoProgram } from "../../../assets/images/ProgramCards/no_program.svg";
function KycHistory() {
  const initialization_data = useSelector(selectInitializeData);
  // ekyc_history
  console.log('initialization_data',initialization_data?.ekyc_history);
  // const eky_status = patient_profile_data?.ekyc_verification?.status;

  // KYC history data from API
  const kycData = initialization_data?.ekyc_history;




  function NoAvailablePrograms() {
    return (
      <div className="flex flex-col items-center justify-center h-96   p-6">
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full ">
          {/* <span className="text-6xl text-purple-300">😞</span>
          <span className="absolute top-0 right-2 text-4xl text-purple-300">!</span> */}
            <NoProgram/>
        </div>
        <h2 className="mt-4 text-2xl text-center font-semibold text-gray-700"> No KYC history data available</h2>
        <p className="mt-2 text-center text-gray-500">"We'll notify you when something arrives!"</p>
      </div>
    );
  }



  // Function to get status styling and icon with safe access
  const getStatusInfo = (status) => {
    const safeStatus = (status || "").toLowerCase();
    
    switch(safeStatus) {
      case 'approved':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: <CheckCircle className="w-4 h-4 text-green-600" />
        };
      case 'open':
        return {
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          icon: <AlertCircle className="w-4 h-4 text-blue-600" />
        };
      case 'on hold':
        return {
          color: 'text-amber-600',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          icon: <Clock className="w-4 h-4 text-amber-600" />
        };
      case 'cancelled':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: <XCircle className="w-4 h-4 text-red-600" />
        };
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: <AlertCircle className="w-4 h-4 text-gray-600" />
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
            KYC History
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

export default KycHistory;