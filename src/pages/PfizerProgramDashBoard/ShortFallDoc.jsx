import React, { useState } from 'react';
import { Formik } from 'formik';
import MultiFileUpload from '../../components/Form/MultiFileUpload';
import { useDispatch } from 'react-redux';
import { setDocUploadStatus, setProgramEnrollmentConsent, setProgramEnrollmentSuccess, setProgramStatus, setSchemaShown } from '../../slice/patient-detail-form';
import { toast } from 'react-toastify';
import { ReactComponent as Tick } from "../../../../pfizer-app/src/assets/images/physicalVerify/tick_1.svg";

const ShortFallDoc = () => {
  const [showUploadFields, setShowUploadFields] = useState(false);
  const dispatch = useDispatch();

  const uploadFields = [
    { id: 'idProof', label: 'ID Proof' },
    { id: 'addressProof', label: 'Address Proof' },
    
  ];

  const initialValues = {
    idProof: [],
    addressProof: [],
  };

  const validate = (values) => {
    const errors = {};
    // uploadFields.forEach(field => {
    //   if (!values[field.id]?.length) {
    //     errors[field.id] = 'Please upload required document';
    //   }
    // });
    // return errors;
  };


  const notify = () =>
		toast('You have successfully uploaded your documents.', {
			duration: 6000,
			position: 'top-right',

			// Styling
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

			// Custom Icon
			icon: <Tick className="w-16 h-12" />,

			// Aria
			ariaProps: {
				role: 'status',
				'aria-live': 'polite',
			},
		});

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form submitted with values:', values);
    setSubmitting(false);
    notify();
     dispatch(setDocUploadStatus('profile_under_review'));
     dispatch(setProgramStatus('profile_under_review'));
  };




  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="relative flex flex-col pt-6">
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
              <MultiFileUpload
                key={field.id}
                formik={formik}
                label={field.label}
                id={field.id}
                isMultiple={false}
                onFileUpload={(files) => console.log(`${field.id} files:`, files)}
                onFileRemove={(files) => console.log(`${field.id} files after remove:`, files)}
              />
            ))}
          </div>

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
                  className="flex-1 py-3 px-4 text-white rounded-md bg-primary"
                  disabled={formik.isSubmitting}
                >
                  Submit
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
