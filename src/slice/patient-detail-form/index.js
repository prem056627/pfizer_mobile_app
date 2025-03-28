import { createSlice } from "@reduxjs/toolkit";

// const currentStep = window.localStorage.getItem("formData")?.currentStep
//   ? JSON.parse(window.localStorage.getItem("formData"))?.currentStep
//   : 1;

export const ProgramEnrollmentSlice = createSlice({
  name: "patient-detail-form",
  initialState: {
    initializeData: {
      // data: {
      //   enrollment_details: {
      //     step_data: {},
      //   },
      // },
    },
    // current_page_state: 'enrollment_not_complete',
    current_page_state: "patient_enrolment",
    // program_status: 'un_active', // program status
    // program_status: "active", // program status
    program_name :'Opdyta',
    program_status: 'active', // program status
    // program_status: 'profile_under_review', // program status
    // Programs Enroll dashboard
    program_enroll_consent: {
      program: null,
      consent: false
    },
    
    program_enrollment_success: false,
    patient_enrollemnt_success: false,
    current_view: "Home",
    // currentStep: 'caregiver_addition',

    /////////// upload_file render flags
    doc_upload_status: "",
    // doc_upload_status : 'scheme_enroll_doc',
    // doc_upload_status : 'short_fall_doc'

    selectedProgram: null, // new property to store selected program
    selectedEnrollProgram:null,
    viewingOrderHistory: false, // to toggle between program list and order history view
    upload_invoice_modal_open: false,
    request_foc_modal_open: false,
    physical_verification_modal_open: false,
    isFabButtonOpen:false,
    isProfilePageOpen:false,
    isMoreProgramPageOpen:false,
    isEkySuccessModalOpen:false,
    isKycHistoryModalOpen:false,
  },
  reducers: {
    changeStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setPatientDetails: (state, action) => {
      state.patientDetails = action.payload;
    },
    setInitializeData: (state, action) => {
      state.initializeData = { ...action.payload };

      // Map API response to state
      // const enrollmentDetails = action.payload?.response?.enrollment_details || {};
      // state.currentStep = enrollmentDetails?.current_step || 1;
      // state.current_page_state = action.payload?.response?.current_page_state ;
      // state.program_status = action.payload?.response?.program_status ;
    },
    setCurrentPageState: (state, action) => {
      state.current_page_state = action.payload;
    },
    setProgramEnrollmentConsent: (state, action) => {
      state.program_enroll_consent = action.payload;
    },
    
    setDocUploadStatus: (state, action) => {
      state.doc_upload_status = action.payload;
    },
    setProgramEnrollmentSuccess: (state, action) => {
      state.program_enrollment_success = action.payload;
    },
    setProgramStatus: (state, action) => {
      state.program_status = action.payload;
    },
    setCurrentView: (state, action) => {
      state.current_view = action.payload;
    },
    
    // Add these new reducers
    setSelectedProgram: (state, action) => {
      state.selectedProgram = action.payload;
    },
    setSelectedEnrollProgram: (state, action) => {
      state.selectedEnrollProgram = action.payload;
    },
    setViewingOrderHistory: (state, action) => {
      state.viewingOrderHistory = action.payload;
    },
    setUploadInvoiceModalOpen: (state, action) => {
      state.upload_invoice_modal_open = action.payload;
    },
    setRequestFocModalOpen: (state, action) => {
      state.request_foc_modal_open = action.payload;
    },
    setPatientEnrollmentSuccessModalOpen: (state, action) => {
      state.patient_enrollemnt_success = action.payload;
    },
    setPhysicalVerificationModalOpen: (state, action) => {
      state.physical_verification_modal_open = action.payload;
    },
    setIsFabButtonOpen: (state, action) => {
      state.isFabButtonOpen = action.payload;
    },
    setIsProfilePageOpen: (state, action) => {
      state.isProfilePageOpen = action.payload;
    },
    setIsMoreProgramPageOpen:(state, action)=>{
      state.isMoreProgramPageOpen = action.payload;
    },
setIsEkySuccessModalOpen:(state, action)=>{
  state.isEkySuccessModalOpen = action.payload;
},
setIsKycHistoryModalOpen:(state, action)=>{
  state.isKycHistoryModalOpen = action.payload;
}
  },
});

export const {
  changeStep,
  setPatientDetails,
  setInitializeData,
  setCurrentPageState,
  setProgramEnrollmentConsent,
  setDocUploadStatus,
  setProgramEnrollmentSuccess,
  setProgramStatus,
  setCurrentView,
  setSelectedProgram,
  setViewingOrderHistory,
  setUploadInvoiceModalOpen,
  setRequestFocModalOpen,
  setPatientEnrollmentSuccessModalOpen,
  setPhysicalVerificationModalOpen,
  setIsFabButtonOpen,
  setIsProfilePageOpen,
  setIsMoreProgramPageOpen,
  setIsEkySuccessModalOpen,
  setIsKycHistoryModalOpen,
  setSelectedEnrollProgram
} = ProgramEnrollmentSlice.actions;

export const selectCurrentStep = (state) => state.patientDetailForm.currentStep;

export const selectPatientDetails = (state) =>
  state.patientDetailForm.patientDetails;
export const selectInitializeData = (state) =>
  state.patientDetailForm.initializeData;

export const selectCurrentPageState = (state) =>
  state.patientDetailForm.current_page_state;

export const selectProgramEnrollmentConsent = (state) =>
  state.patientDetailForm.program_enroll_consent;

export const selectDocUploadStatus = (state) =>
  state.patientDetailForm.doc_upload_status;
export const selectProgramEnrollmentSuccess = (state) =>
  state.patientDetailForm.program_enrollment_success;

export const selectProgramStatus = (state) =>
  state.patientDetailForm.program_status;

export const selectCurrentView = (state) =>
  state.patientDetailForm.current_view;

export const selectSelectedProgram = (state) =>
  state.patientDetailForm.selectedProgram;

export const selectSelectedEnrollProgram = (state) =>
  state.patientDetailForm.selectedEnrollProgram;
export const selectViewingOrderHistory = (state) =>
  state.patientDetailForm.viewingOrderHistory;
export const selectUploadInvoiceModalOpen = (state) =>
  state.patientDetailForm.upload_invoice_modal_open;
export const selectRequestFocModalOpen = (state) =>
  state.patientDetailForm.request_foc_modal_open;
export const selectPatientEnrollmentModalOpen = (state) =>
  state.patientDetailForm.patient_enrollemnt_success;
export const selectPhysicalVerificationModalOpen = (state) =>
  state.patientDetailForm.physical_verification_modal_open;
export const selectIsFabButtonOpen = (state) =>
  state.patientDetailForm.isFabButtonOpen;

export const selectIsProfilePageOpen = (state) =>
  state.patientDetailForm.isProfilePageOpen;
export const selectIsMoreProgramPageOpen = (state) =>
  state.patientDetailForm.isMoreProgramPageOpen;
export const selectIsEkySuccessModalOpen = (state) =>
  state.patientDetailForm.isEkySuccessModalOpen;

export const selectIsKycHistoryModalOpen= (state) =>
  state.patientDetailForm.isKycHistoryModalOpen;

export default ProgramEnrollmentSlice.reducer;
