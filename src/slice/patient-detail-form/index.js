import { createSlice } from '@reduxjs/toolkit';

// const currentStep = window.localStorage.getItem("formData")?.currentStep
//   ? JSON.parse(window.localStorage.getItem("formData"))?.currentStep
//   : 1;

export const ProgramEnrollmentSlice = createSlice({
  name: "patient-detail-form",
  initialState: {
    initializeData: {
			data: {
				enrollment_details: {
					step_data: {},
				},
			},
		},
    current_page_state: 'program_unactive',
    // current_page_state: 'enrollment_pending',
    
    // Programs Enroll dashboard
    program_enroll_consent:false,
    program_enrollment_success:false,
    currentStep: 1,
    schemaShown: false
  },
  reducers: {
    changeStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setPatientDetails: (state, action) => {
      state.patientDetails = action.payload;
    },
    setInitializeData: (state, action) => {
			state.initializeData = { ...action?.payload };
		},
    setCurrentPageState: (state, action) => {
			state.current_page_state = action.payload;
		},
    setProgramEnrollmentConsent: (state, action) => {
      state.program_enroll_consent = action.payload;
    
  },
  setSchemaShown: (state, action) => {
    state.schemaShown = action.payload;
  },
  setProgramEnrollmentSuccess: (state, action) => {
    state.program_enrollment_success = action.payload;
    }
}
});

export const {
  changeStep,
  setPatientDetails,
  setInitializeData,
  setCurrentPageState,
  setProgramEnrollmentConsent,
  setSchemaShown,
  setProgramEnrollmentSuccess
} = ProgramEnrollmentSlice.actions;

export const selectCurrentStep = (state) =>
  state.patientDetailForm.currentStep;

export const selectPatientDetails = (state) =>
  state.patientDetailForm.patientDetails;
export const selectInitializeData = (state) =>
	state.patientDetailForm.initializeData;

export const selectCurrentPageState = (state) =>
	state.patientDetailForm.current_page_state;

export const selectProgramEnrollmentConsent = (state) =>
  state.patientDetailForm.program_enroll_consent;

  export const selectSchemaShown = (state) =>
    state.patientDetailForm.schemaShown;
  export const selectProgramEnrollmentSuccess = (state) =>
    state.patientDetailForm.program_enrollment_success;

export default ProgramEnrollmentSlice.reducer;
