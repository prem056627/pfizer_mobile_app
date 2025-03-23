import React, { useState } from 'react';
import { Formik } from 'formik';
import MultiFileUpload from '../../components/Form/MultiFileUpload';
import Radio from '../../components/Form/Radio';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedEnrollProgram, setCurrentPageState, setProgramEnrollmentConsent, setProgramEnrollmentSuccess, setSchemaShown } from '../../slice/patient-detail-form';
import useApi from '../../hooks/useApi';
import { transformToFormData } from '../../utils/forms';

const SchemeEnrollDocUpload = () => {
  const [showUploadFields, setShowUploadFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const triggerApi = useApi();
  const selectedEnrollProgram = useSelector(selectSelectedEnrollProgram);
  // console.log('selectedEnrollProgramselectedEnrollProgram!!',selectedEnrollProgram);
  // const navigate = useNavigate();

// Get radio data based on program name
const getRadioData = () => {
  const programName = selectedEnrollProgram.program_name;
  
  // Default radio data (empty)
  const defaultRadioData = [];
  
  // Program-specific radio data
  if (programName === "Lorbriqua Care") {
    return [
      {
        id: '1_1',
        value: '1+1',
        label: '1+1',
        description: ''
      },
      {
        id: '1_2',
        value: '1+2',
        label: '1+2',
        description: ''
      },
      {
        id: '1_3',
        value: '1+3',
        label: '1+3',
        description: ''
      },
      {
        id: '1_11',
        value: '1+11',
        label: '1+11',
        description: ''
      },
      {
        id: 'other',
        value: 'Other',
        label: 'Other',
        description: ''
      }
    ];
  } 
  else if (programName === "Palbace Program") {
    return [
      {
        id: '9_lft',
        value: '9+LTF',
        label: '9+LTF',
        description: ''
      },
      {
        id: '3_1_3_1_2_1_2_ltf',
        value: '3+1.3+1,2+1,2+LTF',
        label: '3+1.3+1,2+1,2+LTF',
        description: ''
      },
      {
        id: '10_ltf',
        value: '10+LTF',
        label: '10+LTF',
        description: ''
      },
      {
        id: '1_3',
        value: '1+3',
        label: '1+3',
        description: ''
      },
      {
        id: 'trade_no_pap',
        value: 'Trade - No PAP',
        label: 'Trade - No PAP',
        description: ''
      },
      {
        id: 'other',
        value: 'Other',
        label: 'Other',
        description: ''
      }
    ];
  }
  else if (programName === "Crizalk Program") {
    return [
      {
        id: '1_1',
        value: '1+1',
        label: '1+1',
        description: ''
      },
      {
        id: '8_lft',
        value: '8+LFT',
        label: '8+LFT',
        description: ''
      },
      {
        id: '9_lft',
        value: '9+LFT',
        label: '9+LFT',
        description: ''
      },
      {
        id: '14_lft',
        value: '14+LFT',
        label: '14+LFT',
        description: ''
      },
      {
        id: '18_lft',
        value: '18+LFT',
        label: '18+LFT',
        description: ''
      },
      {
        id: 'lft',
        value: 'LFT',
        label: 'LFT',
        description: ''
      },
      {
        id: 'others',
        value: 'Others',
        label: 'Others',
        description: ''
      }
    ];
  }
  
  return defaultRadioData; // Return empty array for other programs
};

const radioData = getRadioData();
  const uploadFields = [
    { id: 'id_proof', label: 'ID Proof' },
    { id: 'address_proof', label: 'Address Proof' },
    { id: 'enrolment_form', label: 'Enrollment Form' },
    { id: 'prescription', label: 'Prescription' },
    { id: 'phone_number_proof', label: 'Phone Number Proof' }
  ];

 

  // Get extra fields based on program name
  const getExtraFields = () => {
    const programName = selectedEnrollProgram.program_name;
    
    // Extra fields for specific programs
    if (programName === "Lorbriqua Care") {
      return [
        { id: 'caregiver_id_proof', label: 'Caregiver ID Proof' },
        // { id: 'insurance_card', label: 'Insurance Card' },
        // { id: 'genetic_report', label: 'Genetic Report' }
      ];
    } 
    else if (programName === "Palbace Program") {
      return [
        { id: 'diagnosis', label: 'Diagnosis' },
      
      ];
    }
    else if (programName === "Crizalk Program") {
      return [
        { id: 'diagnosis', label: 'Diagnosis' },
      ];
    }
    
    return []; // Return empty array for other programs
  };

  // Combine standard and extra fields
  const combinedUploadFields = [...uploadFields, ...getExtraFields()];
 
  const initialValues = {
    program_id: selectedEnrollProgram.program_id,
    program_name: selectedEnrollProgram.program_name,
    scheme: '',
    id_proof: [],
    address_proof: [],
    enrolment_form: [],
    prescription: [],
    diagnosis: [],
    // Add initial values for potential extra fields
    phone_number_proof: [],
    // insurance_card: [],
    // genetic_report: [],
    // hormone_report: [],
    // recent_labs: [],
    // consent_form: [],
    // alk_test: [],
    // medical_history: [],
    // treatment_plan: []
  };

  const validate = (values) => {
    const errors = {};
    
    if (!values.scheme) {
      errors.scheme = 'Please select a scheme';
    }

    if (showUploadFields) {
      combinedUploadFields.forEach(field => {
        if (!values[field.id] || values[field.id].length === 0) {
          errors[field.id] = 'Please upload required document';
        } else {
          // Validate file types and sizes
          const invalidFiles = values[field.id].filter(file => {
            const fileType = file.type;
            const fileSize = file.size / (1024 * 1024); // Convert to MB
            
            const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            return !validTypes.includes(fileType) || fileSize > 2;
          });
          
          if (invalidFiles.length > 0) {
            errors[field.id] = 'Invalid file format or size. Use jpg/pdf/png format under 2MB.';
          }
        }
      });
    }

    return errors;
  };

  // Updated API call function to properly handle file uploads with FormData
  const makeApiCall = async (values) => {
    try {
      setIsLoading(true);
      
      // console.log("Values being submitted:", values);
      
      // Set current_step parameter in the URL
      const url = `/patient_dashboard/?current_step=program_enrolment`;
      
      // Create a basic FormData object
      const formData = new FormData();
      
      // Add non-file data
      formData.append('program_id', values.program_id);
      formData.append('program_name', values.program_name);
      formData.append('scheme', values.scheme);
      
      // Add files directly to FormData
      for (const field of combinedUploadFields) {
        const fieldId = field.id;
        if (values[fieldId] && values[fieldId].length > 0) {
          console.log(`Adding ${values[fieldId].length} files for ${fieldId}`);
          
          // Append each file with the field name
          values[fieldId].forEach((file, index) => {
            formData.append(`${fieldId}`, file);
          });
        }
      }
      
      // Log FormData entries for debugging
      // console.log("FormData entries:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + (pair[1] instanceof File ? `File: ${pair[1].name}` : pair[1]));
      }
      
      // Make the API call with FormData
      const { response, success } = await triggerApi({
        url: url,
        type: "POST",
        payload: formData,
        loader: true,
        headers: {} // Let browser set Content-Type with boundary
      });
      
      if (success && response) {
        // console.log("Form data submitted successfully:", response);

        dispatch(setCurrentPageState(response?.current_step))
       
        
        // Close modal and change page state after 5 seconds
        setTimeout(() => {
          dispatch(setProgramEnrollmentSuccess(false));
          // dispatch(setCurrentPageState('program_enrolment_done'));
          // Refresh the page
          window.location.reload();
        }, 5000);

        return { success: true, data: response };
      } else {
        console.error("API call failed or returned no data.");
        return { success: false, error: "API call failed" };
      }
    } catch (error) {
      console.error("Error in makeApiCall:", error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    // dispatch(setSchemaShown(false));
    // dispatch(setProgramEnrollmentConsent(false));
    
    if (!showUploadFields) {
      setShowUploadFields(true);
      setSubmitting(false);
      return;
    }
    
    try {
      // Submit form data to API
      const result = await makeApiCall(values);
      
      if (result.success) {
         // Show success modal
         dispatch(setProgramEnrollmentSuccess(true));
        // console.log('Form submitted successfully:', result.data.current_step);
      
      } else {
        // Handle API errors
        console.error('Form submission failed:', result.error);
        setErrors({ submit: 'Form submission failed. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };



    // Function to refresh the application
    const refreshApplication = () => {
      // Method 1: Reload the current page
      window.location.reload();
      
      // Alternative Method 2: If you're using React Router, you can navigate to the same page
      // navigate(window.location.pathname);
      
      // Alternative Method 3: If you need to reset the state in Redux
      // dispatch(resetApplicationState());
    };

  function handleLater(){

     setTimeout(() => {
            refreshApplication();
          }, 200);
  }


  
    

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >

{/* flex-1 overflow-y-auto container mx-auto md:px-14 py-24 bg-[##F9FAFB]  */}
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="relative flex flex-col pt-6  container mx-auto ">
          {/* Pfizer Logo */}
          <div className=''>

          {!showUploadFields && (
            <div className="mb-8 mt-8 px-4">
              <Radio
                label="Select a scheme"
                name="scheme"
                radioData={radioData}
                formik={formik}
                value={formik.values.scheme}
                checkboxType="circle"
              />
              {formik.touched.scheme && formik.errors.scheme && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.scheme}</div>
              )}
            </div>
          )}

          {/* Document Upload Section */}
          {showUploadFields && (
            <div className="mb-8 overflow-y-auto  h-[800px] pb-60">
              <div className="flex flex-col justify-between items-start mt-12 mb-6 px-4" >
                <h2 className="text-[18px] font-sans  font-semibold">Upload Documents</h2>
                <a href="#" className="text-primary text-[14px]">
                  Know more <span className="text-[#767676] font-sans font-semibold">about the program</span>
                </a>
              </div>
              
              <div className="text-sm text-black  font-sans font-italic italic mb-4 px-4">
                The file must be in jpg/pdf/png format.
                <br />
                Maximum size of the document should be 2mb.
              </div>

              <div className="space-y-4 px-4 mb-40">
                {combinedUploadFields.map((field) => (
                  <MultiFileUpload
                    key={field.id}
                    formik={formik}
                    label={field.label}
                    id={field.id}
                    isMultiple={true}
                    // description="Upload jpg/pdf/png format file"
                    onFileUpload={(files) => console.log(`${field.id} files:`, files)}
                    onFileRemove={(files) => console.log(`${field.id} files after remove:`, files)}
                  />
                ))}
              </div>

              {formik.errors.submit && (
                <div className="text-red-500 text-sm mt-1 px-4">{formik.errors.submit}</div>
              )}
            </div>
          )}
          </div>

          {/* Action Buttons */}

          {/* Fixed Footer */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-4 px-4 py-8">
                <button
                  type="button" 
                  onClick={handleLater}
                  className="flex-1 py-3 px-4 border shadow-[inset_0_0_0_1px_#0101C8] text-primary rounded-md"
                >
                  Finish Later
                </button>
                <button 
                  type="submit"
                  className={`flex-1 py-3 px-4 text-white rounded-md ${
                    (!showUploadFields && formik.values.scheme) || showUploadFields 
                      ? 'bg-primary' 
                      : 'bg-blue-200'
                  }`}
                  disabled={(!showUploadFields && !formik.values.scheme) || formik.isSubmitting || isLoading}
                >
                  {isLoading ? 'Loading...' : showUploadFields ? 'Submit' : 'Next'}
                </button>
              </div>
            </div>
          </div>
       
        </form>
      )}
    </Formik>
  );
};

export default SchemeEnrollDocUpload;