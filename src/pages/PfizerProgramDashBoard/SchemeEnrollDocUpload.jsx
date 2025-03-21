import React, { useState } from 'react';
import { Formik } from 'formik';
import MultiFileUpload from '../../components/Form/MultiFileUpload';
import Radio from '../../components/Form/Radio';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedEnrollProgram, setCurrentPageState, setProgramEnrollmentConsent, setProgramEnrollmentSuccess, setSchemaShown } from '../../slice/patient-detail-form';
import useApi from '../../hooks/useApi';
import { transformToFormData } from '../../utils/forms';

const PfizerUploadForm = () => {
  const [showUploadFields, setShowUploadFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const triggerApi = useApi();
  const selectedEnrollProgram = useSelector(selectSelectedEnrollProgram);
  console.log('selectedEnrollProgramselectedEnrollProgram!!',selectedEnrollProgram);
  // const navigate = useNavigate();

  const radioData = [
    {
      id: '9_lft',
      value: '9+LFT',
      label: '9+LFT',
      description: 'Get lifetime free supply on purchase of 9 unit'
    },
    {
      id: '3_1_scheme',
      value: '3+1/3+1/2+1/2+LFT',
      label: '3+1/3+1/2+1/2+LFT',
      description: ''
    }
  ];

  const uploadFields = [
    { id: 'id_proof', label: 'ID Proof' },
    { id: 'address_proof', label: 'Address Proof' },
    { id: 'enrolment_form', label: 'Enrollment Form' },
    { id: 'prescription', label: 'Prescription' },
    { id: 'diagnosis', label: 'Diagonosis Detail' }
  ];

 
  const initialValues = {
    program_id: selectedEnrollProgram.program_id,
    program_name: selectedEnrollProgram.program_name,
    scheme: '',
    id_proof: [],
    address_proof: [],
    enrolment_form: [],
    prescription: [],
    diagnosis: []
  };

  const validate = (values) => {
    const errors = {};
    
    if (!values.scheme) {
      errors.scheme = 'Please select a scheme';
    }

    if (showUploadFields) {
      uploadFields.forEach(field => {
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
      
      console.log("Values being submitted:", values);
      
      // Set current_step parameter in the URL
      const url = `/patient_dashboard/?current_step=program_enrolment`;
      
      // Create a basic FormData object
      const formData = new FormData();
      
      // Add non-file data
      formData.append('program_id', values.program_id);
      formData.append('program_name', values.program_name);
      formData.append('scheme', values.scheme);
      
      // Add files directly to FormData
      for (const field of uploadFields) {
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
      console.log("FormData entries:");
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
        console.log("Form data submitted successfully:", response);

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
        console.log('Form submitted successfully:', result.data.current_step);
      
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
    console.log("Hello buddy!");
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
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="relative flex flex-col pt-6 ">
          {/* Pfizer Logo */}
          <div>

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
            <div className="mb-8">
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
                {uploadFields.map((field) => (
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

export default PfizerUploadForm;