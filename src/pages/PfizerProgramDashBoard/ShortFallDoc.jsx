import React, { useState } from 'react';
import { Formik } from 'formik';
import MultiFileUpload from '../../components/Form/MultiFileUpload';
import { useDispatch, useSelector } from 'react-redux';
import { selectInitializeData, setDocUploadStatus, setProgramEnrollmentConsent, setProgramEnrollmentSuccess, setProgramStatus, setSchemaShown } from '../../slice/patient-detail-form';
import { toast } from 'react-toastify';
import { ReactComponent as Tick } from "../../../../pfizer-app/src/assets/images/physicalVerify/tick_1.svg";
import { transformToFormData } from '../../utils/forms';
import useApi from '../../hooks/useApi';

const ShortFallDoc = () => {
  const [showUploadFields, setShowUploadFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const triggerApi = useApi();

   const initiaData = useSelector(selectInitializeData)
  
    const uploadFieldsforShoetfall = initiaData?.program_data?.applied_programs;

    console.log(uploadFieldsforShoetfall);

  // const uploadFields = [
  //   { id: 'idProof', label: 'ID Proof' },
  //   { id: 'addressProof', label: 'Address Proof' },
  // ];

  // uploadFieldsforShoetfall.map((uploadProgram)=>{

  //   console.log(uploadProgram.reupload_document);

  // })


  // Initialize with empty array
let uploadFields = [];

// Check if uploadFieldsforShoetfall exists and has data

console.log(console.log("uploadFieldsforShoetfall",uploadFieldsforShoetfall));
if (uploadFieldsforShoetfall && uploadFieldsforShoetfall.length > 0) {
  // Map the data to the format you need
  uploadFields = uploadFieldsforShoetfall.flatMap(program => {
    console.log("hi");
    
    // Check if reupload_document exists and is an array
    if (program.reupload_document && Array.isArray(program.reupload_document)) {
      return program.reupload_document.map(prog => {
        return {
          id: prog.id || program.id,
          label: prog.label || program.label
        };
      });
    } else {
      // If no reupload_document array, return the program itself
      return [{
        id: program.id,
        label: program.label
      }];
    }
  });
} else {
  // Use your default if uploadFieldsforShoetfall is not available
  uploadFields = [
    // { id: 'idProof', label: 'ID Proof' },
    // { id: 'addressProof', label: 'Address Proof' },
  ];
}

  const initialValues = {
    // program_id: selectedEnrollProgram.program_id,
    idProof: [],
    addressProof: [],
  };

  const validate = (values) => {
    const errors = {};
    
    // Basic validation to ensure files are selected
    if (!values.idProof || values.idProof.length === 0) {
      errors.idProof = 'ID Proof is required';
    }
    
    if (!values.addressProof || values.addressProof.length === 0) {
      errors.addressProof = 'Address Proof is required';
    }
    
    return errors;
  };

  const notify = () =>
    toast('You have successfully uploaded your documents.', {
      duration: 6000,
      position: 'top-right',
      style: {
        borderBottom: '1.5px solid #86C4B6',
        fontFamily: 'open sans',
        fontSize: '14px',
        padding: '16px',
        fontWeight: '800',
        color: '#156352',
        background: '#E6FAF3',
        width: '100%',
      },
      className: 'custom-toast',
      progressStyle: { background: '#B4E3D5' },
      icon: <Tick className="w-16 h-12" />,
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });

  // Debug function to check if file is valid
  const debugFile = (file) => {
    if (!file) return 'File is null or undefined';
    if (!(file instanceof File)) return `Not a File object: ${typeof file}`;
    return `Valid File: ${file.name}, size: ${file.size}, type: ${file.type}`;
  };

  // Function to make API call with FormData
  const makeApiCall = async (values) => {
    try {
      setIsLoading(true);
  
      // Create new FormData manually
      const formData = new FormData();
      
      // Add files directly to FormData
      if (values.idProof && values.idProof.length > 0) {
        formData.append('idProof', values.idProof[0]);
        // console.log('Adding idProof:', debugFile(values.idProof[0]));
      }
      
      if (values.addressProof && values.addressProof.length > 0) {
        formData.append('addressProof', values.addressProof[0]);
        // console.log('Adding addressProof:', debugFile(values.addressProof[0]));
      }
      
      // Add any additional data if needed
      formData.append('current_step', 'reupload_documents');
      
      // Log all FormData entries to verify content
      // console.log('FormData contents:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + (pair[1] instanceof File ? 
          `File: ${pair[1].name}, size: ${pair[1].size}` : pair[1]));
      }
      
      // Set current_step parameter in the URL
      const url = `/patient_dashboard/?current_step=reupload_documents`;
      
      // Make the API call with the FormData payload
      const { response, success } = await triggerApi({
        url: url,
        type: "POST",
        payload: formData,
        loader: true,
        // Important: Don't manually set Content-Type for FormData
        headers: {
          // Let the browser set the Content-Type with boundary
        }
      });
  
      if (success && response) {
        // console.log("Form data submitted successfully:", response);
        return { success: true, data: response };
      } else {
        // console.error("API call failed or returned no data.");
        return { success: false, error: "API call failed" };
      }
    } catch (error) {
      // console.error("Error in makeApiCall:", error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // console.log('Form values before submission:', values);
      
      // Check if files exist and are valid
      if ((!values.idProof || values.idProof.length === 0) && 
          (!values.addressProof || values.addressProof.length === 0)) {
        toast.error('Please select files to upload');
        return;
      }
      
      // Make API call with the raw values (not transformed)
      const result = await makeApiCall(values);
      
      if (result.success) {
        notify();
        dispatch(setDocUploadStatus('profile_under_review'));
        dispatch(setProgramStatus('profile_under_review'));
      } else {
        toast.error('Failed to upload documents. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to upload documents. Please try again.');
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
    <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="relative flex flex-col pt-6" encType="multipart/form-data">
          <div className="mb-8 px-4">
            <h2 className="text-[18px] font-sans font-semibold">Upload Documents</h2>
          </div>

          <div className="text-sm text-black font-sans italic mb-4 px-4">
            The file must be in jpg/pdf/png format.
            <br />
            Maximum size of the document should be 2MB.
          </div>

          <div className="space-y-4 px-4 mb-40">
            {uploadFields.map((field) => (
              <div key={field.id}>
                <MultiFileUpload
                  formik={formik}
                  label={field.label}
                  id={field.id}
                  isMultiple={true}
                  onFileUpload={(files) => {
                    // console.log(`${field.id} files uploaded:`, files);
                    // Ensure files are properly set in formik
                    formik.setFieldValue(field.id, files);
                  }}
                  onFileRemove={(files) => {
                    // console.log(`${field.id} files after remove:`, files);
                    formik.setFieldValue(field.id, files);
                  }}
                />
                {formik.errors[field.id] && formik.touched[field.id] && (
                  <div className="text-red-500 mt-1 text-sm">{formik.errors[field.id]}</div>
                )}
              </div>
            ))}
          </div>

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
                  className="flex-1 py-3 px-4 text-white rounded-md bg-primary"
                  disabled={formik.isSubmitting || isLoading}
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ShortFallDoc;