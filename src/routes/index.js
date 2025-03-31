
// export default AppNavigation;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "../pages/Home";
import PatientDetailForm from "../pages/patient-detail-form";
import SuccessPage from "../components/SuccessPage";
import PfizerProgram from "../pages/PfizerProgramDashBoard/PfizerProgram";
import SchemeEnrollDocUpload from "../pages/PfizerProgramDashBoard/SchemeEnrollDocUpload";
import ProgramEnrollSucess from "../pages/PfizerProgramDashBoard/ProgramEnrollSucess";
// import PfizerProgramsPage from "../pages/uploadInvoice/UploadInvoiceDashboard";
import OrderHistory from "../pages/uploadInvoice/OrderHistory";
import UploadInvoiceModal from "../pages/uploadInvoice/UploadInvoiceModal";
import PhysicalVerificationModal from "../pages/physicalVerification/PhysicalVerificationModal";
import MenuScreen from "../pages/Menu/MenuScreen";
import Notifications from "../pages/Notification/Notifications";
import useApi from "../hooks/useApi";
import { selectCurrentPageState, selectCurrentView, selectInitializeData, selectDocUploadStatus, setInitializeData, setCurrentPageState, setProgramStatus } from "../slice/patient-detail-form";
import ProgramEnrollSuccessModal from "../pages/PfizerProgramDashBoard/ProgramEnrolllmentSuccessModal/ProgramEnrollSuccessModal";
import ShortFallDoc from "../pages/PfizerProgramDashBoard/ShortFallDoc";
import RequestFOCModal from "../pages/requestFOC/RequestFOCModal";
import PatientEnrollmentSuccessModal from "../pages/patient-detail-form/patientErollmentSuccess/PatientEnrollmentSuccessModal";
import FabButtonModal from "../pages/FabButton/FabButtonModal";
import ProfileModal from "../pages/Menu/Profile/ProfileModal";
import MoreProgramModal from "../pages/Menu/MorePrograms/MoreProgramModal";
import { ToastContainer } from 'react-toastify';
import EkyModal from "../pages/Ekyc/EkyModal";
import KycHistoryModal from "../pages/Menu/KycHistory/KycHistoryModal";
import CompleteKycModal from "../pages/Menu/completedKyc/CompleteKycModal";

const AppNavigation = () => {
// Token functionality
const TOKEN_KEY = "accessToken";

// Function to set a dummy token
// const setDummyToken = () => {
// localStorage.setItem(TOKEN_KEY, "ECrq33VrFHaaKqZm9KBo2EnQNFPko8");
// console.log("Token stored successfully!");
// };

// setDummyToken(); // Call this function once to set the token

  const logToReactNative = (message, data) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          message,
          data,
          timestamp: new Date().toISOString(),
        })
      );
    }
  };

  function checkToken() {
    try {
      const accessToken = localStorage.getItem(TOKEN_KEY);
      if (!accessToken) {
        logToReactNative("No token found", { action: "redirect_to_login" });
        return false;
      }
     
      return true;
    } catch (error) {
      logToReactNative("Token check error", { error: error.message });
      return false;
    }
  }

  // Component state
  const currentView = useSelector(selectCurrentView);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get data from Redux
  const dispatch = useDispatch();
  const initialData = useSelector(selectInitializeData);
  const current_page_state = useSelector(selectCurrentPageState);
  const doc_upload_status = useSelector(selectDocUploadStatus);
  const triggerApi = useApi();

  const current_role = localStorage.getItem('role');

  const makeApiCall = async () => {
    // Check token before making API call
    // if (!checkToken()) {
    //   console.log("No token found, redirecting to login.");
    //   // You might want to add a redirect logic here
    //   return;
    // }

    try {
      setIsLoading(true);
      const url = `/patient_dashboard/?current_step=initialize`;
      const { response, success } = await triggerApi({
        url: url,
        type: "GET",
        loader: true,
      });
  
      if (success && response) {
        dispatch(setInitializeData(response));
        dispatch(setCurrentPageState(response.current_step)); 
      } else {
        console.error("API call failed or returned no data.");
      }
    } catch (error) {
      console.error("Error in makeApiCall:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    makeApiCall();
  }, [currentView]);

  useEffect(() => {
    makeApiCall();
  }, []);

  // Render content based on current view and app state
  const renderContent = () => {
    if (currentView === "menu") {
      return <MenuScreen  />;
    } else if (currentView === "notifications") {
      return <Notifications  />;
    }
  
    if (current_page_state === 'patient_enrolment') {
      return <PatientDetailForm    />;
    }
    else if (current_page_state === 'caregiver_addition') {
      return <PatientDetailForm    />;
    }
    else if (current_page_state === 'program_enrolment') {
      switch (doc_upload_status) {
        case 'scheme_enroll_doc':
          return <SchemeEnrollDocUpload />;
        case 'short_fall_doc':
          return <ShortFallDoc />;
        default:
          return <PfizerProgram />;
      }
    }
    else if (current_page_state === 'program_enrolment_done') {
      switch (doc_upload_status) {
        case 'scheme_enroll_doc':
          return <SchemeEnrollDocUpload />;
        case 'short_fall_doc':
          return <ShortFallDoc />;
        default:
          return <PfizerProgram />;
      }
    }
  };

  // Loading state
  if (isLoading || initialData.data) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white p-6 pt-11">
        <div className="flex-col justify-center">
        <div className="overlay-spinner" />
        </div>
      </div>
    );
  }

  // Determine if footer should be hidden
  const hideFooter =  current_page_state === 'program_enrolment' && doc_upload_status === 'scheme_enroll_doc' || 
                     current_page_state === 'patient_enrolment';
                    
  // Return the Home layout with the content
  return (
    <Home 
      hideFooter={hideFooter} 
    >
        <ToastContainer />
      {renderContent()}
      <ProgramEnrollSuccessModal/>
      <PatientEnrollmentSuccessModal/>
      <UploadInvoiceModal/>
      <RequestFOCModal/>
      <PhysicalVerificationModal/> 
      <FabButtonModal/>
      <ProfileModal/>
      <MoreProgramModal/>
      <EkyModal/>
      <KycHistoryModal/>
      <CompleteKycModal/>
    </Home>
  );
};

export default AppNavigation;