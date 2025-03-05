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

const AppNavigation = () => {
  // Component state

  const currentView = useSelector(selectCurrentView) ;


  // const [currentView, setCurrentView] = useState("menu");
  const [isLoading, setIsLoading] = useState(true);
  
  // Get data from Redux
  const dispatch = useDispatch();
  const initialData = useSelector(selectInitializeData);
  const current_page_state = useSelector(selectCurrentPageState);
  const   doc_upload_status = useSelector(selectDocUploadStatus);
  const triggerApi = useApi();

  console.log('initalizeeeeeee!!!',current_page_state)
  console.log('doc_upload_status!!!',doc_upload_status)
  // Get role from localStorage
  const current_role = localStorage.getItem('role');

  // Initialize data
  const makeApiCall = async () => {
    try {
      setIsLoading(true);
  
      const { response, success } = await triggerApi({
        url: `/patient-initialize/`,
        type: "GET",
        loader: true,
      });
  
      if (success && response) {
        dispatch(setInitializeData(response));
        dispatch(setCurrentPageState(response.current_page_state)); // Uncomment if needed
        dispatch(setProgramStatus(response.program_status)); // Uncomment if needed
      } else {
        console.error("API call failed or returned no data.");
      }
    } catch (error) {
      console.error("Error in makeApiCall:", error);
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
  };
  

  useEffect(() => {
    makeApiCall();
  }, []);



  // Render content based on current view and app state
  const renderContent = () => {
    // console.log('Rendering content for view:', currentView, 'State:', current_page_state);
    
    // First check the view state for UI navigation
    if (currentView === "menu") {
      return <MenuScreen  />;
    } else if (currentView === "notifications") {
      return <Notifications  />;
    }
    
    // Then check app state for workflow navigation
    if (current_role === 'Home') {
      // return <PfizerProgramsPage    />;
    } else if (current_page_state === 'enrollment_not_complete') {
      return <PatientDetailForm    />;
    }else if (current_page_state === 'program_dashboard') {
      switch ( doc_upload_status) {
        case 'scheme_enroll_doc':
          return <SchemeEnrollDocUpload />;
        case 'short_fall_doc':
          return <ShortFallDoc />;
        default:
          return <PfizerProgram />;
      }
    }
     else if (current_page_state === 'remote_verification_pending' || 
              current_page_state === 'physical_verification_pending') {
      return <PhysicalVerificationModal    />;
    } else {
      // Default fallback - redirect to enrolment
      // return <PatientDetailForm    />;
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
  const hideFooter = current_page_state === 'program_unactive' &&   doc_upload_status !== 'scheme_enroll_doc' || 
                     current_page_state === 'enrollment_not_complete';

  // console.log('Rendering Home with hideFooter:', hideFooter);
                    
  // Return the Home layout with the content
  return (
    <Home 
      hideFooter={hideFooter} 
    >
        <ToastContainer />  {/* Add this line */}
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
    </Home>
  );
};

export default AppNavigation;