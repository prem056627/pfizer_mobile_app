import React, { useState } from 'react';
import { Formik } from 'formik';
import MultiFileUpload from '../../components/Form/MultiFileUpload';
import Radio from '../../components/Form/Radio';
import { useDispatch } from 'react-redux';
import { setCurrentPageState, setProgramEnrollmentConsent, setProgramEnrollmentSuccess, setSchemaShown } from '../../slice/patient-detail-form';
// import { useNavigate } from 'react-router-dom';
// import Radio from './Radio';
// import MultiFileUpload from './MultiFileUpload';

const PfizerUploadForm = () => {
  const [showUploadFields, setShowUploadFields] = useState(false);
  const dispatch = useDispatch();
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
    { id: 'idProof', label: 'ID Proof' },
    { id: 'addressProof', label: 'Address Proof' },
    { id: 'enrollmentForm', label: 'Enrollment Form' },
    { id: 'prescription', label: 'Prescription' },
    { id: 'diagnosisDetail', label: 'Diagonosis Detail' }
  ];

  const initialValues = {
    scheme: '',
    idProof: [],
    addressProof: [],
    enrollmentForm: [],
    prescription: [],
    diagnosisDetail: []
  };

  const validate = (values) => {
    const errors = {};
    
    if (!values.scheme && !showUploadFields) {
      errors.scheme = 'Please select a scheme';
    }

    if (showUploadFields) {
      uploadFields.forEach(field => {
        if (!values[field.id]?.length) {
          errors[field.id] = 'Please upload required document';
        }
      });
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // dispatch(setSchemaShown(false));
    // dispatch(setProgramEnrollmentConsent(false));
    
    if (!showUploadFields) {
      setShowUploadFields(true);
      setSubmitting(false);
      return;
    }
    
    // Only navigate to submission after documents are submitted
    console.log('Form submitted:', values);
    // navigate("submission");
    
    // Show success modal
    dispatch(setProgramEnrollmentSuccess(true));
    
    // Close modal and change page state after 5 seconds
    setTimeout(() => {
      dispatch(setProgramEnrollmentSuccess(false));
      setCurrentPageState('program_enrolment');
       // Refresh the page
    window.location.reload();
    }, 5000);
    
    
    setSubmitting(false);
  };


  // setProgramEnrollmentSuccess(false)
  // setCurrentPageState('program_enrolment')

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
          {/* <div className="bg-white flex justify-center items-center h-20 px-6   w-full">
          <div className="flex justify-center items-center">
            <img
              width={90}
              src="/pfizer_logo.svg"
              alt="Pfizer Logo"
              className="cursor-pointer"
            />
          </div>
        </div> */}

          {/* Scheme Selection */}
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
                    isMultiple={false}
                    // description="Upload jpg/pdf/png format file"
                    onFileUpload={(files) => console.log(`${field.id} files:`, files)}
                    onFileRemove={(files) => console.log(`${field.id} files after remove:`, files)}
                  />
                ))}
              </div>
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
                  disabled={(!showUploadFields && !formik.values.scheme) || formik.isSubmitting}
                >
                  {showUploadFields ? 'Submit' : 'Next'}
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