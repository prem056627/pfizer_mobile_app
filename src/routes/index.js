
// export default AppNavigation;

import React, { useContext, useEffect, useState } from "react";
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
import { selectCurrentPageState, selectCurrentView, selectInitializeData, selectDocUploadStatus, setInitializeData, setCurrentPageState, setProgramStatus, selectIsInitalDataLoad, setIsInitalDataLoad, setIsProgramEnrollDocDuplicateFound, setProgramEnrollmentSuccess } from "../slice/patient-detail-form";
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
import AddCaregiverModal from "../pages/Menu/Profile/addCaregiver/AddCaregiverModal";
import CaregiverConcentModal from "../pages/patient-detail-form/caregiverConcent/CaregiverConcentModal";
import CareTakerPrivacyModal from "../pages/patient-detail-form/caregiverConcent/CareTakerPrivacy/CareTakerPrivacyModal";
import { LoaderContext } from "../context/LoaderContextProvider";
import PatientConsentModal from "../pages/PfizerProgramDashBoard/ProgramConsent/PatientConsentModal";
import DemoAdharModal from "../pages/PfizerProgramDashBoard/MaskedAdharModal";
import ProgramEnrollDocDuplicateFoundModal from "../pages/PfizerProgramDashBoard/ProgramEnrollDocDuplicateFound/ProgramEnrollDocDuplicateFoundModal";

const AppNavigation = () => {
// Token functionality
 // Token check variables
//  const TOKEN_CHECK_INTERVAL = 10; // Check every 1 second (can adjust as needed)
//  const TOKEN_KEY = "accessToken";


// Function to set a dummy token
// const setDummyToken = () => {
// localStorage.setItem(TOKEN_KEY, "ECrq33VrFHaaKqZm9KBo2EnQNFPko8");
// console.log("Token stored successfully!");
// };
  const currentPageState = useSelector(selectCurrentPageState);


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


  function handleSessionLogout() {
    // console.log("session logout !!!");
    localStorage.clear();

    let message = {
        label: 'LOGOUT',
    };

    let stringifiedMessage = JSON.stringify(message);

    // Check if running inside a WebView
    if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(stringifiedMessage);
    } else {
        // console.log("Logging out from web...");
        window.location.href = '/logout'; // Ensure the URL is correct for your logout endpoint
    }
}

  // function checkToken() {
  //   try {
  //     const accessToken = localStorage.getItem(TOKEN_KEY);
  //     if (!accessToken) {
  //       logToReactNative("No token found", { action: "redirect_to_login" });
  //       handleSessionLogout() ;
  //       return false;
  //     }
     
  //     return true;
  //   } catch (error) {
  //     logToReactNative("Token check error", { error: error.message });
  //     return false;
  //   }
  // }

  // function checkToken() {
  //   try {
  //     const accessToken = localStorage.getItem(TOKEN_KEY);
      
  //     if (!accessToken) {
  //       logToReactNative("No token found", { action: "redirect_to_login" });
  //       handleSessionLogout();
  //       return false;
  //     }
      
  //     logToReactNative("Token detected", { accessToken: accessToken.substring(0, 5) + '...' });
  //     return true;
  //   } catch (error) {
  //     logToReactNative("Error checking token", { error: error.message });
  //     handleSessionLogout();
  //     return false;
  //   }
  // }

  // Component state
  const currentView = useSelector(selectCurrentView);
  

  const isInitalDataLoad = useSelector(selectIsInitalDataLoad)
  const { setLoading,isLoading } = useContext(LoaderContext);
  
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
      setLoading(true);
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
      setLoading(false);
    }
  };


   

//   useEffect(() => {


//     if (isInitalDataLoad || currentView === 'home' ) { // Example condition

//       // console.log("2",isInitalDataLoad);
//         makeApiCall();
//     }
// }, [isInitalDataLoad , currentView]);

//   useEffect(() => {
//     makeApiCall();
//   }, []);
// console.log('isInitalDataLoad',isInitalDataLoad)
useEffect(() => {
  if (isInitalDataLoad) {
    // console.log('isInitalDataLoad',isInitalDataLoad)
    makeApiCall();
  } else if (currentView === 'home') {
    makeApiCall();
  }
}, [isInitalDataLoad, currentView]);



// Handle profile suspenmded


// current_step: "program_enrolment_done",




if(initialData?.current_step === "program_enrolment_done" || initialData?.current_step === "program_enrolment"){
  if (initialData?.patient_status === "Inactive") {
    dispatch(setIsProgramEnrollDocDuplicateFound({ showModal: true, status: "inactive" }));
  } else {
    dispatch(setIsProgramEnrollDocDuplicateFound({ showModal: false }));
  }
}




// Handle program Applied status 


const appliedPrograms = initialData?.program_data?.applied_programs;

// Check if any program has a status of 'active'
const isActiveProgram = appliedPrograms?.some(program => program?.program_status === "active");





useEffect(() => {


if(initialData?.current_step === "program_enrolment_done"){
 const hasAppliedPrograms = Array.isArray(appliedPrograms) && appliedPrograms.length > 0;
//  console.log('hasAppliedPrograms',hasAppliedPrograms);
//   console.log('isActiveProgram',isActiveProgram);
  if (hasAppliedPrograms && !isActiveProgram) {

    // Slight delay to ensure modal renders before we close it
      dispatch(setProgramEnrollmentSuccess(true));
  
  }
  }
 
}, [isActiveProgram]);



  // useEffect(() => {
  //   // When the page state changes to program_enrolment (dashboard), fetch data
  //   if (currentPageState === 'program_enrolment') {
     
  //   }
  // }, [currentPageState]);



  // useEffect(() => {
  //   let intervalId;
  //   let isMounted = true;

  //   const initializeApp = async () => {
  //     if (checkToken()) {
  //       clearInterval(intervalId);
  //       if (isMounted) {
  //         await makeApiCall();
  //       }
  //     }
  //   };

  //   // Start polling for token
  //   intervalId = setInterval(initializeApp, TOKEN_CHECK_INTERVAL);

  //   // Initial check
  //   initializeApp();

  //   return () => {
  //     isMounted = false;
  //     clearInterval(intervalId);
  //   };
  // }, []);

  // // Additional effect to respond to view changes
  // useEffect(() => {
  //   if (checkToken()) {
  //     makeApiCall();
  //   }
  // }, [currentView]);

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

  // console.log("initialData!!!",initialData.data)

  // Loading state
  // if (isLoading) {
  //   return (
  //     <div className="flex h-full w-full items-center justify-center bg-white p-6 pt-11">
  //       <div className="flex-col justify-center">
  //       <div className="overlay-spinner" />
  //       </div>
  //     </div>
  //   );
  // }

  // Determine if footer should be hidden
  const hideFooter =  current_page_state === 'program_enrolment' && doc_upload_status === 'scheme_enroll_doc' || 
                     current_page_state === 'patient_enrolment' ||  current_page_state === '' ;
              
                     const hideLogo =  current_page_state === '' ;
  // Return the Home layout with the content
  return (
    <Home 
      hideFooter={hideFooter} 
      hideLogo = {hideLogo}
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
      <AddCaregiverModal/>
      <CaregiverConcentModal/>
      <CareTakerPrivacyModal/>
      <PatientConsentModal />
      <DemoAdharModal/>
      <ProgramEnrollDocDuplicateFoundModal/>
    </Home>
  );
};

export default AppNavigation;