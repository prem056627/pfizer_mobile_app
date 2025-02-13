import { createSlice } from '@reduxjs/toolkit';

const currentStep = window.localStorage.getItem("formData")?.currentStep
  ? JSON.parse(window.localStorage.getItem("formData"))?.currentStep
  : 1;

export const patientDetailFormSlice = createSlice({
  name: "patient-detail-form",
  initialState: {
    patientDetails: {
      data: {
        uid: "12345", // Unique ID for the user
        current_state: "patient_enrollment", // Options: tnc_pending, patient_enrollment
        enrollment_details: {
          steps: [
            "terms_and_conditions",
            "patient_details",
            "address_details",
            "caregiver_details",
            "document_upload",
            "authorization",
            "enrollment_form",
          ],
          completed_steps: ["terms_and_conditions", "patient_details"],
          current_step: "document_upload",
          step_data: {
            terms_and_conditions: "Yes", // Can be "yes", "no"
            patient_details: {
              full_name: "John Doe", // Patient's full name
              gender: "Male", // Gender
              date_of_birth: "1990-01-01", // Date of birth
              mobile_number: "9894322122", // Mobile number
              email: "johndoe@zelthy.com", // Email address
              nationality: "Indian", // Nationality
            },
            address_details: {
              address_line_1: "123 Main St", // Address Line 1
              address_line_2: "Apt 4B", // Address Line 2 (optional)
              city: "New York", // City
              state: "NY", // State (pre-selected if previously saved)
              pin_code: "758375", // PIN/ZIP code
            },
            current_residence: {
              address_line_1: "123 Main St", // Address Line 1
              address_line_2: "Apt 4B", // Address Line 2 (optional)
              city: "New York", // City
              state: "NY", // State (pre-selected if previously saved)
              pin_code: "10001", // PIN/ZIP code
            },
            reimbursement_info: {
              // Reimbursement Information section
              has_reimbursement: "yes", // Can be "yes", "no", or null (if not selected yet)
            },
            caregiver_details: {
              full_name: "Abhi", // Caregiver's full name (to be filled)
              gender: "Male", // Caregiver's gender (to be selected)
              mobile_number: "7482635433", // Caregiver's mobile number (to be filled)
              email: "kalu@zelthy.com", // Caregiver's email (to be filled)
            },
            caregiver_address_proof: {
              address_line_1: "123 Main St", // Address Line 1
              address_line_2: "Apt 4B", // Address Line 2 (optional)
              city: "New York", // City
              state: "NY", // State (pre-selected if previously saved)
              pin_code: "10001", // PIN/ZIP code
            },
            caregiver_id_proof: {
              proof_type: "Aadhar Card",
              file_link:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Rochester_zamek_fc11_%28cropped%29.jpg/620px-Rochester_zamek_fc11_%28cropped%29.jpg",
            },
            document_upload: {
              proof_type: "Aadhar Card",
              file_link:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Rochester_zamek_fc11_%28cropped%29.jpg/620px-Rochester_zamek_fc11_%28cropped%29.jpg",
            },
            other_documents: {
              prescription_file_link:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Rochester_zamek_fc11_%28cropped%29.jpg/620px-Rochester_zamek_fc11_%28cropped%29.jpg",
              diagonosis_details_file_link:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Rochester_zamek_fc11_%28cropped%29.jpg/620px-Rochester_zamek_fc11_%28cropped%29.jpg",
            },
            authorization: {
              program_explained: "Yes",
              oasiss_consent: "Yes",
            },
            enrollment_form: {
              enrollment_form_consent: "Yes",
            },
          },
          dropdown_options: {
            // Dropdown options for states or other fields
            states: [
              // States available for selection
              {
                code: "NY",
                name: "New York",
              },
              {
                code: "CA",
                name: "California",
              },
              {
                code: "TX",
                name: "Texas",
              },
              {
                code: "FL",
                name: "Florida",
              },
            ],
          },
          completed: false, // Whether the process is fully completed
        },
      },
    },
    currentStep: 1,
  },
  reducers: {
    changeStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setPatientDetails: (state, action) => {
      state.patientDetails = action.payload;
    },
  },
});

export const {
	changeStep,
	setPatientDetails,
} = patientDetailFormSlice.actions;

export const selectCurrentStep = (state) =>
	state.patientDetailForm.currentStep;

export const selectPatientDetails = (state) =>
	state.patientDetailForm.patientDetails;

export default patientDetailFormSlice.reducer;
