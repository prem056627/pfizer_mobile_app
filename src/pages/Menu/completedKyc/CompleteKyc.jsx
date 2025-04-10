
import React, { useContext, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectInitializeData, setCurrentPageState, setInitializeData } from "../../../slice/patient-detail-form";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { ReactComponent as NoProgram } from "../../../assets/images/ProgramCards/no_program.svg";
import useApi from "../../../hooks/useApi";
import { LoaderContext } from "../../../context/LoaderContextProvider";

function CompleteKyc() {
  const initialization_data = useSelector(selectInitializeData);
  const isApiCallInProgress = useRef(false);
  // Module-level variable that persists across all renders
// This will maintain state even with StrictMode's double invocation
let hasApiBeenCalled = false;

  // KYC history data from API
  const kycData = initialization_data?.verification_history;

  const triggerApi = useApi();
  const dispatch = useDispatch();
  const { setLoading, isLoading } = useContext(LoaderContext);

  const makeApiCall_1 = async () => {
    // First check module-level flag
    if (hasApiBeenCalled) {
      console.log("API has already been called previously. Skipping.");
      return;
    }
    
    // Then check component-level ref
    if (isApiCallInProgress.current) {
      console.log("API call already in progress. Skipping.");
      return;
    }
    
    try {
      console.log("Starting API call");
      isApiCallInProgress.current = true;
      setLoading(true);
      
      const url = `/patient_dashboard/?current_step=verification_history`;
      const { response, success } = await triggerApi({
        url: url,
        type: "GET",
        loader: true,
      });
  
      if (success && response) {
        dispatch(setInitializeData(response));
        dispatch(setCurrentPageState(response.current_step)); 
        
        // Set the module-level flag to true after successful call
        hasApiBeenCalled = true;
      } else {
        console.error("API call failed or returned no data.");
      }
    } catch (error) {
      console.error("Error in makeApiCall:", error);
    } finally {
      isApiCallInProgress.current = false;
      setLoading(false);
    }
  };

  // This will make sure we only call the API once, even in StrictMode  
  useEffect(() => {
    // Only attempt the API call if it hasn't been called yet at the module level
    if (!hasApiBeenCalled) {
      makeApiCall_1();
    }
  }, []);

  function NoAvailablePrograms() {
    return (
      <div className="flex flex-col items-center justify-center h-96 p-6">
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full">
          <NoProgram/>
        </div>
        <h2 className="mt-4 text-2xl text-center font-semibold text-gray-700">No Verification History data available</h2>
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
           {NoAvailablePrograms()}
          </>
        )}
        
        {/* Desktop view - visible on medium screens and up */}
        {hasData && (
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider rounded-tl-lg">Physical Verification ID</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Verification Requested at</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Verification Completed At</th>
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
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm font-semibold text-gray-800">Physical Verification ID: {item?.order_id || 'N/A'}</div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white ${statusInfo.color} border ${statusInfo.borderColor}`}>
                      {statusInfo.icon}
                      <span className="ml-1 my-1">{item?.status || 'Unknown'}</span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="font-medium mr-1 w-34">Verification Requested at:</span>
                      {item?.create_at || 'N/A'}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="font-medium mr-1 w-34">Verification Completed At:</span>
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